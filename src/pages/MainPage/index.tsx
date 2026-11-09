import {useEffect} from "react";

import ReactGA from "react-ga4";

import {GsuMainPage} from "@gsu-ai/gsu-ui-core";

import {Head} from "vite-react-ssg";

import MainBlock from "./MainBlock";
import IngredientDishes from "./IngredientDishes";
import PreferencesDishes from "./PreferencesDishes";
import DishesByName from "./DishesByName";
import Cart from "./Cart";
import Drinks from "./Drinks";
import Preferences from "./Preferences";

const MainPage = () => {
    useEffect(() => {
        ReactGA.send({hitType: "pageview", page: location.pathname});
    }, []);

    return (
        <>
            <Head>
                <title>Cooking AI — ваш вкус — наш рецепт</title>
                <meta
                    name="description"
                    content="Поделитесь своими вкусами — и мы превратим их в кулинарные идеи. Блюда по названию, из ингредиентов, по желанию, корзина покупок и напитки — всё на базе ИИ."
                />
                <link rel="canonical" href="https://cooking.alivio.ai/" />

                <meta property="og:title" content="Cooking AI — ваш вкус — наш рецепт" />
                <meta
                    property="og:description"
                    content="ИИ подбирает рецепты под ваши предпочтения и продукты. Мгновенно, интуитивно, персонально и вдохновляюще."
                />
                <meta property="og:url" content="https://cooking.alivio.ai/" />

                <meta name="twitter:title" content="Cooking AI — ваш вкус — наш рецепт" />
                <meta
                    name="twitter:description"
                    content="Поделитесь своими вкусами — и получите идеи блюд, напитков корзины покупок, созданные ИИ специально для вас."
                />

                <script type="application/ld+json">
                    {JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "WebApplication",
                        name: "Cooking AI — Главная",
                        url: "https://cooking.alivio.ai/",
                        applicationCategory: "FoodApplication",
                        operatingSystem: "Web",
                        inLanguage: "ru-RU",
                        description:
                            "Кулинарный ИИ-помощник: блюда по названию, из ингредиентов, по желанию, корзина покупок и подбор напитков.",
                        featureList: [
                            "Рецепты по названию",
                            "Рецепты из ингредиентов",
                            "Рецепты по желанию",
                            "Корзина покупок",
                            "Напитки",
                        ],
                        creator: {
                            "@type": "Organization",
                            name: "Alivio.ai",
                            url: "https://alivio.ai",
                        },
                    })}
                </script>

                <script type="application/ld+json">
                    {JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "WebPage",
                        name: "Cooking AI — ваш вкус — наш рецепт",
                        url: "https://cooking.alivio.ai/",
                        description:
                            "Лендинг Cooking AI: мгновенно, интуитивно, персонально и вдохновляюще. Разделы: по названию, из ингредиентов, по желанию, корзина, напитки.",
                        hasPart: [
                            {
                                "@type": "WebPage",
                                name: "Блюда по названию",
                                url: "https://cooking.alivio.ai/dishes-by-name",
                            },
                            {
                                "@type": "WebPage",
                                name: "Блюда из ингредиентов",
                                url: "https://cooking.alivio.ai/dishes-by-products",
                            },
                            {
                                "@type": "WebPage",
                                name: "Блюда по желанию",
                                url: "https://cooking.alivio.ai/dishes-by-wishes",
                            },
                            {
                                "@type": "WebPage",
                                name: "Корзина покупок",
                                url: "https://cooking.alivio.ai/cart",
                            },
                            {
                                "@type": "WebPage",
                                name: "Напитки",
                                url: "https://cooking.alivio.ai/drinks",
                            },
                        ],
                    })}
                </script>
            </Head>

            <GsuMainPage>
                <MainBlock />
                <Preferences />
                <DishesByName />
                <IngredientDishes />
                <PreferencesDishes />
                <Cart />
                <Drinks />
            </GsuMainPage>
        </>
    );
};

export default MainPage;
