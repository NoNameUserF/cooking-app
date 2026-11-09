import {FC, memo, useCallback, useEffect, useRef} from "react";

import {formatTime, getDataFromStorage, storeDataToStorage} from "@gsu-ai/gsu-ui-core";

import GsuTimerStep from "../GsuTimerStep";
import GsuTimerTooltip from "../GsuTimerTooltip";
import GsuMiniTimersButtons from "../GsuMiniTimerButtons";

import styles from "./index.module.css";

interface GsuMiniTimerProps {
    runningTimer: boolean;
    setRunningTimer: (value: boolean) => void;
    time: number;
    setTime: (time: number) => void;
    initTime: number;
    index: number;
    description: string;
    localStoragePrefix: string;
    timeLessThanZero: boolean;
    setTimeLessThanZero: (value: boolean) => void;
}

const GsuMiniTimer: FC<GsuMiniTimerProps> = ({
    runningTimer,
    setRunningTimer,
    time,
    setTime,
    initTime,
    index,
    description,
    timeLessThanZero,
    setTimeLessThanZero,
    localStoragePrefix,
}) => {
    const audioRef = useRef(new Audio("/core/sounds/timer-signal2.mp3"));

    useEffect(() => {
        let timerInterval: NodeJS.Timeout | number;

        if (runningTimer && time > -12) {
            timerInterval = setInterval(() => {
                if (localStoragePrefix) {
                    const diffInSeconds = Math.round(
                        (Number(Date.now()) - Number(getDataFromStorage(`${localStoragePrefix}${index}`))) / 1000,
                    );
                    storeDataToStorage(`${localStoragePrefix}${index}`, Date.now());
                    setTime(time - diffInSeconds);
                } else {
                    setTime(time - 1);
                }
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
    }, [time, runningTimer]);

    const repeatTimer = () => {
        setTimeLessThanZero(false);
        setTime(initTime);
    };

    const pauseTimer = () => {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;

        setRunningTimer(false);
    };

    const memoizedButtons = useCallback(
        () => (
            <GsuMiniTimersButtons
                description={description}
                runningTimer={runningTimer}
                setRunningTimer={setRunningTimer}
                repeatTimer={repeatTimer}
                pauseTimer={() => pauseTimer()}
                timeLessThanZero={timeLessThanZero}
            />
        ),
        [runningTimer, timeLessThanZero],
    );

    return (
        <div className={styles.miniTimerTooltipContainer}>
            <GsuTimerTooltip Component={memoizedButtons}>
                <div className={styles.miniTimerTime}>
                    <div className={styles.miniTimerTimeValue}>{formatTime(time)}</div>
                    <GsuTimerStep
                        showAnimation={true}
                        index={index}
                        activeStep={index}
                        time={initTime}
                        runningTimer={runningTimer}
                        resetTimer={initTime === time && !runningTimer}
                    />
                </div>
            </GsuTimerTooltip>
        </div>
    );
};

export default memo(GsuMiniTimer, (prevProps, nextProps) => {
    return prevProps.runningTimer === nextProps.runningTimer && prevProps.time === nextProps.time;
});
