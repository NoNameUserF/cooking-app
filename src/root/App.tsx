import {FC, useEffect, useState} from "react";
import {
    acceptGA,
    GSUApp,
    GsuBannerCookiesModal,
    hasCookiesConsent,
    isAcceptedCookiesConsent,
    rejectGA,
    setMainHost,
    setStage, setupGA,
} from "@gsu-ai/gsu-ui-core"

import routes from "../core/routes";

import {setApplicationHost} from "../constants/api";

import alivioLogo from "/images/logo/updated-logo.svg";

import image500 from "/images/error-content/error500.png";
import shortLogo from "/images/logo/logo-cooking-in-modal-about.svg";
import "@gsu-ai/gsu-ui-core/style";

import "./variables.css";
import "./app.module.css";
import ReactGA from "react-ga4"

const aboutText =
    "Не знаете, что приготовить? Просто откройте Cooking AI. Это современный веб-сервис, которыйпревратит каждого пользователя в шеф-повара." +
    " Неважно, вы опытный кулинар или только учитесь отличать соль от сахара — Cooking AI  подстроится под ваш уровень и поможет создать настоящие шедевры с минимальными усилиями и максимальным удовольствием";

const warningText =
    "Все рецепты на нашем сервисе созданы искусственным интеллектом, поэтому мы не можем гарантировать результат и не несем ответственности, если рецепт вам не подошел";

const App: FC = () => {
    const [openCookiesBanner, setOpenCookiesBanner] = useState(false);
    const [hydrated, setHydrated] = useState(false);

    useEffect(() => {
        setMainHost(import.meta.env.VITE_MAIN_API_URL);
        setApplicationHost(import.meta.env.VITE_MAIN_API_URL);
        setStage(import.meta.env.VITE_MAIN_STAGE);

        setupGA();
        if (!hasCookiesConsent()) {
            setOpenCookiesBanner(true);
        } else {
            if (isAcceptedCookiesConsent()) {
                acceptGA();
            } else {
                rejectGA();
            }
        }
        setHydrated(true);
    }, []);

    return (
        <>
            {hydrated && openCookiesBanner && (
                <GsuBannerCookiesModal openModal={openCookiesBanner} setOpenModal={setOpenCookiesBanner} />
            )}

            <GSUApp
                img500src={image500}
                mainLogo={alivioLogo}
                appName={"Cooking AI"}
                shortLogo={shortLogo}
                aboutText={aboutText}
                warningText={warningText}
                router={routes}
            />
        </>
    );
};

export default App;
