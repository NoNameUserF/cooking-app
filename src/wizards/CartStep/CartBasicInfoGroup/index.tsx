import {
    CalendarIcon,
    COUNTRIES,
    CURRENCIES,
    GsuButtonMultiSelect,
    GsuButtonSelect,
    GsuOptionsNumberInput,
    GsuPageDescription,
    GsuSingleAutocomplete,
    GsuWizardGridSection,
    GsuWizardGroupContainer,
    GsuWizardSection,
    GsuWizardSelectCount,
    GsuWizardSelectSection,
    storeDataToStorage,
} from "@gsu-ai/gsu-ui-core";

import {FC, useEffect, useState} from "react";
import {IWizardStep} from "@gsu-ai/gsu-ui-core/dist/types/types/globalTypes";

import WISHES_OPTIONS from "../../../constants/WISHES_OPTIONS";
import {CART_ADDITIONAL, CART_ADDITIONAL_NO_ADULTS} from "../../../constants/cart";
import {CountKidsIcon, CountUsersIcon} from "../../../core/icons";

export interface CartBasicInfoGroupState {
    country: string | null;
    budget: number;
    daysCount: number;
    currency: string;
    adults: number;
    children: number;
    diets: string[];
    additional: string[];
}

export const CartBasicInfoGroup: FC<IWizardStep<CartBasicInfoGroupState>> = ({componentState, change}) => {
    const [hydrated, setHydrated] = useState(false);
    useEffect(() => setHydrated(true), []);

    const {country} = componentState;
    const {budget} = componentState;
    const {daysCount} = componentState;
    const {currency} = componentState;
    const {adults} = componentState;
    const {children} = componentState;
    const {diets} = componentState;
    const {additional} = componentState;

    const [errorBudget, setErrorBudget] = useState("");

    const checkBudget = () => {
        let errorBudget = "";
        const coef = CURRENCIES[componentState.currency]?.coef || 1;

        if (budget / coef < 10) {
            errorBudget = "Слишком маленький бюджет";
        } else if (budget / coef > 10000) {
            errorBudget = "Слишком большой бюджет";
        }
        setErrorBudget(errorBudget);
    };

    useEffect(() => {
        checkBudget();
    }, [componentState]);

    const setCurrency = (currency: string) => {
        storeDataToStorage("cartCurrency", currency);
        change({...componentState, currency: currency});
    };

    const setCountry = (country: string) => {
        const {currency} = COUNTRIES[country];

        if (currency) {
            storeDataToStorage("cartCurrency", currency);
            storeDataToStorage("cartCountry", country);
            change({...componentState, country: country, currency: currency});
        } else {
            storeDataToStorage("cartCountry", country);
            change({...componentState, country: country});
        }
    };

    const setBudget = (budget: number) => {
        storeDataToStorage("cartBudget", budget);
        change({...componentState, budget: budget});
    };

    const setDaysCount = (daysCount: number) => {
        storeDataToStorage("cartDaysCount", daysCount);
        change({...componentState, daysCount: daysCount});
    };

    const setAdults = (adults: number) => {
        storeDataToStorage("cartAdults", adults);
        change({...componentState, adults: adults});
    };

    const setChildren = (children: number) => {
        storeDataToStorage("cartChildren", children);
        change({...componentState, children: children});
    };

    const changeDiets = (updatedDiets: string[]) => {
        storeDataToStorage("diets", updatedDiets);
        change({...componentState, diets: updatedDiets});
    };

    const setAdditional = (additional: string[]) => {
        storeDataToStorage("cartAdditional", additional);
        change({...componentState, additional: additional});
    };

    return (
        <GsuWizardGroupContainer>
            <GsuPageDescription
                title={"Корзина покупок"}
                description={"Пройдите короткий опрос, и мы подберём продукты с учётом ваших вкусов и предпочтений."}
            />

            <GsuWizardGridSection
                header={"Страна проживания и бюджет"}
                description={"Укажите страну, примерный бюджет и валюту расчёта"}
                columns={3}
            >
                <GsuSingleAutocomplete
                    value={country}
                    listName={"Список стран"}
                    placeholder={"Страна"}
                    onOptionSelect={setCountry}
                    options={COUNTRIES}
                />

                <GsuOptionsNumberInput
                    value={budget}
                    error={errorBudget}
                    onChangeValue={setBudget}
                    options={CURRENCIES}
                    onChangeOption={setCurrency}
                    optionValue={currency}
                />
            </GsuWizardGridSection>

            <GsuWizardSection
                header={"Количество дней и человек"}
                description={"Укажите длительность поездки и состав группы"}
            >
                <GsuWizardSelectSection>
                    <GsuWizardSelectCount
                        Icon={CalendarIcon}
                        change={setDaysCount}
                        header={"Дни"}
                        value={daysCount}
                        maxCount={30}
                    />
                    <GsuWizardSelectCount
                        minCount={0}
                        Icon={CountUsersIcon}
                        change={setAdults}
                        header={"Взрослые"}
                        value={adults}
                    />
                    <GsuWizardSelectCount
                        minCount={0}
                        Icon={CountKidsIcon}
                        change={setChildren}
                        header={"Дети"}
                        value={children}
                    />
                </GsuWizardSelectSection>
            </GsuWizardSection>
            <GsuWizardSection header={"Диеты"}>
                <GsuButtonSelect
                    values={diets}
                    options={WISHES_OPTIONS.diets.values}
                    change={changeDiets}
                    checkDefaultIfAllSelected={false}
                />
            </GsuWizardSection>
            <GsuWizardSection header={"Дополнительные покупки"}>
                {adults > 0 || !hydrated ? (
                    <GsuButtonMultiSelect options={CART_ADDITIONAL} change={setAdditional} values={additional} />
                ) : (
                    <GsuButtonMultiSelect
                        options={CART_ADDITIONAL_NO_ADULTS}
                        change={setAdditional}
                        values={additional}
                    />
                )}
            </GsuWizardSection>
        </GsuWizardGroupContainer>
    );
};

export default CartBasicInfoGroup;
