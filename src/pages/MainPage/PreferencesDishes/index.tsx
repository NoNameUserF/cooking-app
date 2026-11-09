import {FC} from "react";

import {GsuMainPageBlock, GsuMainPageBlockContainer, GsuMainPageImages, GsuMainPageSteps} from "@gsu-ai/gsu-ui-core";

import {DishIcon, IdeaIcon, MealIcon} from "../../../core/icons";

const steps = [
    {
        Icon: DishIcon,
        title: "Укажите предпочтения: ",
        description: "выберите, что вам по вкусу: тип кухни, диета, настроение или уровень сложности",
    },
    {
        Icon: IdeaIcon,
        title: "Получите подборку блюд: ",
        description: "ИИ подберёт для вас оригинальные варианты, соответствующие вашему выбору",
    },
    {
        Icon: MealIcon,
        title: "Выберите и готовьте: ",
        description: "выберите понравившееся блюдо и следуйте подробному пошаговому рецепту",
    },
];

const description =
    "Вам когда-нибудь хотелось порадовать себя и близких оригинальным ужином," +
    " но не хватало вдохновения? Наша платформа на базе ИИ предложит различные блюда" +
    " в зависимости от ваших предпочтений и предоставит подробные рецепты для каждого";

const PreferencesDishes: FC = () => {
    const renderSteps = () => {
        return <GsuMainPageSteps steps={steps} btnText={"ПРИГОТОВИТЬ БЛЮДО"} btnLink={"/dishes-by-wishes"} />;
    };

    const renderImages = () => {
        return (
            <GsuMainPageImages
                image1Src={"/images/main-page-icons/preferences-dishes/image1.jpg"}
                image2Src={"/images/main-page-icons/preferences-dishes/image2.jpg"}
                image1Alt={"dish-by-wish1"}
                image2Alt={"dish-by-wish2"}
            />
        );
    };

    return (
        <GsuMainPageBlockContainer
            id={"dishes-by-wishes"}
            background={"gray"}
            description={description}
            title={"Блюда по желанию"}
        >
            <GsuMainPageBlock
                textBlock={renderSteps()}
                imagesBlock={renderImages()}
                btnText={"ПРИГОТОВИТЬ БЛЮДО"}
                btnLink={"/dishes-by-wishes"}
                type={"steps"}
            />
        </GsuMainPageBlockContainer>
    );
};

export default PreferencesDishes;
