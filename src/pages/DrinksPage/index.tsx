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
import CookingModalAbort from "../../modals/CookingModalAbort";
import styles from "../../root/app.module.css";

import {DrinksEmoji} from "../../core/icons";

import {CookingStepState} from "../../wizards/CookingStep";

import CookingStepLoader from "../../components/CookingStepLoader";

import workflow, {DrinkWizardPageState} from "./workflow";

const header = "Наслаждайтесь!";
const msg =
    "Если наш рецепт пришелся вам по душе, вы можете поддержать наш проект пожертвованием или поделиться своим отзывом, чтобы помочь нам стать еще лучше";
const btnText = "Назад к рецепту";
const DrinksPage: FC = () => {
    useEffect(() => {
        ReactGA.send({hitType: "pageview", page: location.pathname});
    }, []);

    const ErrorModal = (componentState: DrinkWizardPageState, wizardState: IWizardState, error: GsuError) => {
        if (isGsuServerError(error) && error.status === httpResponseCodeList.tooManyRequests) {
            return (props: IErrorModal<DrinkWizardPageState>) => (
                <GsuDefaultErrorModal
                    btnLabel={commonErrorViewStingContent}
                    header={textBlockByRequest}
                    description={textBlockDescription}
                    action={props.reset}
                    {...props}
                ></GsuDefaultErrorModal>
            );
        }

        return (props: IErrorModal<DrinkWizardPageState>) => (
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
                    Emoji={DrinksEmoji}
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

    const wizardContentStyle = (componentState: DrinkWizardPageState, wizardState: IWizardState) => {
        return wizardState._loader ? {paddingTop: "0"} : {};
    };

    return (
        <>
            <Head>
                <title>Напитки — Cooking AI</title>
                <meta
                    name="description"
                    content="Расскажите, что вам нравится — и Cooking AI подберёт рецепты напитков под ваши предпочтения. Смузи, кофе, коктейли и многое другое с пошаговыми инструкциями."
                />
                <link rel="canonical" href="https://cooking.alivio.ai/drinks" />

                <meta property="og:title" content="Напитки — Cooking AI" />
                <meta
                    property="og:description"
                    content="Хотите смузи, кофе или коктейль? Cooking AI подберёт рецепты напитков под ваши вкусы, предложит ингредиенты и шаги приготовления."
                />
                <meta property="og:url" content="https://cooking.alivio.ai/drinks" />

                <meta name="twitter:title" content="Напитки — Cooking AI" />
                <meta
                    name="twitter:description"
                    content="ИИ подберёт рецепты напитков под ваши предпочтения: смузи, кофе, коктейли и многое другое — с шагами приготовления и советами по ингредиентам."
                />

                <script type="application/ld+json">
                    {JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "WebApplication",
                        name: "Cooking AI — Напитки",
                        url: "https://cooking.alivio.ai/drinks",
                        applicationCategory: "FoodApplication",
                        operatingSystem: "Web",
                        inLanguage: "ru-RU",
                        description:
                            "Cooking AI подбирает рецепты напитков под ваши вкусы: освежающие смузи, утренний кофе, вечерние коктейли. Пошаговые инструкции и советы по ингредиентам.",
                        featureList: [
                            "Подбор напитков по предпочтениям",
                            "Пошаговые рецепты приготовления",
                            "Советы по ингредиентам и времени готовки",
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
                        name: "Напитки — Cooking AI",
                        url: "https://cooking.alivio.ai/drinks",
                        description:
                            "Cooking AI подберёт рецепты напитков под ваши предпочтения — смузи, кофе, коктейли и многое другое с пошаговыми инструкциями и советами по ингредиентам.",
                    })}
                </script>
            </Head>

            <div className={styles.wizardPageContainer}>
                <GsuWizard
                    workflow={workflow}
                    id={"Drinks"}
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

export default DrinksPage;
