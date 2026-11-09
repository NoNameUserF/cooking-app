import {IOption} from "@gsu-ai/gsu-ui-core/dist/types/types/globalTypes";

import {FC} from "react";

import {IDish} from "../api/interfaces";
import PRODUCTS_OPTIONS from "../constants/products";
import {IProductData} from "../types/globalTypes";

const extractProductName = (productFromDish: string): string => {
    const indexIngredient = productFromDish.indexOf("(");
    if (indexIngredient >= 0) {
        return productFromDish.substring(0, indexIngredient).trim();
    } else {
        return productFromDish.trim();
    }
};

const extractPrefixFromProductName = (productName: string): string => {
    return productName.substring(0, productName.length - 1);
};

export const findProductInProductList = (rowProduct: string, productList: string[]): boolean => {
    const rowProductName = extractProductName(rowProduct);

    let exist = false;
    productList.forEach((key) => {
        const productFromList = PRODUCTS_OPTIONS[key] ? PRODUCTS_OPTIONS[key].label : key;
        if (productFromList.length > rowProductName.length) {
            if (extractPrefixFromProductName(productFromList).toLowerCase() === rowProductName.toLowerCase()) {
                exist = true;
            }
        } else if (productFromList.length < rowProductName.length) {
            if (extractPrefixFromProductName(rowProductName).toLowerCase() === productFromList.toLowerCase()) {
                exist = true;
            }
        } else {
            if (
                extractPrefixFromProductName(rowProductName).toLowerCase() ===
                extractPrefixFromProductName(productFromList).toLowerCase()
            ) {
                exist = true;
            }
        }
    });

    return exist;
};

export const getMissingProducts = (productList: string[], selectedDish: IDish): string[] => {
    const missingProducts: string[] = [];

    selectedDish.products.forEach((productFromDish) => {
        const productName = extractProductName(productFromDish);

        if (!findProductInProductList(productName, productList)) {
            missingProducts.push(productFromDish);
        }
    });

    return missingProducts;
};

export const convertCurrentProductData = (dishCurrentProductData: string) => {
    // string
    const countIdx = dishCurrentProductData.indexOf("(");

    if (countIdx > 0) {
        const productTitle = dishCurrentProductData.substring(0, countIdx).trim();
        const productCount = dishCurrentProductData.substring(countIdx + 1, dishCurrentProductData.indexOf(")")).trim();
        return {
            productTitle: productTitle,
            productCount: productCount,
        };
    }

    return {
        productTitle: dishCurrentProductData,
        productCount: " ",
    };
};

export const findProductImage = (product: string): string => {
    let emoji: string | FC = "❓";

    Object.values(PRODUCTS_OPTIONS).forEach((productFromList: IOption) => {
        const productLabel = productFromList.label;

        if (productLabel.length > product.length) {
            if (extractPrefixFromProductName(productLabel).toLowerCase() === product.toLowerCase()) {
                emoji = productFromList.Icon || "❓";
            }
        } else if (productLabel.length < product.length) {
            if (extractPrefixFromProductName(product).toLowerCase() === productLabel.toLowerCase()) {
                emoji = productFromList.Icon || "❓";
            }
        } else {
            if (
                extractPrefixFromProductName(productLabel).toLowerCase() ===
                extractPrefixFromProductName(product).toLowerCase()
            ) {
                emoji = productFromList.Icon || "❓";
            }
        }
    });

    return emoji;
};

export const capitalize = (str?: string | null) => {
    if (!str) return "";
    return str[0].toUpperCase() + str.slice(1).toLowerCase();
};

export const getProductData = (selectedDishProductListData: string[]): IProductData[] => {
    return selectedDishProductListData.map((selectedDishProductData) => {
        return convertCurrentProductData(selectedDishProductData);
    });
};
