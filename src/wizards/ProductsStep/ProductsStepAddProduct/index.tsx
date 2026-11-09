import {ChangeEvent, FC, useRef} from "react";

import cn from "classnames/dedupe";

import {GsuButton, GsuMultiAutocomplete} from "@gsu-ai/gsu-ui-core";

import GsuMobileAutocompleteActions from "../../../components/GsuMobileAutocompleteActions";

import {PhotoIconGrey} from "../../../assets/CustomizeSvg/NavBar/Icons";
import PRODUCTS_OPTIONS from "../../../constants/products";

import styles from "./index.module.css";

interface ProductsStepAddProductProps {
    addProductClickEvent: (key: string[]) => void;
    products: string[];
    displayMobileIcon: boolean;
    prepareImg: (file: File) => void;
}

const ProductsStepAddProduct: FC<ProductsStepAddProductProps> = ({
    addProductClickEvent,
    products,
    displayMobileIcon,
    prepareImg,
}) => {
    const handleOptionSelect = (key: string[]) => {
        addProductClickEvent(key);
    };

    const inputFile = useRef<HTMLInputElement>(null);

    const openFilePicker = () => {
        if (inputFile?.current) {
            inputFile.current.click();
        }
    };

    const onImageChange = (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files ? event.target.files[0] : null;
        if (prepareImg && file) {
            prepareImg(file);
        }
    };

    return (
        <>
            <div className={cn(styles.desktopAutocompleteWrapper)}>
                <div
                    className={cn(styles.desktopAutocomplete, {
                        [styles.desktopAutocompleteHidden]: !displayMobileIcon,
                    })}
                >
                    <GsuMultiAutocomplete
                        minValuesLength={2}
                        values={products}
                        listName={"Список продуктов"}
                        placeholder={"Выберите продукт"}
                        options={PRODUCTS_OPTIONS}
                        onOptionsSelect={handleOptionSelect}
                        onRemoveMessage={(label) => `Ингредиент "${label}" удален`}
                        onAddMessage={(label) => `Ингредиент "${label}" добавлен`}
                        hasDefaultValue={false}
                    />
                </div>
                {displayMobileIcon && (
                    <GsuMobileAutocompleteActions
                        onRemoveMessage={(label) => `Ингредиент "${label}" удален`}
                        onAddMessage={(label) => `Ингредиент "${label}" добавлен`}
                        listName={"Список продуктов"}
                        openFilePicker={openFilePicker}
                        options={PRODUCTS_OPTIONS}
                        values={products}
                        onOptionsSelect={handleOptionSelect}
                    />
                )}
                {/* <button */}
                {/*     onClick={openFilePicker} */}
                {/*     className={cn(styles.addPhotoIconBtn, {[styles.addPhotoIconBtnWithDrag]: !displayMobileIcon})} */}
                {/* > */}
                {/*     <MobileOpenPhotoIcon /> */}
                {/* </button> */}

                <GsuButton
                    btnClassName={styles.addPhotoIconBtn}
                    style={"outline"}
                    onClick={openFilePicker}
                    Icon={PhotoIconGrey}
                />

                <input
                    accept="image/*"
                    onChange={onImageChange}
                    type="file"
                    id="file"
                    ref={inputFile}
                    style={{display: "none"}}
                />
            </div>
        </>
    );
};

export default ProductsStepAddProduct;
