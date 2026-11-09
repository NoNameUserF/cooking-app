import {FC} from "react";
import {NavBarIconProps} from "@gsu-ai/gsu-ui-core/dist/types/types/globalTypes";

import styles from "../index.module.css";

const DishNameIcon: FC<NavBarIconProps> = ({active}) => {
    return (
        <svg
            className={active ? styles.active : styles.default}
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                d="M2.5 16.7324H17.5"
                stroke="#8F897F"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M3.37061 14.8892C3.64602 13.3203 4.46279 11.8976 5.67879 10.8687C6.89479 9.83978 8.43304 9.26975 10.0259 9.25781C11.6155 9.26152 13.1521 9.82977 14.3617 10.8612C15.5713 11.8926 16.3752 13.3201 16.63 14.8892"
                stroke="#8F897F"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M10.0264 9.20704C10.7615 9.20704 11.3574 8.61111 11.3574 7.87598C11.3574 7.14086 10.7615 6.54492 10.0264 6.54492C9.29125 6.54492 8.69531 7.14086 8.69531 7.87598C8.69531 8.61111 9.29125 9.20704 10.0264 9.20704Z"
                stroke="#8F897F"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M10.0254 2.5V4.39419"
                stroke="#8F897F"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M6.08301 3.78125V5.62426"
                stroke="#8F897F"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M13.9673 3.78125V5.62426"
                stroke="#8F897F"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
};

export default DishNameIcon;
