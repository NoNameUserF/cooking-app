import {FC} from "react";

import {GsuInfoContainer} from "@gsu-ai/gsu-ui-core";

import {IGsuInfoContainerCell} from "@gsu-ai/gsu-ui-core/dist/types/types/globalTypes";

import {DishItem} from "../../../../core/icons";
import {capitalize} from "../../../../helpers/productsStepHelper";
import {IStep} from "../../../../api/interfaces";

interface RecipeStepRecipeProps {
    recipeSteps: IStep[];
}

const getAllItems = (recipeSteps: IStep[]): string[] => {
    const allItemsSet = new Set<string>();

    recipeSteps.forEach((step) => {
        step.items.forEach((item) => {
            if (item !== "" && item !== "-") {
                allItemsSet.add(item);
            }
        });
    });

    return Array.from(allItemsSet);
};

const RecipeStepItems: FC<RecipeStepRecipeProps> = ({recipeSteps}) => {
    const allItems = getAllItems(recipeSteps);
    const infoCells: IGsuInfoContainerCell[] = allItems.map((item) => ({key: capitalize(item)}));
    return (
        <GsuInfoContainer
            maxHeight={true}
            Icon={DishItem}
            header={"Вам понадобится:"}
            cells={infoCells}
            type={"default"}
        />
    );
};

export default RecipeStepItems;
