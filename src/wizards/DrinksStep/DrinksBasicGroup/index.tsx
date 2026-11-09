import {FC, useEffect, useState} from "react";
import {
    GsuButtonSelect,
    GsuButtonSingleSelect,
    GsuMultiSelect,
    GsuPageDescription,
    GsuSeparator,
    GsuWizardGroupContainer,
    GsuWizardSection,
    GsuWizardSelectCount,
    GsuWizardSelectSection,
    GsuWizardToggle,
    storeDataToStorage,
} from "@gsu-ai/gsu-ui-core";

import {IWizardStep} from "@gsu-ai/gsu-ui-core/dist/types/types/globalTypes";

import {DRINKS_OPTIONS} from "../../../constants/DRINKS_OPTIONS";
import {DrinkItemDrinkCountIcon} from "../../../core/icons";

const alchoText = "Выбирая алкогольную продукцию, вы подтверждаете, что вам уже есть 18 лет";

export interface DrinksBasicGroupState {
    alcohol: boolean;
    tastes: string[];
    drinkTypes: string[];
    alcoholByVolume: string[];
    alcoholBases: string[];
    drinkTemperature: string;
    drinkSizes: string[];
    portionCount: number;
}

export const DrinksBasicGroup: FC<IWizardStep<DrinksBasicGroupState>> = ({componentState, change}) => {
    const {alcohol} = componentState;
    const {tastes} = componentState;
    const {drinkTypes} = componentState;
    const {alcoholByVolume} = componentState;
    const {alcoholBases} = componentState;
    const {drinkTemperature} = componentState;
    const {drinkSizes} = componentState;
    const {portionCount} = componentState;

    const [hydrated, setHydrated] = useState(false);
    useEffect(() => {
        setHydrated(true);
    }, []);

    const changeTastes = (updatedTastes: string[]) => {
        storeDataToStorage("drinkTastes", updatedTastes);
        change({...componentState, tastes: updatedTastes});
    };

    const changeDrinkType = (updatedDrinkTypes: string[]) => {
        storeDataToStorage("drinkTypes", updatedDrinkTypes);
        change({...componentState, drinkTypes: updatedDrinkTypes});
    };

    const changeAlcoholBases = (updatedAlcoholBases: string[]) => {
        storeDataToStorage("drinkAlcoholBases", updatedAlcoholBases);
        change({...componentState, alcoholBases: updatedAlcoholBases});
    };
    const changeAlcoholVolume = (updatedAlcoholVolume: string[]) => {
        storeDataToStorage("drinkAlcoholByVolume", updatedAlcoholVolume);
        change({...componentState, alcoholByVolume: updatedAlcoholVolume});
    };

    const changeAlchoState = (updatedAlchoState: boolean) => {
        storeDataToStorage("drinkAlchoState", updatedAlchoState);
        change({...componentState, alcohol: updatedAlchoState});
    };

    const changeTemperature = (updatedTemperature: string) => {
        storeDataToStorage("drinkTemperature", updatedTemperature);
        change({...componentState, drinkTemperature: updatedTemperature});
    };

    const changeSize = (updatedSize: string[]) => {
        storeDataToStorage("drinkSizes", updatedSize);
        change({...componentState, drinkSizes: updatedSize});
    };

    const changeCount = (updatedCount: number) => {
        storeDataToStorage("drinkPortionCount", updatedCount);
        change({...componentState, portionCount: updatedCount});
    };

    return (
        <GsuWizardGroupContainer>
            <GsuPageDescription
                title={"Напитки"}
                description={"Пройдите короткий опрос — и мы подберём рецепты напитков, которые вам подойдут"}
            />

            <GsuWizardSelectSection description={alchoText}>
                <GsuWizardToggle header={"Алкогольные напитки"} toggled={alcohol} change={changeAlchoState} />
            </GsuWizardSelectSection>

            {alcohol && hydrated && (
                <>
                    <GsuWizardSection header={"Вид алкоголя"}>
                        <GsuMultiSelect
                            listName={"Вид алкоголя"}
                            values={alcoholBases}
                            options={DRINKS_OPTIONS.alcoholBases.values}
                            change={(updatedTypes) => changeAlcoholBases(updatedTypes)}
                            onRemoveMessage={(label) => `Вид алкоголя "${label}" удален`}
                            onAddMessage={(label) => `Вид алкоголя "${label}" добавлен`}
                        />
                    </GsuWizardSection>

                    <GsuWizardSection header={"Уровень крепости"}>
                        <GsuButtonSelect
                            values={alcoholByVolume}
                            options={DRINKS_OPTIONS.alcoholByVolume.values}
                            change={(updatedLevels) => changeAlcoholVolume(updatedLevels)}
                            checkDefaultIfAllSelected={true}
                        />
                    </GsuWizardSection>
                </>
            )}

            {(!alcohol || !hydrated) && (
                <GsuWizardSection header={"Тип напитка"}>
                    <GsuButtonSelect
                        values={drinkTypes}
                        options={DRINKS_OPTIONS.drinkTypes.values}
                        change={(updatedLevels) => changeDrinkType(updatedLevels)}
                        checkDefaultIfAllSelected={true}
                    />
                </GsuWizardSection>
            )}

            <GsuWizardSection header={"Вкус"}>
                <GsuButtonSelect
                    values={tastes}
                    options={DRINKS_OPTIONS.tastes.values}
                    change={(updatedTypes) => changeTastes(updatedTypes)}
                    checkDefaultIfAllSelected={true}
                />
            </GsuWizardSection>

            <GsuWizardSection header={"Температура напитка"}>
                <GsuButtonSingleSelect
                    value={drinkTemperature}
                    change={(updatedTypes) => changeTemperature(updatedTypes)}
                    options={DRINKS_OPTIONS.drinkTemperature.values}
                />
            </GsuWizardSection>

            <GsuWizardSection header={"Объём"}>
                <GsuButtonSelect
                    values={drinkSizes}
                    options={DRINKS_OPTIONS.drinkSizes.values}
                    change={(updatedTypes) => changeSize(updatedTypes)}
                    checkDefaultIfAllSelected={true}
                />
            </GsuWizardSection>
            <GsuSeparator />
            <GsuWizardSelectSection>
                <GsuWizardSelectCount
                    Icon={DrinkItemDrinkCountIcon}
                    value={portionCount}
                    change={changeCount}
                    header={"Порции"}
                />
            </GsuWizardSelectSection>
        </GsuWizardGroupContainer>
    );
};
