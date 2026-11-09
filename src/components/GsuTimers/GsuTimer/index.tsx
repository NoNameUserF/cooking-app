import {FC, useEffect, useRef} from "react";
import cn from "classnames/dedupe";

import {formatTime, GsuButton, GsuTile, PauseIcon, ResetIconActive, ResetIconDisabled} from "@gsu-ai/gsu-ui-core";

import {TimerStartIcon, TimerStartDisabledIcon} from "../../../core/icons";

import styles from "./index.module.css";

interface GsuTimerProps {
    runningTimer: boolean;
    setRunningTimer: (value: boolean) => void;
    time: number;
    setTime: (time: number) => void;
    initTime: number;
    control: boolean;
    setTimeLessThanZero: (value: boolean) => void;
}

const GsuTimer: FC<GsuTimerProps> = ({
    runningTimer,
    setRunningTimer,
    time,
    setTime,
    initTime,
    control,
    setTimeLessThanZero,
}) => {
    const audioRef = useRef(new Audio("/core/sounds/timer-signal2.mp3"));

    useEffect(() => {
        if (control) {
            let timerInterval: NodeJS.Timeout | number;
            if (runningTimer && time > -12) {
                timerInterval = setInterval(() => {
                    setTime(time - 1);
                }, 1000);
            }

            if (Number(time) <= -12 && Number(initTime) !== 0) {
                setRunningTimer(false);
            }
            if (Number(time) <= 0 && Number(initTime) !== 0) {
                setTimeLessThanZero(true);
                audioRef.current.currentTime = 0;
                audioRef.current.play();
            }

            if (Number(time) <= 0 && !runningTimer) {
                audioRef.current.pause();
                audioRef.current.currentTime = 0;
            }

            return () => clearInterval(timerInterval);
        }
    }, [time, runningTimer]);

    const repeatTimer = () => {
        setTimeLessThanZero(false);
        setTime(initTime);
    };

    const pauseTimer = () => {
        audioRef.current.pause();
        setRunningTimer(false);
    };

    return (
        <div className={styles.timerWrapper}>
            <GsuTile className={styles.timer}>
                <h2 className={styles.timerValue}>{formatTime(time)}</h2>
                <div className={styles.timerButtonContainer}>
                    {runningTimer ? (
                        <GsuButton
                            text={"Пауза"}
                            Icon={PauseIcon}
                            style={"primary"}
                            btnClassName={cn(styles.timerButton, styles.timerButtonPause)}
                            onClick={() => pauseTimer()}
                        ></GsuButton>
                    ) : (
                        <GsuButton
                            text={"Старт"}
                            Icon={runningTimer || time <= 0 ? TimerStartDisabledIcon : TimerStartIcon}
                            btnClassName={cn(styles.timerButton, styles.timerButtonStart)}
                            disabled={runningTimer || time <= 0}
                            style={"primary"}
                            onClick={() => setRunningTimer(true)}
                        ></GsuButton>
                    )}
                    <GsuButton
                        text={"Сбросить"}
                        Icon={runningTimer ? ResetIconDisabled : ResetIconActive}
                        style={"outline"}
                        btnClassName={cn(styles.timerButton, styles.timerButtonReset)}
                        disabled={runningTimer}
                        onClick={() => repeatTimer()}
                    ></GsuButton>
                </div>
            </GsuTile>
        </div>
    );
};

export default GsuTimer;
