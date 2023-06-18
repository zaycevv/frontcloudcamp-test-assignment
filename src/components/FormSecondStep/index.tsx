import React from "react";
import { useAppDispatch } from "../../redux/store";
import { useSelector } from "react-redux";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { AdvantageType } from "../../redux/advantages/types";
import { selectStep } from "../../redux/step/selectors";
import { selectAdvantages } from "../../redux/advantages/selectors";
import { SubmitHandler, useForm } from "react-hook-form";
import { setStep } from "../../redux/step/slice";
import styles from "./FormSecondStep.module.scss";
import { AdvantageItem } from "../AdvantageItem/AdvantageItem";
import { addAdvantage, setAdvanateges } from "../../redux/advantages/slice";

type IFormInput = {
  advantages: AdvantageType[];
  checkbox: string[];
  radio: string;
};

const FormSecondStepScheme = yup.object().shape({
  advantages: yup.array().required(),
  checkbox: yup
    .array()
    .required("Поле обязательно для заполнения")
    .min(1, "Выберите как минимум 1 опицию"),
  radio: yup.string().required("Поле обязательно для заполнения"),
});

export const FormSecondStep = () => {
  const dispatch = useAppDispatch();
  const advantages = useSelector(selectAdvantages);
  const step = useSelector(selectStep);

  const onClickBack = () => {
    dispatch(setStep(step - 1));
  };

  const addAdvantageHandler = () => {
    const id = advantages.length
      ? String(Number(advantages[advantages.length - 1].id) + 1)
      : "0";
    dispatch(addAdvantage({ id: id, title: "" }));
  };

  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    localStorage.setItem("advantages", JSON.stringify(advantages));
    localStorage.setItem("checkbox", JSON.stringify(data.checkbox));
    localStorage.setItem("radio", data.radio);
    localStorage.setItem("step", String(step + 1));
    dispatch(setStep(step + 1));
  };

  const onClick = () => {
    setValue("advantages", advantages);
  };

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      advantages: advantages,
      checkbox: [],
      radio: "",
    },
    resolver: yupResolver(FormSecondStepScheme),
  });

  React.useEffect(() => {
    const advantagesLocal = localStorage.getItem("advantages");
    if (advantagesLocal) dispatch(setAdvanateges(JSON.parse(advantagesLocal)));

    const radioLocal = localStorage.getItem("radio");
    if (radioLocal) setValue("radio", radioLocal);
    const checkboxLocal = localStorage.getItem("checkbox");
    if (checkboxLocal) setValue("checkbox", JSON.parse(checkboxLocal));
  }, []);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className={styles.forms}>
        <div className={styles.forms__advantages}>
          <p>Преимущества</p>
          <div className={styles.forms__advantages__inputs}>
            {advantages.map((obj) => (
              <AdvantageItem key={obj.id} id={obj.id} title={obj.title} />
            ))}
          </div>
          <p className={styles.forms__advantages__error}>
            {errors.advantages?.message}
          </p>
          <button
            id="button-add"
            type="button"
            onClick={addAdvantageHandler}
            className="button button--outline"
          >
            +
          </button>
        </div>
        <div className={styles.forms__checkboxgroup}>
          <p>
            Checkbox group
            <br />
            (группа чекбоксов по русски)
          </p>
          <div id="field-checkbox-group-option-1" className="checkbox">
            <input {...register("checkbox")} value={1} type="checkbox" />
            <span>1</span>
          </div>
          <div id="field-checkbox-group-option-2" className="checkbox">
            <input {...register("checkbox")} value={2} type="checkbox" />
            <span>2</span>
          </div>
          <div id="field-checkbox-group-option-3" className="checkbox">
            <input {...register("checkbox")} value={3} type="checkbox" />
            <span>3</span>
          </div>
          <p className={styles.forms__checkboxgroup__error}>
            {errors.checkbox?.message}
          </p>
        </div>
        <div className={styles.forms__radiobuttongroup}>
          Radio group
          <br />
          (радио кнопки)
          <div className="checkbox">
            <input
              id="field-radio-group-option-1"
              {...register("radio")}
              value={1}
              type="radio"
            />
            <span>1</span>
          </div>
          <div className="checkbox">
            <input
              id="field-radio-group-option-2"
              {...register("radio")}
              value={2}
              type="radio"
            />
            <span>2</span>
          </div>
          <div className="checkbox">
            <input
              id="field-radio-group-option-3"
              {...register("radio")}
              value={3}
              type="radio"
            />
            <span>3</span>
          </div>
          <p className={styles.forms__radiobuttongroup__error}>
            {errors.radio?.message}
          </p>
        </div>
      </div>
      <div className={styles.buttons}>
        <button
          onClick={onClickBack}
          id="button-back"
          className="button button--outline"
        >
          Назад
        </button>
        <button id="button-next" className="button" onClick={onClick}>
          Далее
        </button>
      </div>
    </form>
  );
};
