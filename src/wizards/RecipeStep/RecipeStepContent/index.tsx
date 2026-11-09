import {FC, useState} from "react";

import cn from "classnames/dedupe";

import {IDish, IStep} from "../../../api/interfaces";

import {IProductData} from "../../../types/globalTypes";

import {WIshStep} from "../../WishStep";

import {DrinksBasicGroupState} from "../../DrinksStep/DrinksBasicGroup";

import styles from "./index.module.css";

import RecipeStepRecipe from "./RecipeStepRecipe";
import RecipeStepIngredients from "./RecipeStepIngredients";
import RecipeStepHeader from "./RecipeStepHeader";
import RecipeStepItems from "./RecipeStepItems";

interface RecipeStepContentProps {
    selectedDish: IDish | null;
    selectedDishProducts: IProductData[];
    recipeSteps: IStep[];
    portionCount: number | null;
    dishGroupInfo: WIshStep | DrinksBasicGroupState | null;
}

const RecipeStepContent: FC<RecipeStepContentProps> = ({
    selectedDish,
    selectedDishProducts,
    recipeSteps,
    portionCount,
    dishGroupInfo,
}) => {
    return (
        <div className={styles.container}>
            <RecipeStepHeader
                dishGroupInfo={dishGroupInfo}
                portionCount={portionCount}
                selectedDish={selectedDish}
                selectedDishProducts={selectedDishProducts}
                recipeSteps={recipeSteps}
            />

            <div className={styles.list}>
                <div className={styles.itemsWithIngredients}>
                    <div className={styles.container}>
                        <RecipeStepItems recipeSteps={recipeSteps}></RecipeStepItems>
                    </div>
                    <div className={styles.container}>
                        <RecipeStepIngredients selectedDishProducts={selectedDishProducts} />
                    </div>
                </div>
                <RecipeStepRecipe recipeSteps={recipeSteps} />
            </div>
        </div>
    );
};

export default RecipeStepContent;
