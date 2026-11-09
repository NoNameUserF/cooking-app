import {GsuButton, GsuModal, WarningIcon, GsuModalButtons} from "@gsu-ai/gsu-ui-core";

import {FC} from "react";
import {IWarningModal} from "@gsu-ai/gsu-ui-core/dist/types/types/globalTypes.js";

import {convertCurrentProductData, findProductImage, getMissingProducts} from "../../helpers/productsStepHelper";
import {DishStepState} from "../../wizards/DishStep";
import {ProductsStepState} from "../../wizards/ProductsStep";

import styles from "./index.module.css";

const CookingModalWarning: FC<IWarningModal<DishStepState>> = ({
    componentState,
    wizardState,
    openModal,
    setOpenModal,
    next,
}) => {
    const Products = wizardState.Products as ProductsStepState;
    const missingProducts = componentState.selectedDish
        ? getMissingProducts(Products.products, componentState.selectedDish)
        : [];
    const handleClose = () => setOpenModal(false);
    const sendRecipe = () => {
        next();
    };

    return (
        <GsuModal openModal={openModal} setOpenModal={setOpenModal}>
            <div className={styles.displayModal}>
                <div>
                    <WarningIcon />
                </div>
                <h2 className={styles.modalWarningText}>В вашем списке не хватает cледующих продуктов</h2>
                <ul className={styles.modalWarningMenu}>
                    {missingProducts.map((item, index) => {
                        const product = convertCurrentProductData(item);
                        const image = findProductImage(product.productTitle);

                        return (
                            <li key={index} className={styles.modalWarningItem}>
                                <p className={styles.modalWarningImage}>{image}</p>
                                <p className={styles.modalWarningProduct}>{product.productTitle}</p>
                                <p className={styles.modalWarningProductsValue}>{product.productCount}</p>
                            </li>
                        );
                    })}
                </ul>

                <GsuModalButtons>
                    <GsuButton
                        style={"outline"}
                        text={"Отменить"}
                        btnClassName={styles.undoButton}
                        onClick={handleClose}
                    ></GsuButton>

                    <GsuButton
                        style={"primary"}
                        text={"Продолжить"}
                        btnClassName={styles.continueButton}
                        onClick={sendRecipe}
                    ></GsuButton>
                </GsuModalButtons>
            </div>
        </GsuModal>
    );
};

export default CookingModalWarning;
