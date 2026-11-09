import {GsuActionsBlock, TimeImgIcon} from "@gsu-ai/gsu-ui-core";
import {FC} from "react";

import {IDish, IStep} from "../../../../api/interfaces";
import {IProductData} from "../../../../types/globalTypes";
import {getRecipeInfo} from "../../../../helpers/actionsBuilder";
import {WIshStep} from "../../../WishStep";
import {DrinksBasicGroupState} from "../../../DrinksStep/DrinksBasicGroup";

import styles from "./index.module.css";

interface RecipeStepHeaderProps {
    selectedDish: IDish | null;
    selectedDishProducts: IProductData[];
    recipeSteps: IStep[];
    portionCount: number | null;
    dishGroupInfo: WIshStep | DrinksBasicGroupState | null;
}

const RecipeStepHeader: FC<RecipeStepHeaderProps> = ({
    selectedDish,
    selectedDishProducts,
    recipeSteps,
    portionCount,
    dishGroupInfo,
}) => {
    const dishInfo = getRecipeInfo(selectedDish, recipeSteps, selectedDishProducts, portionCount, dishGroupInfo);
    const fileName: string = (selectedDish?.name?.toLowerCase() ?? "dish").replace(/ /g, "_");

    const timeBlock = () => {
        return (
            <>
                <TimeImgIcon />
                <label className={styles.timeTitle}>
                    {selectedDish?.time}
                    {" мин"}
                </label>
            </>
        );
    };

    const header = () => {
        return (
            <>
                <div className={styles.container}>
                    <GsuActionsBlock share={dishInfo} copy={dishInfo} save={dishInfo} saveFileName={fileName} />
                </div>
                {selectedDish?.imageSrc && (
                    <div className={styles.imageSrcWrapper}>
                        <img className={styles.imageSrc} src={selectedDish?.imageSrc} alt={selectedDish?.name} />
                        <div className={styles.time}>{timeBlock()}</div>
                    </div>
                )}
            </>
        );
    };

    return <>{header()}</>;
};
export default RecipeStepHeader;
