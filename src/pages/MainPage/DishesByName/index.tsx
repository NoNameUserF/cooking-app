import {FC} from "react";
import {
    GsuMainPageBlock,
    GsuMainPageBlockContainer,
    GsuMainPageDescription,
    GsuMainPageImages,
} from "@gsu-ai/gsu-ui-core";

const textParts = [
    {text: "Готовите что-то конкретное? Просто введите ", highlighted: false},
    {text: "название блюда", highlighted: true},
    {text: " — и наш умный поиск сразу предложит ", highlighted: false},
    {text: "подходящие варианты", highlighted: true},
    {text: ". Подробный список ингредиентов, ", highlighted: false},
    {text: "пошаговая инструкция", highlighted: true},
    {text: " и никакой лишней суеты. Быстро, удобно и по делу.", highlighted: false},
];

const DishesByName: FC = () => {
    const renderTextBlock = () => {
        return <GsuMainPageDescription textParts={textParts} btnText={"НАЙТИ БЛЮДО"} btnLink={"/dishes-by-name"} />;
    };

    const renderImagesBlock = () => {
        return (
            <GsuMainPageImages
                image1Src={"/images/main-page-icons/dish-by-name/image1.jpg"}
                image2Src={"/images/main-page-icons/dish-by-name/image2.jpg"}
                image1Alt={"dish-by-name1"}
                image2Alt={"dish-by-name2"}
            />
        );
    };

    return (
        <GsuMainPageBlockContainer id={"dishes-by-name"} background={"primary"} title={"Блюда по названию"}>
            <GsuMainPageBlock
                textBlock={renderTextBlock()}
                imagesBlock={renderImagesBlock()}
                imagesPosition="right"
                btnLink={"/dishes-by-name"}
                btnText={"НАЙТИ БЛЮДО"}
            />
        </GsuMainPageBlockContainer>
    );
};
export default DishesByName;
