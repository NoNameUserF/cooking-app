import {FC} from "react";
import {IWizardStep} from "@gsu-ai/gsu-ui-core/dist/types/types/globalTypes";

import {GsuWizardResultPage} from "@gsu-ai/gsu-ui-core";

import {capitalize, getProductData} from "../../helpers/productsStepHelper";
import {DishNameStepState} from "../DishNameStep";
import {DishStepState} from "../DishStep";
import {IDish, IStep} from "../../api/interfaces";
import {IProductData} from "../../types/globalTypes";
import {DrinksBasicGroupState} from "../DrinksStep/DrinksBasicGroup";
import {WIshStep} from "../WishStep";

import RecipeStepContent from "./RecipeStepContent";

export interface RecipeStepState {
    steps: IStep[];
    time: number;
    products: string[];
    imageSrc: string | null;
    selectedDish: IDish | null;
}

const RecipeStep: FC<IWizardStep<RecipeStepState>> = ({componentState, refresh, wizardState}) => {
    const recipeSteps = componentState.steps;
    const DISHNAMEGROUP = wizardState.DISHNAMEGROUP as DishNameStepState;
    const DRINKS = wizardState.DRINKS as DishStepState;
    const DISHES = wizardState.DISHES as DishStepState;
    const WISHES = wizardState.WISHSTEP as WIshStep;
    const DRINKSBASICGROUP = wizardState.DRINKSBASICGROUP as DrinksBasicGroupState;

    let portionCount = null;
    let DISHINFO = null;

    let selectedDish: IDish | null = null;
    let selectedDishProducts: IProductData[] = [];
    if (wizardState._id === "DishName") {
        portionCount = DISHNAMEGROUP.portionCount;
        selectedDish = {
            name: DISHNAMEGROUP.name,
            description: "",
            time: componentState.time,
            products: [],
            imageSrc: componentState.imageSrc,
        };

        selectedDishProducts = getProductData(componentState.products);
    } else if (wizardState._id === "Drinks") {
        DISHINFO = DRINKSBASICGROUP;
        selectedDish = DRINKS.selectedDish;
        if (selectedDish) {
            selectedDishProducts = getProductData(selectedDish.products);
        }
    } else {
        DISHINFO = WISHES;
        selectedDish = DISHES.selectedDish;
        if (selectedDish) {
            selectedDishProducts = getProductData(selectedDish.products);
        }
    }

    return (
        <GsuWizardResultPage refresh={refresh} title={capitalize(selectedDish?.name) || ""}>
            <RecipeStepContent
                dishGroupInfo={DISHINFO}
                portionCount={portionCount}
                selectedDish={selectedDish}
                selectedDishProducts={selectedDishProducts}
                recipeSteps={recipeSteps}
            />
        </GsuWizardResultPage>
    );
};

export default RecipeStep;
