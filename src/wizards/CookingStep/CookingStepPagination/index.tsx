import {FC} from "react";

import {IStep} from "../../../api/interfaces";
import GsuTimerStep from "../../../components/GsuTimers/GsuTimerStep";

import styles from "./index.module.css";

interface CookingStepPaginationProps {
    recipeSteps: IStep[];
    activeStep: number;
    runningTimer: boolean;
    resetTimer: boolean;
    setStep: (step: number) => void;
}

const CookingStepPagination: FC<CookingStepPaginationProps> = ({
    recipeSteps,
    activeStep,
    runningTimer,
    resetTimer,
    setStep,
}) => {
    const renderStep = (index: number) => (
        <button key={index} className={styles.timerStepContainer} onClick={() => setStep(index)}>
            <GsuTimerStep
                key={index}
                index={index}
                activeStep={activeStep}
                time={recipeSteps[activeStep].time}
                resetTimer={resetTimer}
                runningTimer={runningTimer}
            />
        </button>
    );

    const renderPagination = () => {
        if (recipeSteps.length <= 6) {
            return recipeSteps.map((item, idx: number) => {
                return renderStep(idx);
            });
        }

        const items = [];
        const ellipsis1 = (
            <p key="ellipsis1" className={styles.ellipsis}>
                ...
            </p>
        );

        const ellipsis2 = (
            <p key="ellipsis2" className={styles.ellipsis}>
                ...
            </p>
        );

        items.push(renderStep(0));
        if (activeStep <= 2) {
            items.push(renderStep(1));
            items.push(renderStep(2));
            items.push(renderStep(3));
            items.push(ellipsis2);
        } else if (activeStep < recipeSteps.length - 3) {
            items.push(ellipsis1);
            items.push(renderStep(activeStep - 1));
            items.push(renderStep(activeStep));
            items.push(renderStep(activeStep + 1));
            items.push(ellipsis2);
        } else {
            items.push(ellipsis1);
            items.push(renderStep(recipeSteps.length - 4));
            items.push(renderStep(recipeSteps.length - 3));
            items.push(renderStep(recipeSteps.length - 2));
        }
        items.push(renderStep(recipeSteps.length - 1));

        return items;
    };

    return <div className={styles.recipePagination}>{renderPagination()}</div>;
};

export default CookingStepPagination;
