import {COUNTRIES, formatTime} from "@gsu-ai/gsu-ui-core";

import {ICart, ICartProduct, IDish, IStep} from "../api/interfaces";
import {CartBasicInfoGroupState} from "../wizards/CartStep/CartBasicInfoGroup";

import {CART_ADDITIONAL} from "../constants/cart";
import {IProductData} from "../types/globalTypes";
import {WIshStep} from "../wizards/WishStep";
import {DrinksBasicGroupState} from "../wizards/DrinksStep/DrinksBasicGroup";
import WISHES_OPTIONS from "../constants/WISHES_OPTIONS";
import DRINKS_OPTIONS from "../constants/DRINKS_OPTIONS";

export const getCartActionsInfo = (cart: ICart | null, cartBasicGroup: CartBasicInfoGroupState) => {
    if (!cart) {
        return "";
    }

    const {daysCount, adults, children, currency} = cartBasicGroup;
    const country = COUNTRIES[cartBasicGroup.country!].label;
    const diets = cartBasicGroup.diets.map((diet) => WISHES_OPTIONS.diets.values[diet].label);
    const additional = cartBasicGroup.additional.map((additional) => CART_ADDITIONAL[additional].label);
    const products = cart.products
        .map((product) => `${product.name} --- ${product.cost} ${cartBasicGroup.currency}`)
        .join("\n");
    const totalPrice: string = cart.products
        .reduce((acc: number, product: ICartProduct) => acc + product.cost, 0)
        .toFixed(2);

    return (
        "*** Корзина покупок *** \n" +
        `Страна: ${country} \n` +
        `Валюта: ${currency} \n` +
        `Количество взрослых: ${adults} \n` +
        `Количество детей: ${children} \n` +
        `Количество дней: ${daysCount} \n` +
        `Диеты: ${diets.join(", ")} \n \n` +
        `${additional.length ? `Дополнительно: ${additional.join(", ")} \n \n \n` : ""}` +
        " *** Продукты *** \n" +
        `${products}; \n \n` +
        `Итого --- ${totalPrice} ${currency}; \n \n` +
        `Соберите свою корзину: ${window.location.href}`
    );
};
export const getRecipeInfo = (
    selectedDish: IDish | null,
    recipeSteps: IStep[],
    selectedDishProducts: IProductData[],
    portionCount: number | null,
    dishGroupInfo: WIshStep | DrinksBasicGroupState | null,
) => {
    if (!selectedDish) {
        return "";
    }

    let dishString = "";
    let portionCountInfo = 1;
    if (portionCount) {
        portionCountInfo = portionCount;
    }
    if (dishGroupInfo) {
        if ("cuisines" in dishGroupInfo) {
            const cuisines = dishGroupInfo.cuisines
                .map((cuisine) => WISHES_OPTIONS.cuisines.values[cuisine].label)
                .join(", ");
            const diets = dishGroupInfo.diets.map((diet) => WISHES_OPTIONS.diets.values[diet].label).join(", ");
            const level = WISHES_OPTIONS.levels.values[dishGroupInfo.level!].label;
            const portionCount = dishGroupInfo.portionCount;
            const types = dishGroupInfo.types.map((type) => WISHES_OPTIONS.types.values[type].label).join(", ");
            const time = WISHES_OPTIONS.times.values[dishGroupInfo.time!].label;
            dishString =
                "*** Выбранные опции ***\n" +
                `Виды кухни: ${cuisines}\n` +
                `Диеты: ${diets}\n` +
                `Уровень готовки: ${level}\n` +
                `Количество порций: ${portionCount}\n` +
                `Тип приема пищи: ${types}\n` +
                `Желаемое время на готовку: ${time}\n`;
        } else {
            const alco = dishGroupInfo.alcohol ? "Да" : "Нет";
            const alcoholBases = dishGroupInfo.alcoholBases
                .map((alcoBase) => DRINKS_OPTIONS.alcoholBases.values[alcoBase].label)
                .join(", ");
            const alcoholByVolume = dishGroupInfo.alcoholByVolume
                .map((alcoholByVolume) => DRINKS_OPTIONS.alcoholByVolume.values[alcoholByVolume].label)
                .join(", ");
            const drinkSizes = dishGroupInfo.drinkSizes
                .map((size) => DRINKS_OPTIONS.drinkSizes.values[size].label)
                .join(", ");
            const drinkTemperature = DRINKS_OPTIONS.drinkTemperature.values[dishGroupInfo.drinkTemperature].label;
            const drinkTypes = dishGroupInfo.drinkTypes
                .map((type) => DRINKS_OPTIONS.drinkTypes.values[type].label)
                .join(", ");
            const portionCount = dishGroupInfo.portionCount;
            const tastes = dishGroupInfo.tastes.map((taste) => DRINKS_OPTIONS.tastes.values[taste].label).join(", ");
            dishString =
                "*** Выбранные опции ***\n" +
                `Алкоголь: ${alco}\n` +
                `Вид алкоголя: ${alcoholBases}\n` +
                `Крепкость напитка: ${alcoholByVolume}\n` +
                `Объем напитка: ${drinkSizes}\n` +
                `Температура напитка: ${drinkTemperature}\n` +
                `Тип напитка: ${drinkTypes}\n` +
                `Количество порций: ${portionCount}\n` +
                `Вкус напитка: ${tastes}\n`;
        }
    }

    const {time} = selectedDish;

    const ingredients = selectedDishProducts
        .map((product) => `${product.productTitle} ${product.productCount ? `(${product.productCount})` : ""}`)
        .join("\n");
    const steps = recipeSteps
        .map((step, index) => `${index + 1}. ${step.description} ${step.time ? `(${formatTime(step.time)})` : ""}`)
        .join("\n");
    const uniqueItems: string[] = [];

    recipeSteps.forEach((step) => {
        step.items.forEach((item) => {
            if (!uniqueItems.some((uniqueItem) => item == uniqueItem)) {
                uniqueItems.push(item);
            }
        });
    });

    const {name, description} = selectedDish;
    return (
        `*** ${name}  *** \n \n` +
        `${description} \n \n` +
        "*** Ингредиенты *** \n" +
        `${ingredients} \n \n` +
        "*** Рецепт *** \n" +
        `${steps}; \n \n` +
        `Время приготовления ${time} мин; \n` +
        `Количество порций: ${portionCountInfo} \n\n` +
        "*** Приборы *** \n" +
        `${uniqueItems.join(", ")} \n \n` +
        `${dishString} \n \n` +
        `Сгенерируйте себе блюдо: ${window.location.href}`
    );
};
