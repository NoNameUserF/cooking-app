import {InfinityIcon} from "@gsu-ai/gsu-ui-core";

import {IOptions} from "@gsu-ai/gsu-ui-core/dist/types/types/globalTypes";

import {
    DrinkItemAbsintheIcon,
    DrinkItemAleIcon,
    DrinkItemAquavitIcon,
    DrinkItemArmagnacIcon,
    DrinkItemAverageIcon,
    DrinkItemBitterIcon,
    DrinkItemBrandyIcon,
    DrinkItemCalvadosIcon,
    DrinkItemCiderIcon,
    DrinkItemCocktailIcon,
    DrinkItemCognacIcon,
    DrinkItemCraftIcon,
    DrinkItemDessertIcon,
    DrinkItemEasyIcon,
    DrinkItemFruitIcon,
    DrinkItemGinIcon,
    DrinkItemGrappaIcon,
    DrinkItemHoneyIcon,
    DrinkItemHootchIcon,
    DrinkItemJuiceIcon,
    DrinkItemLagerIcon,
    DrinkItemLargeSizeIcon,
    DrinkItemLiquorIcon,
    DrinkItemMartiniIcon,
    DrinkItemMeadIcon,
    DrinkItemMediumSizeIcon,
    DrinkItemMezcalIcon,
    DrinkItemModerateIcon,
    DrinkItemPorterIcon,
    DrinkItemRedIcon,
    DrinkItemRoseIcon,
    DrinkItemRumIcon,
    DrinkItemSchnappsIcon,
    DrinkItemSharpIcon,
    DrinkItemSmallSizeIcon,
    DrinkItemSmoothieIcon,
    DrinkItemSourIcon,
    DrinkItemSparklingIcon,
    DrinkItemStoutIcon,
    DrinkItemStrongIcon,
    DrinkItemSweetIcon,
    DrinkItemTequilaIcon,
    DrinkItemVodkaIcon,
    DrinkItemWheatIcon,
    DrinkItemWhiskeyIcon,
    DrinkItemWhiteIcon,
    Glass,
    NoAlchoIcon,
    TemperatureIcon,
    TemperatureIconHot,
} from "../core/icons";

interface IDrinks {
    tastes: {values: IOptions};
    drinkTypes: {values: IOptions};
    alcoholBases: {values: IOptions};
    alcoholByVolume: {values: IOptions};
    alcohol: {values: IOptions};
    drinkTemperature: {values: IOptions};
    drinkSizes: {values: IOptions};
}

