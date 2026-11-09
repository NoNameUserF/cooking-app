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

import CookingModalAbort from "../../modals/CookingModalAbort";
import httpResponseCodeList from "../../helpers/httpResponseCodeList";
import {commonErrorViewStingContent} from "../../helpers/commonConstants";

import styles from "../../root/app.module.css";

import {commonDescription, textBlockByRequest, textBlockDescription} from "../../helpers/modalsText";
import {DishesEmoji} from "../../core/icons";

import CookingEmptyProductsModal from "../../modals/CookingEmptyProductsModal";
import {CookingStepState} from "../../wizards/CookingStep";

import CookingStepLoader from "../../components/CookingStepLoader";

import workflow, {ProductWizardPageState} from "./workflow";

const header = "Приятного аппетита!";
const msg =
    "Если наш рецепт пришелся вам по душе, вы можете поддержать наш проект пожертвованием или поделиться своим отзывом, чтобы помочь нам стать еще лучше";
const btnText = "Назад к рецепту";

const ProductPage: FC = () => {
    useEffect(() => {
        ReactGA.send({hitType: "pageview", page: location.pathname});
    }, []);

    const ErrorModal = (componentState: ProductWizardPageState, wizardState: IWizardState, error: GsuError) => {
        if (isGsuServerError(error) && error.status === httpResponseCodeList.tooManyRequests) {
            if (error.link === "/getProducts") {
                return (props: IErrorModal<ProductWizardPageState>) => (
                    <GsuDefaultErrorModal
                        btnLabel={commonErrorViewStingContent}
                        header={textBlockByRequest}
                        description={textBlockDescription}
                        action={props.reset}
                        {...props}
                    ></GsuDefaultErrorModal>
                );
            } else {
                return (props: IErrorModal<ProductWizardPageState>) => (
                    <GsuDefaultErrorModal
                        btnLabel={commonErrorViewStingContent}
                        header={textBlockByRequest}
                        description={textBlockDescription}
                        action={props.reset}
                        {...props}
                    ></GsuDefaultErrorModal>
                );
            }
        }

        if (isGsuServerError(error) && error.status === httpResponseCodeList.notFound) {
            if (error.link === "/getProducts") {
                return (props: IErrorModal<ProductWizardPageState>) => <CookingEmptyProductsModal {...props} />;
            }
        }

        return (props: IErrorModal<ProductWizardPageState>) => (
            <GsuDefaultErrorModal
                btnLabel={commonErrorViewStingContent}
                description={commonDescription}
                action={props.reset}
                {...props}
            ></GsuDefaultErrorModal>
        );
    };

    const FinishModal = (componentState: CookingStepState) => {
        if (componentState.activeStep < componentState.steps.length - 1) {
            return CookingModalAbort;
        } else {
            return (props: IFinishModal<CookingStepState>) => (
                <GsuDefaultWizardFinishModal
                    header={header}
                    msg={msg}
                    btnText={btnText}
                    Emoji={DishesEmoji}
                    {...props}
                />
            );
        }
    };

    const wizardContainerStyle = () => {
        return {};
    };

    const wizardWindowStyle = () => {
        return {};
    };

    const wizardContentStyle = (componentState: ProductWizardPageState, wizardState: IWizardState) => {
        return wizardState._loader ? {paddingTop: "0"} : {};
    };

    return (
        <>
            <Head>
                <title>Блюда из ингредиентов — Cooking AI</title>
                <meta
                    name="description"
                    content="Укажите ингредиенты и количество порций — Cooking AI подберёт рецепты, рассчитает пропорции и покажет пошаговое приготовление."
                />
                <link rel="canonical" href="https://cooking.alivio.ai/dishes-by-products" />

                <meta property="og:title" content="Блюда из ингредиентов — Cooking AI" />
                <meta
                    property="og:description"
                    content="Введите ингредиенты и число порций — ИИ создаст подборку блюд с рассчитанными ингредиентами и инструкциями приготовления."
                />
                <meta property="og:url" content="https://cooking.alivio.ai/dishes-by-products" />

                <meta name="twitter:title" content="Блюда из ингредиентов — Cooking AI" />
                <meta
                    name="twitter:description"
                    content="Cooking AI подберёт блюда по вашим ингредиентам и рассчитает пропорции для нужного количества порций. Просто, быстро и вкусно."
                />

                <script type="application/ld+json">
                    {JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "WebApplication",
                        name: "Cooking AI — Блюда из ингредиентов",
                        url: "https://cooking.alivio.ai/dishes-by-products",
                        applicationCategory: "FoodApplication",
                        operatingSystem: "Web",
                        inLanguage: "ru-RU",
                        description:
                            "Cooking AI позволяет ввести список ингредиентов и количество порций, чтобы получить рецепты с точными пропорциями и пошаговыми инструкциями.",
                        featureList: [
                            "Поиск блюд по ингредиентам",
                            "Расчёт ингредиентов по количеству порций",
                            "Пошаговые рецепты приготовления",
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
                        name: "Блюда из ингредиентов — Cooking AI",
                        url: "https://cooking.alivio.ai/dishes-by-products",
                        description:
                            "Введите ингредиенты и количество порций, и Cooking AI подберёт блюда с рассчитанными ингредиентами и пошаговыми инструкциями приготовления.",
                    })}
                </script>
            </Head>

            <div className={styles.wizardPageContainer}>
                <GsuWizard
                    workflow={workflow}
                    id={"Product"}
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

export default ProductPage;
