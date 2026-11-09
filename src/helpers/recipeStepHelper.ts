import {IStep} from "../api/interfaces";

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

export default getAllItems;
