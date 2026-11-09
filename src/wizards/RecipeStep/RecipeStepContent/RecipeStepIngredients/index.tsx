import {FC} from "react";

import {GsuInfoContainer} from "@gsu-ai/gsu-ui-core";
import {IGsuInfoContainerCell} from "@gsu-ai/gsu-ui-core/dist/types/types/globalTypes";

import {IProductData} from "../../../../types/globalTypes";
import {IngredientsIcon} from "../../../../core/icons";
import {capitalize} from "../../../../helpers/productsStepHelper";

interface RecipeStepIngredientsProps {
    selectedDishProducts: IProductData[];
}

const RecipeStepIngredients: FC<RecipeStepIngredientsProps> = ({selectedDishProducts}) => {
    const cells: IGsuInfoContainerCell[] = selectedDishProducts.map((product) => ({
        key: capitalize(product.productTitle),
        value: product.productCount,
    }));

    return (
        <GsuInfoContainer
            maxHeight={true}
            cells={cells}
            header={"Ингредиенты:"}
            Icon={IngredientsIcon}
            type={"dashed"}
        />
    );
};

export default RecipeStepIngredients;
