import React from "react";
import { useSelector } from "react-redux";
import { selectStep } from "../../redux/step/selectors";
import MarkIcon from "../../assets/icons/mark.svg";

export const StepLine: React.FC = () => {
  const step = useSelector(selectStep);
  return (
    <div className="stepsLine">
      <div className="stepsLine__step">
        <div className={`circle ${step >= 1 ? "circle--active" : ""}`}>
          {step === 1 ? (
            <div className="circle__status" />
          ) : step > 1 ? (
            <img src={MarkIcon} alt="mark-icon" />
          ) : (
            ""
          )}
        </div>
        <span
          className={`stepsLine__step__count ${
            step >= 1 ? "stepsLine__step__count--active" : ""
          }`}
        >
          1
        </span>
      </div>
      <div className={`line ${step > 1 ? "line--active" : ""}`}></div>
      <div className="stepsLine__step">
        <div className={`circle ${step >= 2 ? "circle--active" : ""}`}>
          {step === 2 ? (
            <div className="circle__status" />
          ) : step > 2 ? (
            <img src={MarkIcon} alt="mark-icon" />
          ) : (
            ""
          )}
        </div>
        <span
          className={`stepsLine__step__count ${
            step >= 2 ? "stepsLine__step__count--active" : ""
          }`}
        >
          2
        </span>
      </div>
      <div className={`line ${step > 2 ? "line--active" : ""}`}></div>
      <div className="stepsLine__step">
        <div className={`circle ${step === 3 ? "circle--active" : ""}`}>
          {step === 3 ? (
            <div className="circle__status" />
          ) : step > 3 ? (
            <img src={MarkIcon} alt="mark-icon" />
          ) : (
            ""
          )}
        </div>
        <span
          className={`stepsLine__step__count ${
            step >= 3 ? "stepsLine__step__count--active" : ""
          }`}
        >
          3
        </span>
      </div>
    </div>
  );
};
