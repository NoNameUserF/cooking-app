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

import {DishesEmoji} from "../../core/icons";
import {commonDescription, textBlockByRequest, textBlockDescription} from "../../helpers/modalsText";

import {CookingStepState} from "../../wizards/CookingStep";

import CookingStepLoader from "../../components/CookingStepLoader";

import workflow, {WishWizardPageState} from "./workflow";

const header = "Приятного аппетита!";
const msg =
    "Если наш рецепт пришелся вам по душе, вы можете поддержать наш проект пожертвованием или поделиться своим отзывом, чтобы помочь нам стать еще лучше";
const btnText = "Назад к рецепту";

const WishPage: FC = () => {
    useEffect(() => {
        ReactGA.send({hitType: "pageview", page: location.pathname});
    }, []);

    const ErrorModal = (componentState: WishWizardPageState, wizardState: IWizardState, error: GsuError) => {
        if (isGsuServerError(error) && error.status === httpResponseCodeList.tooManyRequests) {
            return (props: IErrorModal<WishWizardPageState>) => (
                <GsuDefaultErrorModal
                    btnLabel={commonErrorViewStingContent}
                    header={textBlockByRequest}
                    description={textBlockDescription}
                    action={props.reset}
                    {...props}
                ></GsuDefaultErrorModal>
            );
        }

        return (props: IErrorModal<WishWizardPageState>) => (
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

    const wizardContentStyle = (componentState: WishWizardPageState, wizardState: IWizardState) => {
        return wizardState._loader ? {paddingTop: "0"} : {};
    };

    return (
        <>
            <Head>
                <title>Блюда по желанию — Cooking AI</title>
                <meta
                    name="description"
                    content="Выберите предпочтения — тип кухни, диету, настроение или сложность — и Cooking AI предложит оригинальные блюда с подробными рецептами."
                />
                <link rel="canonical" href="https://cooking.alivio.ai/dishes-by-wishes" />

                <meta property="og:title" content="Блюда по желанию — Cooking AI" />
                <meta
                    property="og:description"
                    content="Укажите предпочтения: кухня, диета, настроение, сложность — и получите подборку блюд с пошаговыми рецептами."
                />
                <meta property="og:url" content="https://cooking.alivio.ai/dishes-by-wishes" />

                <meta name="twitter:title" content="Блюда по желанию — Cooking AI" />
                <meta
                    name="twitter:description"
                    content="ИИ подберёт оригинальные блюда под ваши предпочтения и покажет подробные рецепты."
                />

                <script type="application/ld+json">
                    {JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "WebApplication",
                        name: "Cooking AI — Блюда по желанию",
                        url: "https://cooking.alivio.ai/dishes-by-wishes",
                        applicationCategory: "FoodApplication",
                        operatingSystem: "Web",
                        inLanguage: "ru-RU",
                        description:
                            "Выберите тип кухни, диету, настроение и уровень сложности — Cooking AI подберёт блюда и покажет пошаговые рецепты.",
                        featureList: [
                            "Подбор блюд по предпочтениям",
                            "Фильтры: кухня, диета, настроение, сложность",
                            "Пошаговые рецепты",
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
                        name: "Блюда по желанию — Cooking AI",
                        url: "https://cooking.alivio.ai/dishes-by-wishes",
                        description:
                            "Укажите предпочтения — кухня, диета, настроение, сложность — и получите подборку блюд с пошаговыми рецептами.",
                    })}
                </script>
            </Head>

            <div className={styles.wizardPageContainer}>
                <GsuWizard
                    workflow={workflow}
                    id={"Wish"}
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

export default WishPage;
