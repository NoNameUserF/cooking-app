import {FC} from "react";
import {
    GsuMainPageBlock,
    GsuMainPageBlockContainer,
    GsuMainPageDescription,
    GsuMainPageImages,
} from "@gsu-ai/gsu-ui-core";

const textParts = [
    {text: "Расскажите, что вам ", highlighted: false},
    {text: "нравится", highlighted: true},
    {text: ", и мы подберём ", highlighted: false},
    {text: "рецепты напитков", highlighted: true},
    {
        text: " именно под ваши предпочтения. Хотите освежающий смузи, утренний кофе или эффектный вечерний коктейль? На нашем портале ",
        highlighted: false,
    },
    {text: "вы найдёте идеи", highlighted: true},
    {text: " на любой случай — ", highlighted: false},
    {text: "с пошаговыми инструкциями", highlighted: true},
    {text: ", советами по ингредиентам и временем приготовления", highlighted: false},
];

const Drinks: FC = () => {
    const renderTextBlock = () => {
        return <GsuMainPageDescription textParts={textParts} btnText={"ПРИГОТОВИТЬ НАПИТКИ"} btnLink={"/drinks"} />;
    };

    const renderImagesBlock = () => {
        return (
            <GsuMainPageImages
                image1Src={"/images/main-page-icons/drinks/image1.jpg"}
                image2Src={"/images/main-page-icons/drinks/image2.jpg"}
                image1Alt={"drink1"}
                image2Alt={"drink2"}
            />
        );
    };

    return (
        <GsuMainPageBlockContainer id={"drinks"} background={"gray"} title={"Напитки"}>
            <GsuMainPageBlock
                textBlock={renderTextBlock()}
                imagesBlock={renderImagesBlock()}
                imagesPosition="right"
                btnLink={"/drinks"}
                btnText={"ПРИГОТОВИТЬ НАПИТКИ"}
            />
        </GsuMainPageBlockContainer>
    );
};
export default Drinks;
