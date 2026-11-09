import {FC} from "react";
import {IWizardStep} from "@gsu-ai/gsu-ui-core/dist/types/types/globalTypes";

import {GsuCardList, GsuWizardCardPage} from "@gsu-ai/gsu-ui-core";

import {ProductsStepState} from "../ProductsStep";
import {IDish} from "../../api/interfaces";

import DishCard from "./DishCard";

export interface DishStepState {
    dishes: IDish[];
    selectedDish: IDish | null;
}

const DishStep: FC<IWizardStep<DishStepState>> = ({componentState, wizardState, change, refresh}) => {
    const {dishes} = componentState;
    const {selectedDish} = componentState;

    const Products = wizardState.Products as ProductsStepState;
    const productList = Products ? Products.products : null;

    const title = wizardState._id === "Drinks" ? "Выберите напиток" : "Выберите блюдо";

    const setSelectedDish = (dish: IDish) => {
        change({...componentState, selectedDish: dish});
    };

    return (
        <GsuWizardCardPage refresh={refresh} title={title}>
            <GsuCardList<IDish>
                CardComponent={(card) => <DishCard card={card} productList={productList} />}
                onSelectCard={setSelectedDish}
                selectedCard={selectedDish}
                cards={dishes}
                uid={"name"}
            />
        </GsuWizardCardPage>
    );
};

export default DishStep;