export const DRINKS_OPTIONS: IDrinks = {
    tastes: {
        values: {
            ANY: {label: "Любой", Icon: InfinityIcon},
            BITTER: {label: "Горький", Icon: DrinkItemBitterIcon},
            SOUR: {label: "Кислый", Icon: DrinkItemSourIcon},
            SPICY: {label: "Острый", Icon: DrinkItemSharpIcon},
            SWEET: {label: "Сладкий", Icon: DrinkItemSweetIcon},
            MODERATE: {label: "Умеренный", Icon: DrinkItemModerateIcon},
        },
    },
    drinkTypes: {
        values: {
            ANY: {label: "Любой", Icon: InfinityIcon},
            COCKTAIL: {label: "Коктейль", Icon: DrinkItemCocktailIcon},
            SMOOTHIE: {label: "Смузи", Icon: DrinkItemSmoothieIcon},
            FRUIT: {label: "Фруктовый сок", Icon: DrinkItemJuiceIcon},
        },
    },
    alcoholBases: {
        values: {
            ANY: {label: "Любой", Icon: InfinityIcon},
            ABSINTHE: {label: "Абсент", Icon: DrinkItemAbsintheIcon},
            AQUAVIT: {label: "Аквавит", Icon: DrinkItemAquavitIcon},
            ARMAGNAC: {label: "Арманьяк", Icon: DrinkItemArmagnacIcon},
            WHITE_WINE: {label: "Белое вино", Icon: DrinkItemWhiteIcon},
            BRANDY: {label: "Бренди", Icon: DrinkItemBrandyIcon},
            WHISKEY: {label: "Виски", Icon: DrinkItemWhiskeyIcon},
            VODKA: {label: "Водка", Icon: DrinkItemVodkaIcon},
            GRAPPA: {label: "Граппа", Icon: DrinkItemGrappaIcon},
            DESSERT_WINE: {label: "Десертное вино", Icon: DrinkItemDessertIcon},
            GIN: {label: "Джин", Icon: DrinkItemGinIcon},
            SPARKLING_WINE: {label: "Игристое вино", Icon: DrinkItemSparklingIcon},
            CALVADOS: {label: "Кальвадос", Icon: DrinkItemCalvadosIcon},
            COGNAC: {label: "Коньяк", Icon: DrinkItemCognacIcon},
            RED_WINE: {label: "Красное вино", Icon: DrinkItemRedIcon},
            CRAFT_BEER: {label: "Крафтовое пиво", Icon: DrinkItemCraftIcon},
            LAGER: {label: "Лагер", Icon: DrinkItemLagerIcon},
            LIQUEUR: {label: "Ликер", Icon: DrinkItemLiquorIcon},
            MARTINI: {label: "Мартини", Icon: DrinkItemMartiniIcon},
            HONEY_WINE: {label: "Медовое вино", Icon: DrinkItemHoneyIcon},
            MEAD: {label: "Медовуха", Icon: DrinkItemMeadIcon},
            MEZCAL: {label: "Мескаль", Icon: DrinkItemMezcalIcon},
            PORTER: {label: "Портер", Icon: DrinkItemPorterIcon},
            WHEAT_BEER: {label: "Пшеничное пиво", Icon: DrinkItemWheatIcon},
            ROSE_WINE: {label: "Розовое вино", Icon: DrinkItemRoseIcon},
            RUM: {label: "Ром", Icon: DrinkItemRumIcon},
            SAMOGON: {label: "Самогон", Icon: DrinkItemHootchIcon},
            CIDER: {label: "Сидр", Icon: DrinkItemCiderIcon},
            STOUT: {label: "Стаут", Icon: DrinkItemStoutIcon},
            TEQUILA: {label: "Текила", Icon: DrinkItemTequilaIcon},
            FRUIT_WINE: {label: "Фруктовое вино", Icon: DrinkItemFruitIcon},
            SCHNAPPS: {label: "Шнапс", Icon: DrinkItemSchnappsIcon},
            ALE: {label: "Эль", Icon: DrinkItemAleIcon},
        },
    },
    alcoholByVolume: {
        values: {
            ANY: {label: "Любой", Icon: InfinityIcon},
            LOW: {label: "Легкий", Icon: DrinkItemEasyIcon},
            MEDIUM: {label: "Средний", Icon: DrinkItemAverageIcon},
            HIGH: {label: "Крепкий", Icon: DrinkItemStrongIcon},
        },
    },
    alcohol: {
        values: {
            YES: {label: "Да", Icon: Glass},
            NO: {label: "Нет", Icon: NoAlchoIcon},
        },
    },
    drinkTemperature: {
        values: {
            ANY: {label: "Любой", Icon: InfinityIcon},
            HOT: {label: "Горячий", Icon: TemperatureIconHot},
            COLD: {label: "Холодный", Icon: TemperatureIcon},
        },
    },
    drinkSizes: {
        values: {
            ANY: {label: "Любой", Icon: InfinityIcon},
            SMALL: {label: "Маленький", Icon: DrinkItemSmallSizeIcon},
            MEDIUM: {label: "Средний", Icon: DrinkItemMediumSizeIcon},
            LARGE: {label: "Большой", Icon: DrinkItemLargeSizeIcon},
        },
    },
};

export default DRINKS_OPTIONS;
