import {FC, useEffect, useState} from "react";
import {FileData, IOptions} from "@gsu-ai/gsu-ui-core/dist/types/types/globalTypes";

import {CloseIconBold, GsuButton, GsuButtonView} from "@gsu-ai/gsu-ui-core";

import cn from "classnames/dedupe";

import PRODUCTS_OPTIONS from "../../../constants/products";
import {findProductImage} from "../../../helpers/productsStepHelper";

import styles from "./index.module.css";

interface ProductsStepIngredientsProps {
    products: string[];
    onDeleteProduct: (key: string) => void;
    fileData: FileData | null;
    loadImg: () => void;
    clearFile: () => void;
}

const ProductsStepIngredients: FC<ProductsStepIngredientsProps> = ({
    products,
    onDeleteProduct,
    fileData,
    loadImg,
    clearFile,
}) => {
    const [hydrated, setHydrated] = useState(false);
    useEffect(() => setHydrated(true), []);

    const options: IOptions = products.reduce((acc: IOptions, key) => {
        const option = PRODUCTS_OPTIONS[key];
        if (option) {
            acc[key] = {label: option.label, Icon: option.Icon};
        } else {
            acc[key] = {label: key, Icon: findProductImage(key)};
        }
        return acc;
    }, {});

    const renderProductsContainer = () => {
        if (products.length !== 0 && hydrated) {
            return (
                <div className={styles.productContainer}>
                    <GsuButtonView options={options} onDeleteOption={onDeleteProduct} />
                </div>
            );
        }
        return (
            <div className={styles.ingredientsContainer}>
                <h6 className={styles.ingredientsBlockTitle}>Ингредиентов пока нет</h6>
            </div>
        );
    };

    const renderProductsStep = () => {
        if (fileData) {
            return (
                <div className={styles.imageBlockContainer}>
                    <div className={styles.imageBlock}>
                        <div className={styles.imageContainer}>
                            <div className={styles.imageWrapper}>
                                <img className={styles.image} src={String(fileData.src)} alt={fileData.file.name} />
                                <button
                                    className={styles.imageCloseWrapper}
                                    onClick={() => {
                                        clearFile();
                                    }}
                                >
                                    <CloseIconBold />
                                </button>
                            </div>
                            <div className={styles.imageInfoContainer}>
                                <p className={styles.imageName}>{fileData.file.name}</p>
                                <p className={styles.imageSize}>{(fileData.file.size / (1024 * 1024)).toFixed(2)} MB</p>
                            </div>
                        </div>
                        <GsuButton
                            style={"outline"}
                            onClick={loadImg}
                            text={"Обработать фото"}
                            btnClassName={styles.buttonSize}
                        />
                    </div>
                    <div className={cn(styles.ingredientsWrapper, styles.imageIngredientsWrapper)}>
                        {renderProductsContainer()}
                    </div>
                </div>
            );
        }

        return renderProductsContainer();
    };

    return <>{renderProductsStep()}</>;
};

export default ProductsStepIngredients;
