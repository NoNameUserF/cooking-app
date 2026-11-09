import {CURRENCIES, fetchPost, getDataFromStorage} from "@gsu-ai/gsu-ui-core";

import ReactGA from "react-ga4";

import {IWorkflowStep} from "@gsu-ai/gsu-ui-core/dist/types/types/globalTypes";

import CartBasicInfoGroup, {CartBasicInfoGroupState} from "../../wizards/CartStep/CartBasicInfoGroup";
import {APPLICATION_HOST} from "../../constants/api";
import CartCartGroup, {CartCartGroupState} from "../../wizards/CartStep/CartCartGroup";

const cartLoaderSteps: {
    title: string;
    time: number;
}[] = [
    {
        title: "Определяю предпочтения",
        time: 5000,
    },
    {
        title: "Подбираю продукты",
        time: 5000,
    },
    {
        title: "Сверяю бюджет",
        time: 5000,
    },
];

const CART_BASIC_INFO_GROUP: IWorkflowStep<CartBasicInfoGroupState> = {
    uid: "CARTBASICINFOGROUP",
    name: "БАЗОВАЯ ИНФОРМАЦИЯ",
    initState: () => {
        return {
            country: getDataFromStorage("cartCountry") || null,
            budget: getDataFromStorage("cartBudget") || 100,
            currency: getDataFromStorage("cartCurrency") || "USD",
            daysCount: getDataFromStorage("cartDaysCount") || 7,
            adults: getDataFromStorage("cartAdults") === null ? 1 : getDataFromStorage("cartAdults"),
            children: getDataFromStorage("cartChildren") || 0,
            diets: getDataFromStorage("diets") || ["NO"],
            additional: getDataFromStorage("cartAdditional") || [],
        };
    },
    cleanState: () => {
        return {
            country: null,
            budget: 100,
            currency: "USD",
            daysCount: 7,
            adults: 1,
            children: 0,
            diets: ["NO"],
            additional: [],
        };
    },
    storageDependencies: [
        "cartCountry",
        "cartBudget",
        "cartCurrency",
        "cartDaysCount",
        "cartAdults",
        "cartChildren",
        "diets",
        "cartAdditional",
    ],
    nextBtnLabel: "СГЕНЕРИРОВАТЬ",
    component: () => {
        return CartBasicInfoGroup;
    },

    fetch: (componentState) => {
        const cart = {
            country: componentState.country,
            budget: componentState.budget,
            days: componentState.daysCount,
            currency: componentState.currency,

            adultsCount: componentState.adults,
            kidsCount: componentState.children,

            diets: componentState.diets,

            includeAlcohol: componentState.adults > 0 && componentState.additional.includes("alcohol"),
            includeSweets: componentState.additional.includes("sweets"),
            includeWater: componentState.additional.includes("water"),
            refresh: false,
        };

        ReactGA.gtag("event", "fetchCart", cart);
        return fetchPost(APPLICATION_HOST, "/getCart", cart);
    },
    loaderSteps: cartLoaderSteps,
    callback: (componentState, wizardState, fetchResponse) => {
        return {
            cart: fetchResponse,
        };
    },

    isNextDisabled: (componentState) => {
        const coef = CURRENCIES[componentState.currency]?.coef || 1;

        return (
            !componentState.country ||
            componentState.budget / coef < 10 ||
            componentState.budget / coef > 10000 ||
            componentState.daysCount < 1 ||
            componentState.daysCount > 30 ||
            (componentState.adults <= 0 && componentState.children <= 0)
        );
    },

    nextDisabledTooltip: (componentState) => {
        const coef = CURRENCIES[componentState.currency]?.coef || 1;

        if (!componentState.country) {
            return "Выберите страну";
        } else if (componentState.budget / coef < 10) {
            return "Слишком маленький бюджет";
        } else if (componentState.budget / coef > 10000) {
            return "Слишком большой бюджет";
        } else if (componentState.daysCount < 1) {
            return "Количество дней должно быть больше 0";
        } else if (componentState.daysCount > 30) {
            return "Количество дней должно быть не больше 30";
        } else if (componentState.adults <= 0 && componentState.children <= 0) {
            return "Должен быть хотя бы 1 человек";
        }
        return "";
    },
};

const CART_CART_GROUP: IWorkflowStep<CartCartGroupState> = {
    uid: "CARTCARTGROUP",
    name: "СПИСОК ПРОДУКТОВ",
    initState: () => {
        return {
            cart: null,
        };
    },
    component: () => {
        return CartCartGroup;
    },
    refresh: (previousComponentState) => {
        const cart = {
            country: previousComponentState.country,
            budget: previousComponentState.budget,
            days: previousComponentState.daysCount,
            currency: previousComponentState.currency,

            adultsCount: previousComponentState.adults,
            kidsCount: previousComponentState.children,

            diets: previousComponentState.diets,

            includeAlcohol: previousComponentState.adults > 0 && previousComponentState.additional.includes("alcohol"),
            includeSweets: previousComponentState.additional.includes("sweets"),
            includeWater: previousComponentState.additional.includes("water"),
            refresh: true,
        };

        ReactGA.gtag("event", "refreshCart", cart);
        return fetchPost(APPLICATION_HOST, "/getCart", cart);
    },
    loaderSteps: cartLoaderSteps,
};

const workflow = [CART_BASIC_INFO_GROUP, CART_CART_GROUP];

export type CartWizardPageState = CartBasicInfoGroupState | CartCartGroupState;

export default workflow;
