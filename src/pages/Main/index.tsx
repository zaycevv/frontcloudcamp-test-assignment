import React from "react";
import styles from "./Main.module.scss";
import { ContactItem } from "../../components/ContactItem";
import { Input } from "../../components/Input";

const firstName = "Александр";
const lastName = "Зайцев";

const avatarName = firstName[0] + lastName[0];

const contacts = [
  { id: 1, title: "Telegram", link: "https://t.me/zaycevv_a" },
  { id: 2, title: "GitHub", link: "https://github.com/zaycevv" },
  { id: 3, title: "Resume", link: "/" },
];

export const Main = () => {
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
              <ContactItem {...obj} />
            ))}
          </div>
        </div>
      </div>
      <form className={styles.loginCard__form}>
        <div className={styles.loginCard__form__input}>
          <span>Номер телефона</span>
          <Input />
        </div>
        <div className={styles.loginCard__form__input}>
          <span className={styles.loginCard__form__input__label}>Email</span>
          <Input />
        </div>
        <button className="button" type="submit">
          Начать
        </button>
      </form>
    </div>
  );
};
