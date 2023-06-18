import React, { ChangeEvent } from "react";
import styles from "./AdvantageItem.module.scss";
import { useAppDispatch } from "../../redux/store";
import { removeAdvantage, updateAdvantage } from "../../redux/advantages/slice";

interface AdvantageItemProps {
  id: string;
  title: string;
}

export const AdvantageItem: React.FC<AdvantageItemProps> = ({ id, title }) => {
  const [inputTitle, setInputTitle] = React.useState<string>("");
  const [editMode, setEditMode] = React.useState<boolean>(false);

  const dispatch = useAppDispatch();

  const changeAdvantageTitleHandler = React.useCallback(
    (newInputValue: string) => {
      dispatch(updateAdvantage({ id: id, title: newInputValue.trim() }));
    },
    [dispatch, id]
  );

  const onClickEditSpanHandler = () => {
    setEditMode(true);
    setInputTitle(title);
  };

  const onClickNotEditSpanHandler = () => {
    changeAdvantageTitleHandler(inputTitle);
    setEditMode(false);
  };

  const onChangeInputHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setInputTitle(event.currentTarget.value);
  };

  const deleteAdvantageHandler = React.useCallback(() => {
    dispatch(removeAdvantage(id));
  }, [dispatch, id]);

  return (
    <div key={id} className={styles.advantage}>
      {editMode ? (
        <input
          id={`field-advantages-${id}`}
          className="input"
          value={inputTitle}
          type="text"
          onChange={onChangeInputHandler}
          onBlur={onClickNotEditSpanHandler}
          placeholder="Введите текст..."
          maxLength={30}
        />
      ) : (
        <div
          id={`field-advantages-${id}`}
          className="input"
          onClick={onClickEditSpanHandler}
        >
          {title ? title : "Введите текст..."}
        </div>
      )}
      <svg
        width="20"
        height="19"
        viewBox="0 0 20 19"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        onClick={deleteAdvantageHandler}
      >
        <path
          d="M5.453 16.6522L4.55826 8.15225C4.52719 7.85703 4.75867 7.5999 5.05552 7.5999H14.9447C15.2416 7.5999 15.4731 7.85703 15.442 8.15225L14.5472 16.6522C14.5205 16.9067 14.3059 17.0999 14.05 17.0999H5.95025C5.69437 17.0999 5.47979 16.9067 5.453 16.6522Z"
          fill="#CCCCCC"
        />
        <path
          d="M17.0001 5.6999H3.00012C2.72398 5.6999 2.50012 5.47605 2.50012 5.1999V4.2999C2.50012 4.02376 2.72398 3.7999 3.00012 3.7999H5.35511C5.44983 3.7999 5.54261 3.77299 5.62263 3.72231L8.37761 1.97749C8.45764 1.92681 8.55041 1.8999 8.64514 1.8999H11.3551C11.4498 1.8999 11.5426 1.92681 11.6226 1.97749L14.3776 3.72231C14.4576 3.77299 14.5504 3.7999 14.6451 3.7999H17.0001C17.2763 3.7999 17.5001 4.02376 17.5001 4.2999V5.1999C17.5001 5.47604 17.2763 5.6999 17.0001 5.6999Z"
          fill="#CCCCCC"
        />
      </svg>
    </div>
  );
};
