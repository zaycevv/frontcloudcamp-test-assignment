import React from "react";
import * as yup from "yup";
import axios from "axios";
import { yupResolver } from "@hookform/resolvers/yup";
import styles from "./FormThirdStep.module.scss";
import { Link } from "react-router-dom";
import { setStep } from "../../redux/step/slice";
import { useSelector } from "react-redux";
import { selectStep } from "../../redux/step/selectors";
import { useAppDispatch } from "../../redux/store";
import SuccessIcon from "../../assets/icons/success.svg";
import ErrorIcon from "../../assets/icons/error.svg";
import CloseIcon from "../../assets/icons/close.svg";
import { SubmitHandler, useForm } from "react-hook-form";
import { AdvantageType } from "../../redux/advantages/types";
import { clearAdvantages } from "../../redux/advantages/slice";

type IFormInput = {
  about: string;
};

export const FormThirdStep: React.FC = () => {
  const [openModal, setOpenModal] = React.useState<boolean>(false);
  const [isError, setIsError] = React.useState<boolean>(false);

  const dispatch = useAppDispatch();
  const step = useSelector(selectStep);

  const FormThirdStepSchema = yup.object().shape({
    about: yup
      .string()
      .required("Поле обязательно для заполнения")
      .max(200, "Превышено количество символов"),
  });

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      about: "",
    },
    resolver: yupResolver(FormThirdStepSchema),
  });

  const onClickBack = () => {
    dispatch(setStep(step - 1));
  };

  const onClickDone = () => {
    localStorage.setItem("step", "0");
    dispatch(setStep(0));
  };

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    localStorage.setItem("about", data.about);
    console.log(data);

    const advantagesLocal = localStorage.getItem("advantages");
    const advantagesObjects =
      advantagesLocal !== null ? JSON.parse(advantagesLocal) : [];
    const advantages = advantagesObjects.map((obj: AdvantageType) => obj.title);

    const checkboxLocal = localStorage.getItem("checkbox");
    const checkbox = checkboxLocal !== null ? JSON.parse(checkboxLocal) : [];

    axios
      .post("https://api.sbercloud.ru/content/v1/bootcamp/frontend", {
        nickname: localStorage.getItem("nickname"),
        name: localStorage.getItem("name"),
        surname: localStorage.getItem("surname"),
        phone: localStorage.getItem("phone"),
        email: localStorage.getItem("email"),
        sex: localStorage.getItem("sex"),
        advantages: advantages,
        radio: localStorage.getItem("radio"),
        checkbox: checkbox,
        about: localStorage.getItem("about"),
      })
      .then(function (response) {
        localStorage.clear();
        dispatch(clearAdvantages());
      })
      .catch(function (error) {
        setIsError(true);
      });

    setOpenModal(true);
  };

  React.useEffect(() => {
    const aboutLocal = localStorage.getItem("about");
    if (aboutLocal) setValue("about", aboutLocal);
  }, []);

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.forms}>
          <label className={styles.forms__form}>
            О cебе
            <textarea
              id="field-about"
              {...register("about")}
              className="input"
            />
            <p className={styles.forms__form__error}>{errors.about?.message}</p>
          </label>
        </div>
        <div className={styles.buttons}>
          <button
            onClick={onClickBack}
            id="button-back"
            className="button button--outline"
          >
            Назад
          </button>
          <button type="submit" id="button-send" className="button">
            Отправить
          </button>
        </div>
      </form>
      <div
        className={`fixed-overlay ${openModal ? "" : "fixed-overlay--hidden"}`}
      >
        {isError ? (
          <div className="modalerror">
            <div className="modalerror__header">
              <p>Ошибка</p>
              <div
                onClick={() => setOpenModal(false)}
                className="modalerror__header__close"
              >
                <img src={CloseIcon} alt="" />
              </div>
            </div>
            <div
              className={`modal__icon ${isError ? "modal__icon--error" : ""}`}
            >
              <img src={ErrorIcon} alt="error-icon" />
            </div>
            <button
              id="button-close"
              className="button"
              onClick={() => setOpenModal(false)}
            >
              Закрыть
            </button>
          </div>
        ) : (
          <div className="modal">
            <p>Форма успешно отправлена</p>
            <div
              className={`modal__icon ${isError ? "modal__icon--error" : ""}`}
            >
              <img src={isError ? ErrorIcon : SuccessIcon} alt="success-icon" />
            </div>
            <Link to="/" className="button" onClick={onClickDone}>
              На главную
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};
