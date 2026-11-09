import {FC} from "react";

import {IWizardStep} from "@gsu-ai/gsu-ui-core/dist/types/types/globalTypes";
import {
    GsuButtonSelect,
    GsuButtonSingleSelect,
    GsuPageDescription,
    GsuSeparator,
    GsuWizardGroupContainer,
    GsuWizardSection,
    GsuWizardSelectCount,
    GsuWizardSelectSection,
    storeDataToStorage,
} from "@gsu-ai/gsu-ui-core";

import WISHES_OPTIONS from "../../constants/WISHES_OPTIONS";
import {Plates2Icon} from "../../core/icons";

export interface WIshStep {
    types: string[];
    level: string;
    cuisines: string[];
    diets: string[];
    time: string;
    portionCount: number;
}

const WishStep: FC<IWizardStep<WIshStep>> = ({componentState, change}) => {
    const {cuisines} = componentState;
    const {diets} = componentState;
    const {types} = componentState;
    const {level} = componentState;
    const {time} = componentState;
    const {portionCount} = componentState;

    const changeCuisines = (updatedCuisines: string[]) => {
        storeDataToStorage("cuisines", updatedCuisines);
        change({...componentState, cuisines: updatedCuisines});
    };

    const changeDiets = (updatedDiets: string[]) => {
        storeDataToStorage("diets", updatedDiets);
        change({...componentState, diets: updatedDiets});
    };

    const changeTypes = (updatedTypes: string[]) => {
        storeDataToStorage("types", updatedTypes);
        change({...componentState, types: updatedTypes});
    };

    const changeLevel = (updatedLevel: string) => {
        storeDataToStorage("level", updatedLevel);
        change({...componentState, level: updatedLevel});
    };

    const changeTime = (updatedTime: string) => {
        storeDataToStorage("time", updatedTime);
        change({...componentState, time: updatedTime});
    };

    const changePortionCount = (updatedPortionCount: number) => {
        storeDataToStorage("wishPortionCount", updatedPortionCount);
        change({...componentState, portionCount: updatedPortionCount});
    };

    return (
        <GsuWizardGroupContainer>
            <GsuPageDescription
                title={"Блюда по желанию"}
                description={"Пройдите короткий опрос — и мы подберём блюда с учётом ваших вкусов и предпочтений"}
            />
            <GsuWizardSection header={"Время на приготовление"}>
                <GsuButtonSingleSelect value={time} change={changeTime} options={WISHES_OPTIONS.times.values} />
            </GsuWizardSection>
            <GsuWizardSection header={"Тип блюда"}>
                <GsuButtonSelect
                    values={types}
                    options={WISHES_OPTIONS.types.values}
                    change={changeTypes}
                    checkDefaultIfAllSelected={true}
                />
            </GsuWizardSection>
            <GsuWizardSection header={"Уровень готовки"}>
                <GsuButtonSingleSelect value={level} options={WISHES_OPTIONS.levels.values} change={changeLevel} />
            </GsuWizardSection>
            <GsuWizardSection header={"Кухни"}>
                <GsuButtonSelect
                    values={cuisines}
                    options={WISHES_OPTIONS.cuisines.values}
                    change={changeCuisines}
                    checkDefaultIfAllSelected={true}
                />
            </GsuWizardSection>
            <GsuWizardSection header={"Диеты"}>
                <GsuButtonSelect
                    values={diets}
                    options={WISHES_OPTIONS.diets.values}
                    change={changeDiets}
                    checkDefaultIfAllSelected={false}
                />
            </GsuWizardSection>
            <GsuSeparator />
            <GsuWizardSelectSection>
                <GsuWizardSelectCount
                    Icon={Plates2Icon}
                    value={portionCount}
                    change={changePortionCount}
                    header={"Порции"}
                />
            </GsuWizardSelectSection>
        </GsuWizardGroupContainer>
    );
};

export default WishStep;
