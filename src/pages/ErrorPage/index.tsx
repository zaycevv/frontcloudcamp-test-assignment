import React from "react";
import styles from "./ErrorPage.module.scss";

export const ErrorPage: React.FC = () => {
  return (
    <div className={styles.createForm}>
      <div className={styles.createForm__error}>
        <img
          className={styles.createForm__error__secret_image}
          src="https://i.pinimg.com/736x/63/35/92/63359215f088d3416fd8cf76a9b5a601.jpg"
          alt=""
        />
        <h1>ERROR 404</h1>
        <p>Страница не найдена, найден прикол</p>
      </div>
    </div>
  );
};
