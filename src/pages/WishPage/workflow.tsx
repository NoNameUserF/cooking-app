import {fetchPost, getDataFromStorage} from "@gsu-ai/gsu-ui-core";

import ReactGA from "react-ga4";

import {IWorkflowStep} from "@gsu-ai/gsu-ui-core/dist/types/types/globalTypes";

import DishStep, {DishStepState} from "../../wizards/DishStep";
import RecipeStep, {RecipeStepState} from "../../wizards/RecipeStep";
import {APPLICATION_HOST} from "../../constants/api";
import CookingStep, {CookingStepState} from "../../wizards/CookingStep";
import WishStep, {WIshStep} from "../../wizards/WishStep";

const recipeLoaderSteps: {
    title: string;
    time: number;
}[] = [
    {
        time: 4000,
        title: "Анализирую блюдо",
    },
    {
        time: 4000,
        title: "Генерирую рецепт",
    },
    {
        time: 3500,
        title: "Составляю инструкции",
    },
    {
        time: 3500,
        title: "Проверяю результат",
    },
];

const WISHSTEP: IWorkflowStep<WIshStep> = {
    uid: "WISHSTEP",
    name: "ВЫБОР ВРЕМЕНИ",
    initState: () => {
        return {
            types: getDataFromStorage("types") || ["ANY"],
            level: getDataFromStorage("level") || "ANY",
            cuisines: getDataFromStorage("cuisines") || ["ANY"],
            diets: getDataFromStorage("diets") || ["NO"],
            time: getDataFromStorage("time") || "ANY",
            portionCount: getDataFromStorage("wishPortionCount") || 1,
        };
    },
    cleanState: () => {
        return {
            types: ["ANY"],
            level: "ANY",
            cuisines: ["ANY"],
            diets: ["NO"],
            time: "ANY",
            portionCount: 1,
        };
    },
    storageDependencies: ["types", "level", "cuisines", "diets", "time", "wishPortionCount"],
    nextBtnLabel: "СГЕНЕРИРОВАТЬ",
    component: () => {
        return WishStep;
    },

    fetch: (componentState) => {
        const wishes = {
            level: componentState.level,
            types: componentState.types,
            cuisines: componentState.cuisines,
            diets: componentState.diets,
            time: componentState.time,
            portionCount: componentState.portionCount,
            refresh: false,
        };

        ReactGA.gtag("event", "fetchDishesByWishes", wishes);
        return fetchPost(APPLICATION_HOST, "/getDishesByWishes", wishes);
    },
    loaderSteps: [
        {
            time: 6500,
            title: "Анализирую предпочтения",
        },
        {
            time: 6500,
            title: "Генерирую блюда",
        },
        {
            time: 6500,
            title: "Составляю инструкции",
        },
        {
            time: 6500,
            title: "Генерирую картинки",
        },
    ],
    callback: (componentState, wizardState, fetchResponse) => {
        return {
            dishes: fetchResponse.dishes,
            selectedDish: {},
        };
    },
};

const DISHES: IWorkflowStep<DishStepState, WIshStep> = {
    uid: "DISHES",
    name: "БЛЮДО",
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
        const wishes = {
            level: previousComponentState.level,
            types: previousComponentState.types,
            cuisines: previousComponentState.cuisines,
            diets: previousComponentState.diets,
            time: previousComponentState.time,
            portionCount: previousComponentState.portionCount,
            refresh: true,
        };

        ReactGA.gtag("event", "refreshDishesByWishes", wishes);
        return fetchPost(APPLICATION_HOST, "/getDishesByWishes", wishes);
    },
    fetch: (componentState) => {
        const recipe = {
            name: componentState.selectedDish?.name,
            products: componentState.selectedDish?.products,
            duration: componentState.selectedDish?.time,
            refresh: false,
        };

        ReactGA.gtag("event", "fetchRecipeByWishes", recipe);
        return fetchPost(APPLICATION_HOST, "/getRecipe", recipe);
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
        return "Пожалуйста, выберите одно из блюд";
    },
    clearable: true,
};

const RECIPE: IWorkflowStep<RecipeStepState, DishStepState> = {
    uid: "Recipe",
    name: "РЕЦЕПТ",
    component: () => {
        return RecipeStep;
    },
    initState: () => {
        return {steps: [], time: 0, products: [], selectedDish: null, imageSrc: null};
    },
    nextBtnLabel: "ПРИГОТОВИТЬ",
    clearable: true,
    refresh: (previousComponentState) => {
        const recipe = {
            name: previousComponentState.selectedDish?.name,
            products: previousComponentState.selectedDish?.products,
            duration: previousComponentState.selectedDish?.time,
            refresh: true,
        };

        ReactGA.gtag("event", "refreshRecipeByWishes", recipe);
        return fetchPost(APPLICATION_HOST, "/getRecipe", recipe);
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

const workflow = [WISHSTEP, DISHES, RECIPE, COOKING];

export type WishWizardPageState = WIshStep | DishStepState | RecipeStepState | CookingStepState;

export default workflow;
