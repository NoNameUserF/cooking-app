import {FC} from "react";

import {GsuMainPageMainBlock} from "@gsu-ai/gsu-ui-core";

import styles from "./index.module.css";

const mainPageAnchors = [
    {label: "Блюда по названию", anchor: "#dishes-by-name"},
    {label: "Блюда из ингредиентов", anchor: "#dishes-by-products"},
    {label: "Блюда по желанию", anchor: "#dishes-by-wishes"},
    {label: "Корзина покупок", anchor: "#cart"},
    {label: "Напитки", anchor: "#drinks"},
];

const MainBlock: FC = () => {
    return (
        <GsuMainPageMainBlock
            mainPageAnchors={mainPageAnchors}
            appName={"Cooking AI"}
            appNameGradientClass={styles.gradientMain}
            title={"ваш вкус — наш рецепт"}
            description={
                "Поделитесь своими вкусами — и мы превратим их в кулинарные идеи, созданные специально для вас"
            }
            btnName={"ПРИГОТОВИТЬ"}
            btnLink={"/dishes-by-name"}
            imgSrc={"/images/main-page-icons/main-img.webp"}
        />
    );
};

export default MainBlock;
