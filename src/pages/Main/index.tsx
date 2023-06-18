import React from "react";
import styles from "./Main.module.scss";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { ContactItem } from "../../components/ContactItem";
import { useNavigate } from "react-router-dom";
import { SubmitHandler, useForm } from "react-hook-form";
import InputMask from "react-input-mask";

type IFormInput = {
  phone: string;
  email: string;
};

const firstName = "Александр";
const lastName = "Зайцев";

const avatarName = firstName[0] + lastName[0];

const contacts = [
  { id: 1, title: "Telegram", link: "https://t.me/zaycevv_a" },
  { id: 2, title: "GitHub", link: "https://github.com/zaycevv" },
  {
    id: 3,
    title: "Resume",
    link: "https://drive.google.com/file/d/1YYXHaf7n8o3qM0eZIvryrHRmResRhERE/view?usp=sharing",
  },
];

const MainSchema = yup.object().shape({
  phone: yup
    .string()
    .required("Поле обязательно для заполнения")
    .min(18, "Поле должно состоять из 11 цифр")
    .max(18, "Поле должно состоять из 11 цифр"),
  email: yup
    .string()
    .required("Поле обязательно для заполнения")
    .email(
      "Поле должно содержать @, быть без пробелов и состоять из латинских букв"
    ),
});

export const Main = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      phone: "",
      email: "",
    },
    resolver: yupResolver(MainSchema),
  });

  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    localStorage.setItem("phone", data.phone);
    localStorage.setItem("email", data.email);
    navigate("/create");
  };

  React.useEffect(() => {
    const phoneLocal = localStorage.getItem("phone");
    phoneLocal
      ? setValue("phone", phoneLocal)
      : setValue("phone", "+7 (000) 000-00-00");
    const emailLocal = localStorage.getItem("email");
    emailLocal
      ? setValue("email", emailLocal)
      : setValue("email", "0xzayeth@gmail.com");
  }, []);

  return (
    <div className={styles.loginCard}>
      <div className={styles.loginCard__header}>
        <div className="avatar">
          <span>{avatarName}</span>
        </div>
        <div className={styles.loginCard__header__info}>
          <h3>
            {firstName} {lastName}
          </h3>
          <div className={styles.loginCard__header__info__contacts}>
            {contacts.map((obj) => (
              <ContactItem key={obj.id} {...obj} />
            ))}
          </div>
        </div>
      </div>
      <form
        className={styles.loginCard__form}
        onSubmit={handleSubmit(onSubmit)}
      >
        <label className={styles.loginCard__form__input}>
          Номер телефона
          <InputMask
            id="field-phone"
            className="input input--disabled"
            mask={"+7 (999) 999-99-99"}
            alwaysShowMask={false}
            placeholder="+7 (000) 000-00-00"
            disabled={true}
            {...register("phone")}
          />
          <p className={styles.loginCard__form__input__error}>
            {errors.phone?.message}
          </p>
        </label>
        <label className={styles.loginCard__form__input}>
          Email
          <input
            id="field-email"
            className="input input--disabled"
            placeholder="mail@mail.com"
            disabled={true}
            {...register("email")}
          />
          <p className={styles.loginCard__form__input__error}>
            {errors.email?.message}
          </p>
        </label>
        <button id="button-start" className="button" type="submit">
          Начать
        </button>
      </form>
    </div>
  );
};
