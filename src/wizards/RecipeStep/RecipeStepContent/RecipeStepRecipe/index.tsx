import {FC} from "react";

import {GsuInfoContainer} from "@gsu-ai/gsu-ui-core";
import {IGsuInfoContainerCell} from "@gsu-ai/gsu-ui-core/dist/types/types/globalTypes";

import {IStep} from "../../../../api/interfaces";
import {RecipeIcon} from "../../../../core/icons";
import {capitalize} from "../../../../helpers/productsStepHelper";

interface RecipeStepRecipeProps {
    recipeSteps: IStep[];
}

const RecipeStepRecipe: FC<RecipeStepRecipeProps> = ({recipeSteps}) => {
    const cells: IGsuInfoContainerCell[] = recipeSteps.map((step) => ({key: capitalize(step.description)}));

    return <GsuInfoContainer Icon={RecipeIcon} header={"Рецепт:"} cells={cells} type={"indexed"} />;
};

export default RecipeStepRecipe;
