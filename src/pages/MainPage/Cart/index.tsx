import {FC} from "react";
import {
    GsuMainPageBlock,
    GsuMainPageBlockContainer,
    GsuMainPageDescription,
    GsuMainPageImages,
} from "@gsu-ai/gsu-ui-core";

const textParts = [
    {text: "Больше не нужно ломать голову, что купить. Просто ", highlighted: false},
    {text: "укажите", highlighted: true},
    {text: " свой  ", highlighted: false},
    {text: "бюджет и вкусовые предпочтения", highlighted: true},
    {text: " — а наш ИИ сам подберёт, что вам нужно купить. Вы ", highlighted: false},
    {text: "получите готовую корзину", highlighted: true},
    {
        text: " с точным списком продуктов, объёмами и ориентировочной стоимостью. Планировать питание ещё никогда не было так просто",
        highlighted: false,
    },
];

const Cart: FC = () => {
    const renderTextBlock = () => {
        return <GsuMainPageDescription textParts={textParts} btnText={"ПЕРЕЙТИ К КОРЗИНЕ"} btnLink={"/cart"} />;
    };

    const renderImagesBlock = () => {
        return (
            <GsuMainPageImages
                image1Src={"/images/main-page-icons/cart/image1.jpg"}
                image2Src={"/images/main-page-icons/cart/image2.jpg"}
                image1Alt={"cart1"}
                image2Alt={"cart2"}
            />
        );
    };

    return (
        <GsuMainPageBlockContainer id={"cart"} title={"Корзина покупок"}>
            <GsuMainPageBlock
                textBlock={renderTextBlock()}
                imagesBlock={renderImagesBlock()}
                imagesPosition="left"
                btnLink={"/cart"}
                btnText={"ПЕРЕЙТИ К КОРЗИНЕ"}
            />
        </GsuMainPageBlockContainer>
    );
};

export default Cart;
