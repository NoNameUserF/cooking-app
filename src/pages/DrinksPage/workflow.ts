import {fetchPost, getDataFromStorage} from "@gsu-ai/gsu-ui-core";

import ReactGA from "react-ga4";

import {IWorkflowStep} from "@gsu-ai/gsu-ui-core/dist/types/types/globalTypes";

import {DrinksBasicGroup, DrinksBasicGroupState} from "../../wizards/DrinksStep/DrinksBasicGroup";
import DishStep, {DishStepState} from "../../wizards/DishStep";
import {APPLICATION_HOST} from "../../constants/api";
import RecipeStep, {RecipeStepState} from "../../wizards/RecipeStep";
import CookingStep, {CookingStepState} from "../../wizards/CookingStep";

const recipeLoaderSteps: {
    title: string;
    time: number;
}[] = [
    {
        time: 5000,
        title: "Анализирую напиток",
    },
    {
        time: 5000,
        title: "Генерирую рецепт",
    },
    {
        time: 5000,
        title: "Составляю инструкции",
    },
];

const DRINKS_TASTE_GROUP: IWorkflowStep<DrinksBasicGroupState> = {
    uid: "DRINKSBASICGROUP",
    name: "БАЗОВАЯ ИНФОРМАЦИЯ",
    initState: () => {
        return {
            alcohol: getDataFromStorage("drinkAlchoState") || false,
            tastes: getDataFromStorage("drinkTastes") || ["ANY"],
            drinkTypes: getDataFromStorage("drinkTypes") || ["ANY"],
            alcoholBases: getDataFromStorage("drinkAlcoholBases") || ["ANY"],
            alcoholByVolume: getDataFromStorage("drinkAlcoholByVolume") || ["ANY"],
            drinkTemperature: getDataFromStorage("drinkTemperature") || "ANY",
            drinkSizes: getDataFromStorage("drinkSizes") || ["ANY"],
            portionCount: getDataFromStorage("drinkPortionCount") || 1,
        };
    },
    cleanState: () => {
        return {
            alcohol: false,
            tastes: ["ANY"],
            drinkTypes: ["ANY"],
            alcoholBases: ["ANY"],
            alcoholByVolume: ["ANY"],
            drinkTemperature: "ANY",
            drinkSizes: ["ANY"],
            portionCount: 1,
        };
    },
    storageDependencies: [
        "drinkAlchoState",
        "drinkTastes",
        "drinkTypes",
        "drinkAlcoholBases",
        "drinkAlcoholByVolume",
        "drinkTemperature",
        "drinkSizes",
        "drinkPortionCount",
    ],
    nextBtnLabel: "СГЕНЕРИРОВАТЬ",
    component: () => {
        return DrinksBasicGroup;
    },

    fetch: (componentState) => {
        const drinks = {
            alcohol: componentState.alcohol,
            tastes: componentState.tastes,
            drinkTypes: componentState.alcohol ? ["ANY"] : componentState.drinkTypes,
            alcoholBases: componentState.alcohol ? componentState.alcoholBases : ["ANY"],
            alcoholByVolume: componentState.alcohol ? componentState.alcoholByVolume : ["ANY"],
            drinkTemperature: componentState.drinkTemperature,
            drinkSizes: componentState.drinkSizes,
            portionCount: componentState.portionCount,
            refresh: false,
        };

        ReactGA.gtag("event", "fetchDrinks", drinks);
        return fetchPost(APPLICATION_HOST, "/getDrinks", drinks);
    },
    loaderSteps: [
        {
            time: 3750,
            title: "Анализирую предпочтения",
        },
        {
            time: 3750,
            title: "Подбираю напитки",
        },
        {
            time: 3750,
            title: "Генерирую изображения",
        },
        {
            time: 3750,
            title: "Формирую рецепты",
        },
    ],
    callback: (componentState, wizardState, fetchResponse) => {
        return {
            dishes: fetchResponse.drinks,
            selectedDish: {},
        };
    },
};

const DRINKS: IWorkflowStep<DishStepState> = {
    uid: "DRINKS",
    name: "НАПИТОК",
    initState: () => {
        return {
            dishes: [],
            selectedDish: null,
        };
    },
    component: () => {
        return DishStep;
    },
    refresh: (previousComponentState) => {
        const drinks = {
            alcohol: previousComponentState.alcohol,
            tastes: previousComponentState.tastes,
            drinkTypes: previousComponentState.alcohol ? ["ANY"] : previousComponentState.drinkTypes,
            alcoholBases: previousComponentState.alcohol ? previousComponentState.alcoholBases : ["ANY"],
            alcoholByVolume: previousComponentState.alcohol ? previousComponentState.alcoholByVolume : ["ANY"],
            drinkTemperature: previousComponentState.drinkTemperature,
            drinkSizes: previousComponentState.drinkSizes,
            portionCount: previousComponentState.portionCount,
            refresh: true,
        };

        ReactGA.gtag("event", "refreshDrinks", drinks);
        return fetchPost(APPLICATION_HOST, "/getDrinks", drinks);
    },
    fetch: (componentState) => {
        const recipeDrinks = {
            name: componentState.selectedDish?.name,
            products: componentState.selectedDish?.products,
            duration: componentState.selectedDish?.time,
            refresh: false,
        };

        ReactGA.gtag("event", "fetchRecipeDrinks", recipeDrinks);
        return fetchPost(APPLICATION_HOST, "/getRecipe", recipeDrinks);
    },
    loaderSteps: recipeLoaderSteps,
    callback: (componentState, wizardState, fetchResponse) => {
        return {
            steps: fetchResponse.steps,
            activeStep: 0,
        };
    },
    isNextDisabled: (componentState) => {
        return !componentState.selectedDish || !componentState.selectedDish.name;
    },
    nextDisabledTooltip: () => {
        return "Пожалуйста, выберите один из напитков";
    },
    clearable: true,
};

const RECIPE: IWorkflowStep<RecipeStepState> = {
    uid: "Recipe",
    name: "РЕЦЕПТ",
    component: () => {
        return RecipeStep;
    },
    initState: () => {
        return {steps: [], time: 0, products: [], selectedDish: null, imageSrc: null};
    },
    clearable: true,
    nextBtnLabel: "ПРИГОТОВИТЬ",
    refresh: (previousComponentState) => {
        const recipeDrinks = {
            name: previousComponentState.selectedDish.name,
            products: previousComponentState.selectedDish.products,
            duration: previousComponentState.selectedDish?.time,
            refresh: true,
        };

        ReactGA.gtag("event", "refreshRecipeDrinks", recipeDrinks);
        return fetchPost(APPLICATION_HOST, "/getRecipe", recipeDrinks);
    },
    loaderSteps: recipeLoaderSteps,
    callback: (componentState) => {
        return {
            steps: componentState.steps,
            activeStep: 0,
        };
    },
};

const COOKING: IWorkflowStep<CookingStepState> = {
    uid: "Cooking",
    name: "ГОТОВКА",
    component: () => {
        return CookingStep;
    },
    initState: () => {
        return {steps: [], activeStep: 0};
    },
    clearable: true,
};

const workflow = [DRINKS_TASTE_GROUP, DRINKS, RECIPE, COOKING];

export type DrinkWizardPageState = DrinksBasicGroupState | DishStepState | RecipeStepState | CookingStepState;

export default workflow;
