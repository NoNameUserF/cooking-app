import {IOptions} from "@gsu-ai/gsu-ui-core/dist/types/types/globalTypes";

import {Candy, Drop, Glass} from "../core/icons";

export const CART_ADDITIONAL: IOptions = {
    alcohol: {label: "Алкоголь", Icon: Glass},
    water: {label: "Вода", Icon: Drop},
    sweets: {label: "Сладости", Icon: Candy},
};

export const CART_ADDITIONAL_NO_ADULTS: IOptions = {
    sweets: {label: "Сладости", Icon: Candy},
    water: {label: "Вода", Icon: Drop},
};
