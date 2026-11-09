import {
    GSUInput,
    GsuPageDescription,
    GsuWizardGroupContainer,
    GsuWizardSection,
    GsuWizardSelectCount,
    GsuWizardSelectSection,
    storeDataToStorage,
} from "@gsu-ai/gsu-ui-core";

import {FC, useEffect, useState} from "react";
import {IWizardStep} from "@gsu-ai/gsu-ui-core/dist/types/types/globalTypes";

import {Plates2Icon} from "../../core/icons";

import styles from "./index.module.css";

export interface DishNameStepState {
    name: string;
    portionCount: number;
}

export const DishNameStep: FC<IWizardStep<DishNameStepState>> = ({componentState, change, next}) => {
    const {name} = componentState;
    const {portionCount} = componentState;

    const [dishNameError, setDishNameError] = useState("");

    const checkDishName = () => {
        if (name.length !== 0) {
            let dishNameError = "";
            if (componentState.name.length < 2) {
                dishNameError = "Слишком короткое название";
            } else if (componentState.name.length > 120) {
                dishNameError = "Слишком длинное название";
            } else {
                const reg = /^[A-Za-zА-Яа-яЁё\s\-\d]{2,}$/;
                if (!reg.test(componentState.name)) {
                    dishNameError = "Неверное название блюда";
                }
            }
            setDishNameError(dishNameError);
        }
    };

    useEffect(() => {
        checkDishName();
    }, [componentState]);

    const setDishName = (name: string) => {
        storeDataToStorage("dishDishName", name);
        change({...componentState, name: name});
    };
    const changePortionCount = (updatedPortionCount: number) => {
        storeDataToStorage("dishNamePortionCount", updatedPortionCount);
        change({...componentState, portionCount: updatedPortionCount});
    };

    const onPressEnter = (e: React.KeyboardEvent) => {
        if (e.key === "Enter") {
            if (!dishNameError && !!name) {
                next();
            }
        }
    };

    return (
        <GsuWizardGroupContainer onKeyDown={onPressEnter}>
            <GsuPageDescription
                title={"Блюда по названию"}
                description={
                    "Введите название блюда, и наш умный поиск мгновенно подберёт подходящие рецепты. Вы получите подробное описание, список ингредиентов и пошаговую инструкцию по приготовлению"
                }
            />
            <GsuWizardSection
                header={"Название блюда"}
                description={"Внимание! Не допускается ввод ядовитых или небезопасных продуктов питания"}
            >
                <GSUInput
                    placeholder="Введите название блюда"
                    error={dishNameError}
                    value={name}
                    onChange={setDishName}
                />
            </GsuWizardSection>
            <div className={styles.dishNameStepSeparatorWrapper}></div>

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

export default DishNameStep;
