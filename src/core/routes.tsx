import {IRoute} from "@gsu-ai/gsu-ui-core/dist/types/types/globalTypes";

import {prepareSSGRouter} from "@gsu-ai/gsu-ui-core";

import HeatIcon from "../assets/CustomizeSvg/NavBar/HeatIcon";
import FoodIcon from "../assets/CustomizeSvg/NavBar/FoodIcon";
import HomeIcon from "../assets/CustomizeSvg/NavBar/HomeIcon";
import DrinkIcon from "../assets/CustomizeSvg/NavBar/DrinkIcon";
import CartIcon from "../assets/CustomizeSvg/NavBar/CartIcon";
import DishNameIcon from "../assets/CustomizeSvg/NavBar/DishNameIcon";

import image404 from "/images/error-content/image-404.png";

import App from "../root/App";

import type {RouteRecord} from "vite-react-ssg";

export const routes: IRoute[] = [
    {
        path: "/",
        name: "Главная",
        icon: HomeIcon,
        importer: () => import("../pages/MainPage"),
    },
    {
        path: "/dishes-by-name",
        name: "Блюда по названию",
        icon: DishNameIcon,
        importer: () => import("../pages/DishNamePage"),
    },
    {
        path: "/dishes-by-products",
        name: "Блюда из ингредиентов",
        icon: ({active}) => <FoodIcon active={active} />,
        importer: () => import("../pages/ProductPage"),
    },
    {
        path: "/dishes-by-wishes",
        name: "Блюда по желанию",
        icon: HeatIcon,
        importer: () => import("../pages/WishPage"),
    },
    {
        path: "/cart",
        name: "Корзина покупок",
        icon: CartIcon,
        importer: () => import("../pages/CartPage"),
    },
    {
        path: "/drinks",
        name: "Напитки",
        icon: DrinkIcon,
        importer: () => import("../pages/DrinksPage"),
    },
];

export const ssgRouter: RouteRecord[] = [
    {
        path: "/",
        element: <App />,
        entry: "src/root/App.tsx",
        children: [...prepareSSGRouter(routes, image404)],
    },
];

export default routes;
