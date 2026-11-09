import {fetchPost, getDataFromStorage} from "@gsu-ai/gsu-ui-core";

import ReactGA from "react-ga4";

import {IWorkflowStep} from "@gsu-ai/gsu-ui-core/dist/types/types/globalTypes";

import DishNameStep, {DishNameStepState} from "../../wizards/DishNameStep";
import RecipeStep, {RecipeStepState} from "../../wizards/RecipeStep";
import {APPLICATION_HOST} from "../../constants/api";
import CookingStep, {CookingStepState} from "../../wizards/CookingStep";

const recipesByNameLoaderSteps: {
    title: string;
    time: number;
}[] = [
    {
        title: "Анализирую блюдо",
        time: 10000,
    },
    {
        title: "Определяю ингредиенты",
        time: 10000,
    },
    {
        title: "Формирую рецепт",
        time: 10000,
    },
    {
        title: "Генерирую изображение",
        time: 10000,
    },
];

const DISHNAME_GROUP: IWorkflowStep<DishNameStepState> = {
    uid: "DISHNAMEGROUP",
    name: "НАЗВАНИЕ",
    initState: () => {
        return {
            name: getDataFromStorage("dishDishName") || "",
            portionCount: getDataFromStorage("dishNamePortionCount") || 1,
        };
    },
    cleanState: () => {
        return {
            name: "",
            portionCount: 1,
        };
    },
    storageDependencies: ["dishDishName", "dishNamePortionCount"],
    nextBtnLabel: "СГЕНЕРИРОВАТЬ",
    component: () => {
        return DishNameStep;
    },

    isNextDisabled: (componentState) => {
        if (componentState.name.length < 2 || componentState.name.length > 120) {
            return true;
        }

        const reg = /^[A-Za-zА-Яа-яЁё\s\-\d]{2,}$/;
        return !reg.test(componentState.name);
    },

    nextDisabledTooltip: (componentState) => {
        if (componentState.name.length < 2) {
            return "Слишком короткое название";
        }

        if (componentState.name.length > 120) {
            return "Слишком длинное название";
        }

        return "Неверное название блюда";
    },

    fetch: (componentState) => {
        const name = {
            name: componentState.name,
            portionCount: componentState.portionCount,
            refresh: false,
        };

        ReactGA.gtag("event", "fetchRecipeByName", name);
        return fetchPost(APPLICATION_HOST, "/getRecipeByName", name);
    },
    loaderSteps: recipesByNameLoaderSteps,
    callback: (componentState, wizardState, fetchResponse) => {
        return {
            products: fetchResponse.products,
            steps: fetchResponse.steps,
            time: fetchResponse.time,
            imageSrc: fetchResponse.imageSrc,
        };
    },
};

const RECIPE: IWorkflowStep<RecipeStepState, DishNameStepState> = {
    uid: "Recipe",
    name: "РЕЦЕПТ",
    component: () => {
        return RecipeStep;
    },
    initState: () => {
        return {steps: [], products: [], time: 0, selectedDish: null, imageSrc: null};
    },
    nextBtnLabel: "ПРИГОТОВИТЬ",
    clearable: true,
    refresh: (previousComponentState) => {
        const name = {
            name: previousComponentState.name,
            portionCount: previousComponentState.portionCount,
            refresh: true,
        };

        ReactGA.gtag("event", "refreshRecipeByName", name);
        return fetchPost(APPLICATION_HOST, "/getRecipeByName", name);
    },
    loaderSteps: recipesByNameLoaderSteps,
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

const workflow = [DISHNAME_GROUP, RECIPE, COOKING];

export type DishNameWizardPageState = DishNameStepState | RecipeStepState | CookingStepState;

export default workflow;
