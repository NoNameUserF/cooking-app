import {FC} from "react";

import {GsuMainPageBlock, GsuMainPageBlockContainer, GsuMainPageImages, GsuMainPageSteps} from "@gsu-ai/gsu-ui-core";

import {Block3Circle, Block3Foodora, Block3Pot} from "../../../core/icons";

const steps = [
    {
        Icon: Block3Pot,
        title: "Укажите ингредиенты:",
        description: " впишите их вручную или загрузите фото — мясо, овощи, специи, что угодно",
    },
    {
        Icon: Block3Circle,
        title: "Получите подборку блюд:",
        description: " ИИ предложит разные блюда, основанные именно на вашем наборе продуктов",
    },
    {
        Icon: Block3Foodora,
        title: "Выберите и готовьте:",
        description: " остановитесь на одном варианте и получите подробный пошаговый рецепт — просто, быстро и вкусно",
    },
];

const description =
    "Не знаете, что приготовить из того, что есть под рукой?" +
    " Наша платформа с ИИ поможет вам вкусно и креативно использовать любые продукты — без лишних усилий.";

const IngredientDishes: FC = () => {
    const renderSteps = () => {
        return <GsuMainPageSteps steps={steps} btnText={"ВЫБРАТЬ ИНГРЕДИЕНТЫ"} btnLink={"/dishes-by-products"} />;
    };

    const renderImages = () => {
        return (
            <GsuMainPageImages
                image1Src={"/images/main-page-icons/ingredient-dishes/image1.jpg"}
                image2Src={"/images/main-page-icons/ingredient-dishes/image2.jpg"}
                image1Alt={"dish-by-products1"}
                image2Alt={"dish-by-products2"}
            />
        );
    };

    return (
        <GsuMainPageBlockContainer id={"dishes-by-products"} description={description} title={"Блюда из ингредиентов"}>
            <GsuMainPageBlock
                imagesPosition={"left"}
                textBlock={renderSteps()}
                imagesBlock={renderImages()}
                btnText={"ВЫБРАТЬ ИНГРЕДИЕНТЫ"}
                btnLink={"/dishes-by-products"}
                type={"steps"}
            />
        </GsuMainPageBlockContainer>
    );
};

export default IngredientDishes;
