import {
    GsuDefaultErrorModal,
    GsuDefaultWizardFinishModal,
    GsuSpinner,
    GsuWizard,
    GsuWizardFooter,
    isGsuServerError,
} from "@gsu-ai/gsu-ui-core";

import {FC, useEffect} from "react";

import ReactGA from "react-ga4";

import {GsuError, IErrorModal, IFinishModal, IWizardState} from "@gsu-ai/gsu-ui-core/dist/types/types/globalTypes";

import {Head} from "vite-react-ssg";

import httpResponseCodeList from "../../helpers/httpResponseCodeList";
import {commonErrorViewStingContent} from "../../helpers/commonConstants";
import {commonDescription, textBlockByRequest, textBlockDescription} from "../../helpers/modalsText";

import styles from "../../root/app.module.css";

import {CartEmoji} from "../../core/icons";

import {CartCartGroupState} from "../../wizards/CartStep/CartCartGroup";

import CookingStepLoader from "../../components/CookingStepLoader";

import workflow, {CartWizardPageState} from "./workflow";

const header = "Хороших покупок!";
const msg =
    "Если вам понравилась наша корзина, вы можете поддержать наш проект пожертвованием или поделиться своим отзывом, чтобы помочь нам стать еще лучше";
const btnText = "Назад к корзине";

const CartPage: FC = () => {
    useEffect(() => {
        ReactGA.send({hitType: "pageview", page: location.pathname});
    }, []);

    const ErrorModal = (componentState: CartWizardPageState, wizardState: IWizardState, error: GsuError) => {
        if (isGsuServerError(error) && error.status === httpResponseCodeList.tooManyRequests) {
            return (props: IErrorModal<CartWizardPageState>) => (
                <GsuDefaultErrorModal
                    btnLabel={commonErrorViewStingContent}
                    header={textBlockByRequest}
                    description={textBlockDescription}
                    action={props.reset}
                    {...props}
                ></GsuDefaultErrorModal>
            );
        }

        return (props: IErrorModal<CartWizardPageState>) => (
            <GsuDefaultErrorModal
                btnLabel={commonErrorViewStingContent}
                description={commonDescription}
                action={props.reset}
                {...props}
            ></GsuDefaultErrorModal>
        );
    };

    const FinishModal = () => {
        return (props: IFinishModal<CartCartGroupState>) => (
            <GsuDefaultWizardFinishModal Emoji={CartEmoji} header={header} msg={msg} btnText={btnText} {...props} />
        );
    };

    const wizardContainerStyle = () => {
        return {};
    };

    const wizardWindowStyle = () => {
        return {};
    };

    const wizardContentStyle = (componentState: CartWizardPageState, wizardState: IWizardState) => {
        return wizardState._loader ? {paddingTop: "0"} : {};
    };

    return (
        <>
            <Head>
                <title>Корзина покупок — Cooking AI</title>
                <meta
                    name="description"
                    content="Укажите свой бюджет и вкусовые предпочтения — Cooking AI составит готовую корзину с продуктами, объёмами и ориентировочной стоимостью."
                />
                <link rel="canonical" href="https://cooking.alivio.ai/cart" />

                <meta property="og:title" content="Корзина покупок — Cooking AI" />
                <meta
                    property="og:description"
                    content="ИИ подберёт продукты под ваш бюджет и вкусы, сформирует корзину с точными объёмами и примерной стоимостью."
                />
                <meta property="og:url" content="https://cooking.alivio.ai/cart" />

                <meta name="twitter:title" content="Корзина покупок — Cooking AI" />
                <meta
                    name="twitter:description"
                    content="Cooking AI создаст умную корзину покупок по вашему бюджету и предпочтениям. Получите готовый список продуктов и примерную стоимость."
                />

                <script type="application/ld+json">
                    {JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "WebApplication",
                        name: "Cooking AI — Корзина покупок",
                        url: "https://cooking.alivio.ai/cart",
                        applicationCategory: "FoodApplication",
                        operatingSystem: "Web",
                        inLanguage: "ru-RU",
                        description:
                            "Cooking AI автоматически формирует корзину покупок по вашему бюджету и предпочтениям — с точными объёмами и примерной стоимостью.",
                        featureList: [
                            "Формирование корзины по бюджету и вкусам",
                            "Расчёт объёмов и стоимости продуктов",
                            "Планирование покупок и питания",
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
                        name: "Корзина покупок — Cooking AI",
                        url: "https://cooking.alivio.ai/cart",
                        description:
                            "Укажите свой бюджет и предпочтения, и Cooking AI создаст готовую корзину с продуктами, объёмами и ориентировочной стоимостью.",
                    })}
                </script>
            </Head>

            <div className={styles.wizardPageContainer}>
                <GsuWizard
                    workflow={workflow}
                    id={"Cart"}
                    Loader={GsuSpinner}
                    StepLoader={CookingStepLoader}
                    Footer={GsuWizardFooter}
                    ErrorModal={ErrorModal}
                    FinishModal={FinishModal}
                    styles={{
                        container: wizardContainerStyle,
                        window: wizardWindowStyle,
                        content: wizardContentStyle,
                    }}
                    classes={{
                        container: styles.wizardContainer,
                        window: styles.wizardWindow,
                        content: styles.wizardContent,
                    }}
                />
            </div>
        </>
    );
};

export default CartPage;
