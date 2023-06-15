import React from "react";
import styles from "./ContactItem.module.scss";
import FolderIcon from "../../assets/icons/folder.svg";

interface ContactItemProps {
  title: string;
  link: string;
}

export const ContactItem: React.FC<ContactItemProps> = ({ title, link }) => {
  return (
    <div className={styles.contact}>
      <div className={styles.contact__icon}>
        <img src={FolderIcon} alt="folder-icon" />
      </div>
      <div className={styles.contact__link}>
        <a href={link} target="_blank">
          {title}
        </a>
      </div>
    </div>
  );
};
