import {FC, memo} from "react";

import {GsuButton, PauseIcon, ResetIconActive, ResetIconDisabled} from "@gsu-ai/gsu-ui-core";

import {TimerStartDisabledIcon, TimerStartIcon} from "../../../core/icons";

import styles from "./index.module.css";

interface GsuMiniTimersButtonsProps {
    runningTimer: boolean;
    setRunningTimer: (value: boolean) => void;
    description: string;
    pauseTimer: () => void;
    repeatTimer: () => void;
    timeLessThanZero: boolean;
}

const GsuMiniTimersButtons: FC<GsuMiniTimersButtonsProps> = ({
    runningTimer,
    setRunningTimer,
    description,
    pauseTimer,
    repeatTimer,
    timeLessThanZero,
}) => {
    return (
        <>
            <label className={styles.miniTimerText}>{description}</label>
            <div className={styles.miniTimerButtons}>
                {runningTimer ? (
                    <GsuButton
                        text={"Пауза"}
                        Icon={PauseIcon}
                        style={"primary"}
                        btnClassName={styles.miniTimerButton}
                        onClick={() => pauseTimer()}
                    ></GsuButton>
                ) : (
                    <GsuButton
                        text={"Старт"}
                        Icon={runningTimer || timeLessThanZero ? TimerStartDisabledIcon : TimerStartIcon}
                        btnClassName={styles.miniTimerButton}
                        disabled={runningTimer || timeLessThanZero}
                        style={"primary"}
                        onClick={() => setRunningTimer(true)}
                    ></GsuButton>
                )}
                <GsuButton
                    Icon={runningTimer ? ResetIconDisabled : ResetIconActive}
                    text={"Сбросить"}
                    style={"outline"}
                    disabled={runningTimer}
                    btnClassName={styles.miniTimerButton}
                    onClick={() => repeatTimer()}
                ></GsuButton>
            </div>
        </>
    );
};

export default memo(GsuMiniTimersButtons, (prevProps, nextProps) => {
    return (
        prevProps.runningTimer === nextProps.runningTimer && prevProps.timeLessThanZero === nextProps.timeLessThanZero
    );
});
