import {GsuButton, GsuModal, WarningIcon, GsuModalButtons} from "@gsu-ai/gsu-ui-core";

import {FC} from "react";
import {IErrorModal} from "@gsu-ai/gsu-ui-core/dist/types/types/globalTypes";

import styles from "./index.module.css";

export const CookingDishNameError: FC<IErrorModal<unknown>> = ({reset, openModal, setOpenModal}) => {
    return (
        <GsuModal openModal={openModal} setOpenModal={setOpenModal}>
            <div className={styles.cookingDishNameErrorContainer}>
                <div className={styles.cookingDishNameErrorWarningImg}>
                    <WarningIcon />
                </div>
                <h2 className={styles.cookingDishNameErrorHeader}>Блюдо с таким названием не существует</h2>
                <p className={styles.cookingDishNameErrorMessage}>Пожалуйста, введите корректное название блюда</p>
                <GsuModalButtons>
                    <GsuButton
                        btnClassName={styles.cookingDishNameErrorBtn}
                        style={"primary"}
                        text={"Ввести заново"}
                        onClick={reset}
                    />
                </GsuModalButtons>
            </div>
        </GsuModal>
    );
};

export default CookingDishNameError;
