import {FC, useState} from "react";
import {COUNTRIES, GsuWizardResultPage, GsuPagination, GsuActionsBlock} from "@gsu-ai/gsu-ui-core";
import {IGsuInfoContainerCell, IOptions, IWizardStep} from "@gsu-ai/gsu-ui-core/dist/types/types/globalTypes";

import {CartBasicInfoGroupState} from "../CartBasicInfoGroup";
import {ICart} from "../../../api/interfaces";

import {getCartActionsInfo} from "../../../helpers/actionsBuilder";

import CartTable from "./CartTable";

import styles from "./index.module.css";
import CardData from "./CardData";

export interface CartCartGroupState {
    cart: ICart | null;
}

const pagination: IOptions = {
    CART: {label: "Корзина"},
    DATA: {label: "Данные"},
};

const CartCartGroup: FC<IWizardStep<CartCartGroupState>> = ({componentState, refresh, wizardState}) => {
    const {cart} = componentState;
    const [paginationKey, setPaginationKey] = useState<string>("CART");

    const CARTBASICINFOGROUP = wizardState.CARTBASICINFOGROUP as CartBasicInfoGroupState;

    const infoCells: IGsuInfoContainerCell[] = [
        {key: "Количество взрослых", value: CARTBASICINFOGROUP.adults},
        {key: "Количество детей", value: CARTBASICINFOGROUP.children},
        {key: "Количество дней", value: CARTBASICINFOGROUP.daysCount},
        {
            key: "Страна",
            value: CARTBASICINFOGROUP.country ? COUNTRIES[CARTBASICINFOGROUP.country]?.label : "Страна не найдена",
        },
        {key: "Бюджет", value: `${CARTBASICINFOGROUP.budget} ${CARTBASICINFOGROUP.currency}`},
    ];

    const actionBlock = getCartActionsInfo(cart, CARTBASICINFOGROUP);

    return (
        <GsuWizardResultPage refresh={refresh} title={"Список продуктов"}>
            <div className={styles.cartResultContainer}>
                <GsuPagination activeKey={paginationKey} changeKey={setPaginationKey} options={pagination} />
                <GsuActionsBlock
                    copy={actionBlock}
                    share={actionBlock}
                    saveFileName={"корзина_покупок.txt"}
                    save={actionBlock}
                />
            </div>
            {paginationKey === "CART" && <CartTable cartBasicGroup={CARTBASICINFOGROUP!} cart={cart} />}
            {paginationKey === "DATA" && <CardData cardData={infoCells}></CardData>}
        </GsuWizardResultPage>
    );
};

export default CartCartGroup;
