import {IOptions} from "@gsu-ai/gsu-ui-core/dist/types/types/globalTypes";
import {InfinityIcon} from "@gsu-ai/gsu-ui-core";

import {
    AfricanCuisineIcon,
    AmericanCuisineIcon,
    ChineseCuisineIcon,
    Clock15minIcon,
    Clock30minIcon,
    Clock60minIcon,
    ClockMore60minIcon,
    DairyFreeDietIcon,
    DiabeticDietIcon,
    EggsFreeDietIcon,
    FrenchCuisineIcon,
    FusionCuisineIcon,
    GlutenFreeDietIcon,
    GreekCuisineIcon,
    HalalDietIcon,
    IndianCuisineIcon,
    ItalianCuisineIcon,
    JapaneseCuisineIcon,
    KetoDietIcon,
    KoreanCuisineIcon,
    KosherDietIcon,
    LactoseFreeDietIcon,
    LatinAmericanCuisineIcon,
    Level1Icon,
    Level2Icon,
    Level3Icon,
    LowCaloriesDietIcon,
    LowCarbDietIcon,
    LowSaltDietIcon,
    MediterraneanCuisineIcon,
    MexicanCuisineIcon,
    MiddleEasternCuisineIcon,
    NutsFreeDietIcon,
    PaleoDietIcon,
    SoyFreeDietIcon,
    SpanishCuisineIcon,
    ThaiCuisineIcon,
    TypesBreakfast,
    TypesDessert,
    TypesDinner,
    TypesLunch,
    TypesSnack,
    VeganDietIcon,
    VegetarianDietIcon,
} from "../core/icons";

interface IWishes {
    cuisines: {name: string; values: IOptions};
    diets: {name: string; values: IOptions};
    levels: {name: string; values: IOptions};
    times: {name: string; values: IOptions};
    types: {name: string; values: IOptions};
}

const WISHES_OPTIONS: IWishes = {
    cuisines: {
        name: "Какая кухня вам нравится",
        values: {
            ANY: {label: "Любая", Icon: InfinityIcon},
            AMERICAN: {label: "Американская", Icon: AmericanCuisineIcon},
            AFRICAN: {label: "Африканская", Icon: AfricanCuisineIcon},
            MIDDLE_EASTERN: {label: "Ближневосточная", Icon: MiddleEasternCuisineIcon},
            GREEK: {label: "Греческая", Icon: GreekCuisineIcon},
            INDIAN: {label: "Индийская", Icon: IndianCuisineIcon},
            SPANISH: {label: "Испанская", Icon: SpanishCuisineIcon},
            ITALIAN: {label: "Итальянская", Icon: ItalianCuisineIcon},
            CHINESE: {label: "Китайская", Icon: ChineseCuisineIcon},
            KOREAN: {label: "Корейская", Icon: KoreanCuisineIcon},
            LATIN_AMERICAN: {label: "Латиноамериканская", Icon: LatinAmericanCuisineIcon},
            MEXICAN: {label: "Мексиканская", Icon: MexicanCuisineIcon},
            MEDITERRANEAN: {label: "Средиземноморская", Icon: MediterraneanCuisineIcon},
            THAI: {label: "Тайская", Icon: ThaiCuisineIcon},
            FRENCH: {label: "Французская", Icon: FrenchCuisineIcon},
            FUSION: {label: "Фьюжн", Icon: FusionCuisineIcon},
            JAPANESE: {label: "Японская", Icon: JapaneseCuisineIcon},
        },
    },
    diets: {
        name: "Придерживаетесь ли вы какой-либо диеты",
        values: {
            NO: {label: "Без диет", Icon: InfinityIcon},
            NUT_FREE: {label: "Без орехов", Icon: NutsFreeDietIcon},
            SOY_FREE: {label: "Без сои", Icon: SoyFreeDietIcon},
            EGG_FREE: {label: "Без яиц", Icon: EggsFreeDietIcon},
            GLUTEN_FREE: {label: "Безглютеновая", Icon: GlutenFreeDietIcon},
            LACTOSE_FREE: {label: "Безлактозная", Icon: LactoseFreeDietIcon},
            DAIRY_FREE: {label: "Безмолочная", Icon: DairyFreeDietIcon},
            VEGAN: {label: "Веганская", Icon: VeganDietIcon},
            VEGETARIAN: {label: "Вегетарианская", Icon: VegetarianDietIcon},
            DIABETIC: {label: "Диабетическая", Icon: DiabeticDietIcon},
            KETO: {label: "Кето", Icon: KetoDietIcon},
            KOSHER: {label: "Кошерная", Icon: KosherDietIcon},
            LOW_CALORIE: {label: "Низкокалорийная", Icon: LowCaloriesDietIcon},
            LOW_SALT: {label: "Низкосолевая", Icon: LowSaltDietIcon},
            LOW_CARB: {label: "Низкоуглеводная", Icon: LowCarbDietIcon},
            PALEO: {label: "Палео", Icon: PaleoDietIcon},
            HALAL: {label: "Халяль", Icon: HalalDietIcon},
        },
    },
    levels: {
        name: "Как вы оцениваете свой уровень готовки?",
        values: {
            ANY: {label: "Любой", Icon: InfinityIcon},
            BEGINNER: {label: "Новичок", Icon: Level1Icon},
            AVERAGE: {label: "Средний", Icon: Level2Icon},
            KITCHEN_GOD: {label: "Профи", Icon: Level3Icon},
        },
    },
    times: {
        name: "Сколько времени у вас есть",
        values: {
            ANY: {label: "Любое", Icon: InfinityIcon},
            LESS_15: {label: "До 15 минут", Icon: Clock15minIcon},
            AVG_15_30: {label: "15-30 минут", Icon: Clock30minIcon},
            AVG_30_60: {label: "30-60 минут", Icon: Clock60minIcon},
            MORE_HOUR: {label: "Больше часа", Icon: ClockMore60minIcon},
        },
    },
    types: {
        name: "Какое блюдо вы хотите приготовить",
        values: {
            ANY: {label: "Любое", Icon: InfinityIcon},
            BREAKFAST: {label: "Завтрак", Icon: TypesBreakfast},
            LUNCH: {label: "Обед", Icon: TypesLunch},
            DINNER: {label: "Ужин", Icon: TypesDinner},
            DESSERT: {label: "Десерт", Icon: TypesDessert},
            SNACK: {label: "Перекус", Icon: TypesSnack},
        },
    },
};

export default WISHES_OPTIONS;
