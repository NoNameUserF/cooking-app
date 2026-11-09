import {CSSProperties, FC, memo} from "react";

import styles from "./index.module.css";

const COLOR_FOCUS_RECIPE_STEP_BORDER = "var(--color-tile-border)";
const COLOR_MAIN_BORDER = "var(--color-secondary)";

interface GsuTimerStepProps {
    index: number;
    activeStep: number;
    time: number;
    resetTimer: boolean;
    runningTimer: boolean;
    showAnimation?: boolean;
    setTime?: () => void;
}

const GsuTimerStep: FC<GsuTimerStepProps> = ({index, activeStep, time, resetTimer, runningTimer, showAnimation}) => {
    const recipePaginationValueLastIndex = -2;

    const outerCircleFillColor = () => {
        if (showAnimation) {
            return "none";
        }
        return index < activeStep ? "var(--color-disabled)" : "var(--color-default-theme)";
    };

    const outerCircleStrokeColor = () => {
        if (index === activeStep && showAnimation) {
            return resetTimer ? COLOR_MAIN_BORDER : "var(--color-tile-border)";
        }
        return index === activeStep ? COLOR_MAIN_BORDER : COLOR_FOCUS_RECIPE_STEP_BORDER;
    };

    const animationStyle = (): CSSProperties => {
        if (resetTimer) {
            return {
                animationName: "none",
                animationDuration: "0s",
            };
        }

        const baseStyle: CSSProperties = {
            animationDuration: `${time}s`,
            animationTimingFunction: "linear",
            animationFillMode: "forwards",
        };

        // If the timer is running, just return base style;
        // if paused, we add animationPlayState: paused
        if (runningTimer) {
            return baseStyle;
        } else {
            return {...baseStyle, animationPlayState: "paused"};
        }
    };

    return (
        <svg className={styles.iconSvg} key={index}>
            <circle fill={outerCircleFillColor()} stroke={outerCircleStrokeColor()} strokeWidth="1" />
            <circle
                className={styles.circleTimer}
                fill="none"
                key={`circle-timer-${activeStep}`}
                stroke={index === activeStep && showAnimation ? COLOR_MAIN_BORDER : COLOR_FOCUS_RECIPE_STEP_BORDER}
                strokeWidth="1"
                style={index === activeStep && showAnimation ? animationStyle() : {}}
            />
            <text
                textAnchor="middle"
                className={styles.recipePaginationValue}
                fill={index < activeStep ? "var(--color-back-steps)" : "var(--color-next-steps)"}
            >
                {`0${Number(index + 1)}`.slice(recipePaginationValueLastIndex)}
            </text>
        </svg>
    );
};

export default memo(GsuTimerStep, (prevProps, nextProps) => {
    return (
        prevProps.runningTimer === nextProps.runningTimer &&
        prevProps.resetTimer === nextProps.resetTimer &&
        prevProps.index === nextProps.index &&
        prevProps.activeStep === nextProps.activeStep
    );
});
