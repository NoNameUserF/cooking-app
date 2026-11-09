import {fetchImagePost, fetchPost, getDataFromStorage, readImage, storeDataToStorage} from "@gsu-ai/gsu-ui-core";

import ReactGA from "react-ga4";

import {FileData, IWorkflowStep} from "@gsu-ai/gsu-ui-core/dist/types/types/globalTypes";

import ProductsStep, {ProductsStepState} from "../../wizards/ProductsStep";
import DishStep, {DishStepState} from "../../wizards/DishStep";
import CookingModalWarning from "../../modals/CookingWarningModal";
import RecipeStep, {RecipeStepState} from "../../wizards/RecipeStep";
import {getMissingProducts} from "../../helpers/productsStepHelper";
import {APPLICATION_HOST} from "../../constants/api";
import CookingStep, {CookingStepState} from "../../wizards/CookingStep";
import {IProducts} from "../../api/interfaces";
import PRODUCTS_OPTIONS from "../../constants/products";

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

const PRODUCTS: IWorkflowStep<ProductsStepState> = {
    uid: "Products",
    name: "ПРОДУКТЫ",
    initState: () => {
        return {
            products: getDataFromStorage("products") || [],
            portionCount: getDataFromStorage("productsPortionCount") || 1,
            fileData: null,
        };
    },
    cleanState: () => {
        return {
            products: [],
            portionCount: 1,
            fileData: null,
        };
    },
    storageDependencies: ["products", "productsPortionCount"],

    nextBtnLabel: "СГЕНЕРИРОВАТЬ",

    component: () => {
        return ProductsStep;
    },
    fetch: (componentState) => {
        const products = {
            products: componentState.products.map((key) => {
                if (PRODUCTS_OPTIONS[key]) {
                    return PRODUCTS_OPTIONS[key].label;
                } else {
                    return key;
                }
            }),
            portionCount: componentState.portionCount,
            refresh: false,
        };

        ReactGA.gtag("event", "fetchDishesByProducts", products);
        return fetchPost(APPLICATION_HOST, "/getDishes", products);
    },
    loaderSteps: [
        {
            time: 3000,
            title: "Анализирую ингредиенты",
        },
        {
            time: 3000,
            title: "Подбираю рецепты",
        },
        {
            time: 3000,
            title: "Генерирую изображения",
        },
        {
            time: 3000,
            title: "Формирую варианты",
        },
    ],
    callback: (componentState, wizardState, fetchResponse) => {
        return {
            dishes: fetchResponse.dishes,
            selectedDish: {},
        };
    },
    isNextDisabled: (componentState) => {
        return componentState.products.length < 2 || !!componentState.fileData || componentState.products.length > 50;
    },
    nextDisabledTooltip: (componentState) => {
        if (componentState.fileData) {
            return "Удалите или обработайте фото";
        }
        if (componentState.products.length < 2) {
            return "Добавлено меньше 2 продуктов";
        }
        if (componentState.products.length > 50) {
            return "Добавлено более 50 продуктов";
        }
        return "";
    },
    innerTasks: (componentState, wizardState, abort) => {
        return {
            loadImg: {
                fetch: (componentState) => {
                    ReactGA.gtag("event", "fetchImage", "someImage");

                    if (!componentState.fileData) {
                        abort("no file data");
                    }
                    const file = componentState.fileData
                        ? componentState.fileData.file
                        : new File([], "empty.txt", {type: "text/plain"});

                    return fetchImagePost(APPLICATION_HOST, "/getProducts", file, "products file");
                },
                loaderSteps: [
                    {
                        time: 2000,
                        title: "Обрабатываю изображение",
                    },
                    {
                        time: 1500,
                        title: "Распознаю ингредиенты",
                    },
                ],
                callback: (componentState, wizardState, fetchResponse: IProducts) => {
                    const products: string[] = [];
                    fetchResponse.products.forEach((product) => {
                        const imageProductsSbstr = product.toLowerCase().substring(0, product.length - 1);
                        const imageProduct = product.toLowerCase();
                        const entry = Object.entries(PRODUCTS_OPTIONS).filter(([, productFromList]) => {
                            const listProductSbstr = productFromList.label
                                .toLowerCase()
                                .substring(0, productFromList.label.length - 1);
                            const listProduct = productFromList.label.toLowerCase();
                            return (
                                imageProductsSbstr === listProductSbstr ||
                                imageProductsSbstr === listProduct ||
                                imageProduct === listProductSbstr ||
                                imageProduct === listProduct
                            );
                        })[0];

                        if (entry) {
                            const key = entry[0];
                            if (!componentState.products.includes(key)) {
                                products.push(key);
                            }
                        } else {
                            products.push(product);
                        }
                    });

                    const newProducts: string[] = [...componentState.products, ...products];

                    storeDataToStorage("products", newProducts);
                    return {
                        products: newProducts,
                        fileData: null,
                        portionCount: componentState.portionCount,
                    };
                },
            },
            prepareImg: {
                fetch: (componentState, wizardState, props: File) => {
                    return readImage(props);
                },
                callback: (componentState, wizardState, fetchResponse: FileData) => {
                    return {
                        products: componentState.products,
                        fileData: fetchResponse,
                        portionCount: componentState.portionCount,
                    };
                },
            },
        };
    },
};

const DISHES: IWorkflowStep<DishStepState, ProductsStepState> = {
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
        const products = {
            products: previousComponentState.products.map((key) => {
                if (PRODUCTS_OPTIONS[key]) {
                    return PRODUCTS_OPTIONS[key].label;
                } else {
                    return key;
                }
            }),
            portionCount: previousComponentState.portionCount,
            refresh: true,
        };

        ReactGA.gtag("event", "refreshDishesByProducts", products);
        return fetchPost(APPLICATION_HOST, "/getDishes", products);
    },
    fetch: (componentState) => {
        const recipe = {
            name: componentState.selectedDish?.name,
            products: componentState.selectedDish?.products,
            duration: componentState.selectedDish?.time,
            refresh: false,
        };

        ReactGA.gtag("event", "fetchRecipeByProducts", recipe);
        return fetchPost(APPLICATION_HOST, "/getRecipe", recipe);
    },
    loaderSteps: recipeLoaderSteps,
    callback: (componentState, wizardState, fetchResponse) => {
        return {
            steps: fetchResponse.steps,
        };
    },
    isNextDisabled: (componentState) => {
        return !componentState.selectedDish || !componentState.selectedDish.name;
    },
    nextDisabledTooltip: () => {
        return "Пожалуйста, выберите одно из блюд";
    },
    warningModal: () => {
        return CookingModalWarning;
    },
    showWarning: (componentState, wizardState) => {
        const Products = wizardState.Products as ProductsStepState;
        if (!componentState.selectedDish || !componentState.selectedDish.products) {
            return false;
        }
        return getMissingProducts(Products.products, componentState.selectedDish).length > 0;
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
        const recipe = {
            name: previousComponentState.selectedDish.name,
            products: previousComponentState.selectedDish.products,
            duration: previousComponentState.selectedDish?.time,
            refresh: true,
        };
        ReactGA.gtag("event", "refreshRecipeByProducts", recipe);
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

const workflow = [PRODUCTS, DISHES, RECIPE, COOKING];

export type ProductWizardPageState = ProductsStepState | DishStepState | RecipeStepState | CookingStepState;

export default workflow;
