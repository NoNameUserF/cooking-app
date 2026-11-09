import {GsuButton, GsuModal, GsuModalButtons} from "@gsu-ai/gsu-ui-core";

import {FC} from "react";
import {IFinishModal} from "@gsu-ai/gsu-ui-core/dist/types/types/globalTypes";

import {CookingStepState} from "../../wizards/CookingStep";

import styles from "./index.module.css";

const CookingModalAbort: FC<IFinishModal<CookingStepState>> = ({
    componentState,
    openModal,
    setOpenModal,
    finishWizard,
}) => {
    const {steps} = componentState;
    const {activeStep} = componentState;

    const closeModal = () => {
        setOpenModal(false);
    };

    const formatRemainingSteps = () => {
        const remainingSteps = steps.length - activeStep - 1;

        const lastTwo = remainingSteps % 100;
        const lastOne = remainingSteps % 10;

        if (lastTwo >= 11 && lastTwo <= 14) {
            return `${remainingSteps} шагов`;
        }

        switch (lastOne) {
            case 1:
                return `${remainingSteps} шаг`;
            case 2:
            case 3:
            case 4:
                return `${remainingSteps} шага`;
            default:
                return `${remainingSteps} шагов`;
        }
    };

    return (
        <GsuModal openModal={openModal} setOpenModal={setOpenModal}>
            <div className={styles.modalAbortText} id="modal-modal-description">
                <p className={styles.modalAbortMainText}>
                    Вы действительно хотите прервать процесс приготовления? Вам осталось еще{" "}
                    <span className={styles.modalAbortTextRemainingSteps}>{formatRemainingSteps()}</span>
                </p>
            </div>
            <GsuModalButtons>
                <GsuButton
                    text={"Назад к приготовлению"}
                    style={"outline"}
                    onClick={closeModal}
                    btnClassName={styles.backToCook}
                ></GsuButton>
                <GsuButton
                    onClick={finishWizard}
                    style={"destructive"}
                    btnClassName={styles.abortProcess}
                    text={"Завершить процесс"}
                ></GsuButton>
            </GsuModalButtons>
        </GsuModal>
    );
};

export default CookingModalAbort;
