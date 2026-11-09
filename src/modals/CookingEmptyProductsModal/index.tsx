import {GsuButton, GsuModal, WarningIcon, GsuModalButtons} from "@gsu-ai/gsu-ui-core";

import {FC} from "react";
import {IErrorModal} from "@gsu-ai/gsu-ui-core/dist/types/types/globalTypes";

import styles from "./index.module.css";

const CookingEmptyProductsModal: FC<IErrorModal<unknown>> = ({openModal, setOpenModal}) => {
    const handleClose = () => {
        setOpenModal(false);
    };

    return (
        <GsuModal openModal={openModal} setOpenModal={handleClose}>
            <div className={styles.displayModalEmpty}>
                <div className={styles.warningIcon}>
                    <WarningIcon />
                </div>
                <h2 className={styles.modalEmptyText}>Не удалось распознать какие-либо продукты</h2>
                <p className={styles.modalEmptyHelper}>Выберите другое изображение, на котором присутствует еда</p>
                <GsuModalButtons>
                    <GsuButton
                        text={"Выбрать другое изображение"}
                        style={"primary"}
                        btnClassName={styles.modalEmptyButton}
                        onClick={handleClose}
                    ></GsuButton>
                </GsuModalButtons>
            </div>
        </GsuModal>
    );
};

export default CookingEmptyProductsModal;
