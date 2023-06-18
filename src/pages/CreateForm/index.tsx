import React from "react";
import { FormFirstStep } from "../../components/FormFirstStep";
import { useSelector } from "react-redux";
import { selectStep } from "../../redux/step/selectors";
import { useAppDispatch } from "../../redux/store";
import { setStep } from "../../redux/step/slice";
import styles from "./CreateForm.module.scss";
import { FormThirdStep } from "../../components/FormThirdStep";
import { FormSecondStep } from "../../components/FormSecondStep";
import { StepLine } from "../../components/StepLine";

export const CreateForm = () => {
  const step = useSelector(selectStep);
  const dispatch = useAppDispatch();

  React.useEffect(() => {
    const stepLocal = Number(localStorage.getItem("step"));
    if (stepLocal !== 0) {
      dispatch(setStep(stepLocal));
    } else {
      localStorage.setItem("step", "1");
      dispatch(setStep(1));
    }
  }, []);

  return (
    <div className={styles.createForm}>
      <StepLine />
      {step === 1 && <FormFirstStep />}
      {step === 2 && <FormSecondStep />}
      {step === 3 && <FormThirdStep />}
    </div>
  );
};
