import {FC} from "react";
import {GsuMainPagePreferencesBlock} from "@gsu-ai/gsu-ui-core";

import {Block2Alert, Block2Clock, Block2Dish, Block2Hat} from "../../../core/icons";

const Preferences: FC = () => {
    const block2Content = [
        {
            icon: Block2Clock,
            title: "Мгновенно",
            text: "Забудьте о бесконечных поисках. Наш ИИ найдёт подходящий рецепт за пару секунд",
        },
        {
            icon: Block2Hat,
            title: "Интуитивно",
            text: "Удобный интерфейс без перегрузки — готовить легко, даже если вы не шеф-повар",
        },
        {
            icon: Block2Alert,
            title: "Персонально",
            text: "Безглютеновая диета, ваши продукты и любимая кухня? Мы подстраиваемся под вас, а не наоборот",
        },
        {
            icon: Block2Dish,
            title: "Вдохновляюще",
            text: "Нестандартные сочетания, новые вкусы, свежие идеи — кулинария без границ",
        },
    ];

    return <GsuMainPagePreferencesBlock title={"Почему Cooking AI?"} contentItems={block2Content} />;
};

export default Preferences;
