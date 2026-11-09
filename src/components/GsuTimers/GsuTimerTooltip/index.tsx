import {ComponentType, FC, ReactNode, useEffect, useRef, useState} from "react";

import styles from "./index.module.css";

interface GsuTimerTooltipProps {
    Component: ComponentType;
    children: ReactNode;
}

interface TooltipState {
    isVisible: boolean;
}

interface TooltipPosition {
    left: string | null;
    right: string | null;
}

const GsuTimerTooltip: FC<GsuTimerTooltipProps> = ({Component, children}) => {
    const [tooltipState, setTooltipState] = useState<TooltipState>({isVisible: false});
    const [tooltipPosition, setTooltipPosition] = useState<TooltipPosition>({left: null, right: null});
    const [tooltipArrowPosition, setTooltipArrowPosition] = useState<TooltipPosition>({left: null, right: null});
    const [left, setLeft] = useState<number>(0);

    const tooltipRef = useRef<HTMLDivElement | null>(null);
    const timeRef = useRef<HTMLDivElement | null>(null);

    const handleClickOutside = (event: MouseEvent | TouchEvent) => {
        // Ensure event.target is a Node so we can safely call .contains()
        if (
            tooltipRef.current &&
            timeRef.current &&
            event.target instanceof Node &&
            !tooltipRef.current.contains(event.target) &&
            !timeRef.current.contains(event.target)
        ) {
            setTooltipState({isVisible: false});
        }
    };

    useEffect(() => {
        if (tooltipState.isVisible) {
            document.addEventListener("mousedown", handleClickOutside);
            document.addEventListener("touchstart", handleClickOutside);
        } else {
            document.removeEventListener("mousedown", handleClickOutside);
            document.removeEventListener("touchstart", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
            document.removeEventListener("touchstart", handleClickOutside);
        };
    }, [tooltipState.isVisible]);

    const isMobile = (): boolean => window.innerWidth <= 560;
    const isTablet = (): boolean => window.innerWidth <= 1024;

    const handleMouseEnter = (e: React.MouseEvent<HTMLDivElement>) => {
        if (isTablet()) return;
        if (!tooltipState.isVisible) {
            if (e.clientX > window.innerWidth / 2 + 120) {
                setTooltipArrowPosition({left: "auto", right: "18px"});
                setTooltipPosition({right: "36px", left: "auto"});
            } else {
                setTooltipArrowPosition({left: "20px", right: "auto"});
                setTooltipPosition({left: "-10px", right: "auto"});
            }
        }
        setTooltipState({isVisible: true});
    };

    const handleMouseLeave = () => {
        if (isTablet()) return;
        setTooltipState({isVisible: false});
    };

    const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
        if (!isTablet()) return;
        if (!tooltipState.isVisible) {
            if (e.targetTouches.length === 1) {
                if (e.targetTouches[0].clientX > window.innerWidth / 2) {
                    setTooltipArrowPosition({left: "auto", right: "16px"});
                    setTooltipPosition({right: "36px", left: "auto"});
                } else {
                    setTooltipArrowPosition({left: "16px", right: "auto"});
                    setTooltipPosition({left: "-8px", right: "auto"});
                }
            }
        }
        setTooltipState({isVisible: true});
    };

    return (
        <div ref={timeRef}>
            <div
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                onTouchStart={handleTouchStart}
                ref={(ref) => {
                    if (ref) {
                        // parentElement could be null, so check it safely
                        const parentEl = ref.parentElement;
                        if (parentEl) {
                            const newLeft = parentEl.offsetLeft;
                            if (newLeft !== left) setLeft(newLeft);
                        }
                    }
                }}
            >
                {children}

                {tooltipState.isVisible && (
                    <div
                        style={{
                            left: isMobile() ? "0px" : tooltipPosition.left || "",
                            right: tooltipPosition.right || "",
                        }}
                        className={styles.tooltip}
                    >
                        <div
                            className={styles.tooltipArrow}
                            style={{
                                left: isMobile() ? `${left}px` : tooltipArrowPosition.left || "",
                                right: isMobile() ? "auto" : tooltipArrowPosition.right || "",
                            }}
                        />
                        <div className={styles.tooltipComponent} ref={tooltipRef}>
                            <Component />
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default GsuTimerTooltip;
