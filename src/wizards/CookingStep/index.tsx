import {FC, useLayoutEffect, useState} from "react";
import cn from "classnames/dedupe";

import {
    NextArrowIcon,
    PreviousArrowIcon,
    removeDataFromStorage,
    storeDataToStorage,
    GsuTile,
} from "@gsu-ai/gsu-ui-core";

import {IWizardStep} from "@gsu-ai/gsu-ui-core/dist/types/types/globalTypes";

import {IStep} from "../../api/interfaces";
import GsuMiniTimer from "../../components/GsuTimers/GsuMiniTimer";
import GsuTimer from "../../components/GsuTimers/GsuTimer";

import {capitalize} from "../../helpers/productsStepHelper";

import CookingStepPagination from "./CookingStepPagination";
import styles from "./index.module.css";

export interface CookingStepState {
    steps: IStep[];
    activeStep: number;
}

interface ITimer {
    runningTimer: boolean;
    time: number;
    initTime: number;
    description: string;
    timeLessThanZero: boolean;
}

interface ITimers {
    [key: string]: ITimer;
}

const CookingStep: FC<IWizardStep<CookingStepState>> = ({componentState, change}) => {
    const recipeSteps = componentState.steps;
    const {activeStep} = componentState;

    const setActiveStep = (stepIdx: number) => {
        change({...componentState, activeStep: stepIdx});
    };

    const [timers, setTimers] = useState<ITimers>({});
    const [activeSteps, setActiveSteps] = useState([0]);

    useLayoutEffect(() => {
        const steps: ITimers = {};
        for (let i = 0; i < recipeSteps.length - 1; i++) {
            if (recipeSteps[i].time > 0) {
                steps[i] = {
                    runningTimer: false,
                    time: recipeSteps[i].time,
                    initTime: recipeSteps[i].time,
                    description: recipeSteps[i].description,
                    timeLessThanZero: false,
                };
            }
        }

        setTimers(steps);
    }, [recipeSteps]);

    const setTime = (index: number, value: number) => {
        const timer = timers[index];
        timer.time = value;
        setTimers({
            ...timers,
            [index]: timer,
        });
    };

    const setRunningTimer = (index: number, value: boolean) => {
        const timer = timers[index];
        timer.runningTimer = value;
        if (!value) {
            removeDataFromStorage(`cookingMiniTimer_${index}`);
        }

        if (value) {
            storeDataToStorage(`cookingMiniTimer_${index}`, Date.now());
        }

        setTimers({
            ...timers,
            [index]: timer,
        });
    };

    const setTimeLessThanZero = (index: number, value: boolean) => {
        const timer = timers[index];
        timer.timeLessThanZero = value;
        setTimers({
            ...timers,
            [index]: timer,
        });
    };

    const nextStep = () => {
        setActiveStep(activeStep + 1);
        setActiveSteps([...activeSteps, activeStep + 1]);
    };

    const prevStep = () => {
        setActiveStep(activeStep - 1);
    };

    const setStep = (step: number) => {
        if (activeStep === step) {
            return;
        }

        setActiveStep(step);
        if (step - activeStep > 0) {
            const newActiveSteps = [...activeSteps];
            for (let i = activeStep + 1; i <= step; i++) {
                newActiveSteps.push(i);
            }
            setActiveSteps(newActiveSteps);
        }
    };

    return (
        <div className={styles.cookingStepContainer}>
            <div className={styles.miniTimerParentElement}>
                {Object.keys(timers).map((key: string) => (
                    <div
                        className={styles.cookingStepMiniTimerComponent}
                        key={key}
                        style={{display: activeSteps.includes(Number(key)) ? "block" : "none"}}
                    >
                        <GsuMiniTimer
                            localStoragePrefix={"cookingMiniTimer_"}
                            description={timers[key].description}
                            index={Number(key)}
                            runningTimer={timers[key].runningTimer}
                            setRunningTimer={(value) => setRunningTimer(Number(key), value)}
                            time={timers[key].time}
                            setTime={(value) => setTime(Number(key), value)}
                            initTime={timers[key].initTime}
                            timeLessThanZero={timers[key].timeLessThanZero}
                            setTimeLessThanZero={(value) => setTimeLessThanZero(Number(key), value)}
                        />
                    </div>
                ))}
            </div>
            <div className={styles.recipeContainer}>
                <div className={styles.arrowWrapper}>
                    <button
                        disabled={activeStep === 0}
                        onClick={prevStep}
                        className={cn(styles.arrowLeft, {
                            [styles.arrowWithTimer]: timers[activeStep] && timers[activeStep].initTime > 0,
                        })}
                        style={{opacity: activeStep === 0 ? 0 : 1}}
                    >
                        <PreviousArrowIcon />
                    </button>
                </div>
                <div className={styles.recipeContent}>
                    <GsuTile className={styles.recipeContentInner}>
                        <div className={styles.recipeHeader}>
                            {recipeSteps[activeStep].items.length > 0 && (
                                <div className={styles.recipeItems}>
                                    <p className={styles.recipeItemsDescription}>
                                        {recipeSteps[activeStep].items.map((item) => capitalize(item)).join(", ")}
                                    </p>
                                </div>
                            )}
                            <div className={styles.recipeStepContainer}>
                                <h2 className={styles.recipeStep}>{recipeSteps[activeStep].description}</h2>
                            </div>
                        </div>
                        {timers[activeStep] && timers[activeStep].initTime > 0 && (
                            <GsuTimer
                                runningTimer={timers[activeStep]?.runningTimer}
                                setRunningTimer={(value) => setRunningTimer(activeStep, value)}
                                time={timers[activeStep]?.time}
                                setTime={(value) => setTime(activeStep, value)}
                                initTime={timers[activeStep]?.initTime}
                                control={false}
                                setTimeLessThanZero={(value) => setTimeLessThanZero(activeStep, value)}
                            />
                        )}
                    </GsuTile>

                    <CookingStepPagination
                        runningTimer={timers[activeStep]?.runningTimer || false}
                        activeStep={activeStep}
                        recipeSteps={recipeSteps}
                        setStep={setStep}
                        resetTimer={false}
                    />
                </div>
                <div className={styles.arrowWrapper}>
                    <button
                        disabled={activeStep === recipeSteps.length - 1}
                        onClick={nextStep}
                        className={cn(styles.arrowRight, {
                            [styles.arrowWithTimer]: timers[activeStep] && timers[activeStep].initTime > 0,
                        })}
                        style={{opacity: activeStep === recipeSteps.length - 1 ? 0 : 1}}
                    >
                        <NextArrowIcon />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CookingStep;
