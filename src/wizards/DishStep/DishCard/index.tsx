import {FC} from "react";

import {GsuSelectCartProps} from "@gsu-ai/gsu-ui-core/dist/types/types/globalTypes";

import {findProductInProductList} from "../../../helpers/productsStepHelper";
import {IDish} from "../../../api/interfaces";

import {ClockIcon} from "../../../core/icons";

import styles from "./index.module.css";

interface DishCard extends GsuSelectCartProps<IDish> {
    productList: string[] | null;
}

const DishCard: FC<DishCard> = ({card, productList}) => {
    return (
        <>
            <div className={styles.headerContainer}>
                <div className={styles.cardImgContainer}>
                    <img
                        className={styles.cardImg}
                        src={card.imageSrc ? card.imageSrc : "/images/placeholder.svg"}
                        alt={card.name}
                    />
                    <div className={styles.cardTimeGroup}>
                        <ClockIcon />
                        <label className={styles.cardTime}>{`${card.time} мин`}</label>
                    </div>
                </div>
            </div>

            <h6 className={styles.cardTitle}>{card.name}</h6>
            <label className={styles.cardDescription}>{card.description}</label>
            <div className={styles.cardProductBlock}>
                <ul className={styles.cardProduct}>
                    {card.products.map((product, index) => (
                        <li
                            style={{
                                color:
                                    !productList || findProductInProductList(product, productList)
                                        ? "var(--color-secondary-description-text)"
                                        : "var(--color-error)",
                            }}
                            key={index}
                            className={styles.productItem}
                        >
                            {product}
                        </li>
                    ))}
                </ul>
            </div>
        </>
    );
};

export default DishCard;
