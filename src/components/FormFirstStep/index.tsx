import React, { useState } from "react";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import styles from "./FormFirstStep.module.scss";
import { SubmitHandler, useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import ArrowIcon from "../../assets/icons/arrow.svg";
import { useAppDispatch } from "../../redux/store";
import { setStep } from "../../redux/step/slice";

type IFormInput = {
  nickname: string;
  name: string;
  surname: string;
  sex: string;
};

export const FormFirstStep = () => {
  const dispatch = useAppDispatch();
  const [openSelect, setOpenSelect] = useState(false);
  const [selectedItem, setSelectedItem] = useState("");

  const FormFirstStepSchema = yup.object().shape({
    nickname: yup
      .string()
      .required("Поле обязательно для заполнения")
      .trim("")
      .max(30, "Максимальная длина 30 символов")
      .matches(/^[а-яА-ЯёЁa-zA-Z0-9]+$/, {
        message: "Разрешены только буквы и цифры без пробелов",
        excludeEmptyString: false,
      }),
    name: yup
      .string()
      .required("Поле обязательно для заполнения")
      .trim("")
      .max(50, "Максимальная длина 50 символов")
      .matches(/^[а-яА-ЯёЁa-zA-Z]+$/, {
        message: "Разрешены только буквы без пробелов",
        excludeEmptyString: false,
      }),
    surname: yup
      .string()
      .required("Поле обязательно для заполнения")
      .trim("")
      .max(50, "Максимальная длина 50 символов")
      .matches(/^[а-яА-ЯёЁa-zA-Z]+$/, {
        message: "Разрешены только буквы без пробелов",
        excludeEmptyString: false,
      }),
    sex: yup.string().required("Поле обязательно для заполнения"),
  });

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      nickname: "",
      name: "",
      surname: "",
      sex: "",
    },
    resolver: yupResolver(FormFirstStepSchema),
  });

  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    localStorage.setItem("nickname", data.nickname);
    localStorage.setItem("name", data.name);
    localStorage.setItem("surname", data.surname);
    localStorage.setItem("sex", data.sex);
    localStorage.setItem("step", "2");
    dispatch(setStep(2));
  };

  const onSelectSex = (sex: string) => {
    setValue("sex", sex);
    setSelectedItem(sex);
    setOpenSelect(false);
  };

  React.useEffect(() => {
    const nicknameLocal = localStorage.getItem("nickname");
    if (nicknameLocal) setValue("nickname", nicknameLocal);
    const nameLocal = localStorage.getItem("name");
    if (nameLocal) setValue("name", nameLocal);
    const surnameLocal = localStorage.getItem("surname");
    if (surnameLocal) setValue("surname", surnameLocal);
    const sexLocal = localStorage.getItem("sex");
    if (sexLocal) setValue("sex", sexLocal);
    if (sexLocal) setSelectedItem(sexLocal);
  }, []);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className={styles.forms}>
        <label className={styles.forms__input}>
          Никнейм
          <input
            id="field-nickname"
            type="text"
            className="input"
            placeholder="vanyaerohin"
            {...register("nickname")}
          />
          <p className={styles.forms__input__error}>
            {errors.nickname?.message}
          </p>
        </label>
        <label className={styles.forms__input}>
          Имя
          <input
            id="field-name"
            type="text"
            className="input"
            placeholder="Ваня"
            {...register("name")}
          />
          <p className={styles.forms__input__error}>{errors.name?.message}</p>
        </label>
        <label className={styles.forms__input}>
          Фамилия
          <input
            id="field-surname"
            type="text"
            className="input"
            placeholder="Ерохин"
            {...register("surname")}
          />
          <p className={styles.forms__input__error}>
            {errors.surname?.message}
          </p>
        </label>
        <label className={styles.forms__input}>
          Пол
          <div className={`select ${openSelect ? "select--rotate" : ""}`}>
            <div
              id="field-sex"
              className="select__button"
              onClick={() => setOpenSelect(!openSelect)}
            >
              {selectedItem === "men"
                ? "Мужской"
                : selectedItem === "woman"
                ? "Женский"
                : "Ничего не выбрано"}
              <img src={ArrowIcon} alt="arrow-icon" />
            </div>
            <ul className={`menu ${!openSelect ? "menu--hidden" : ""}`}>
              <li id="field-sex-option-man" onClick={() => onSelectSex("men")}>
                Мужской
              </li>
              <li
                id="field-sex-option-woman"
                onClick={() => onSelectSex("woman")}
              >
                Женский
              </li>
            </ul>
          </div>
          <p className={styles.forms__input__error}>{errors.sex?.message}</p>
        </label>
      </div>
      <div className={styles.buttons}>
        <Link to="/" id="button-back" className="button button--outline">
          Назад
        </Link>
        <button id="button-next" className="button">
          Далее
        </button>
      </div>
    </form>
  );
};
