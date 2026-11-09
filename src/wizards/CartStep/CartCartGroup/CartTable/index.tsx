import {FC} from "react";

import {GsuCalculatorContainer} from "@gsu-ai/gsu-ui-core";

import {IGsuCalculatorItem} from "@gsu-ai/gsu-ui-core/dist/types/types/globalTypes";

import {getAmount, getName} from "../../../../helpers/cartHelper";
import {ICart, ICartProduct} from "../../../../api/interfaces";
import {CartBasicInfoGroupState} from "../../CartBasicInfoGroup";

import {capitalize} from "../../../../helpers/productsStepHelper";

import styles from "./index.module.css";

interface CartTableProps {
    cart: ICart | null;
    cartBasicGroup: CartBasicInfoGroupState;
}

const CartTable: FC<CartTableProps> = ({cart, cartBasicGroup}) => {
    const tableListItems: IGsuCalculatorItem[] = (cart?.products || []).map((cartItem: ICartProduct) => ({
        name: capitalize(getName(cartItem.name)),
        description: getAmount(cartItem.name),
        value: cartItem.cost,
        currency: cartBasicGroup.currency,
    }));

    return (
        <div className={styles.cardsContainer}>
            <div className={styles.actionsBlock}>
                {/* <GsuActionsBlock copy={actionInfo} save={actionInfo} share={actionInfo} saveFileName={"cart"} /> */}
            </div>
            <GsuCalculatorContainer items={tableListItems} showTotalValue={true} currency={cartBasicGroup.currency} />
        </div>
    );
};

export default CartTable;
