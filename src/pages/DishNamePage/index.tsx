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

import CookingDishNameError from "../../modals/CookingDishNameError";

import CookingModalAbort from "../../modals/CookingModalAbort";

import {DishesEmoji} from "../../core/icons";

import {CookingStepState} from "../../wizards/CookingStep";

import CookingStepLoader from "../../components/CookingStepLoader";

import workflow, {DishNameWizardPageState} from "./workflow";

const header = "Приятного аппетита!";
const msg =
    "Если наш рецепт пришелся вам по душе, вы можете поддержать наш проект пожертвованием или поделиться своим отзывом, чтобы помочь нам стать еще лучше";
const btnText = "Назад к рецепту";
const DishNamePage: FC = () => {
    useEffect(() => {
        ReactGA.send({hitType: "pageview", page: location.pathname});
    }, []);

    const ErrorModal = (componentState: DishNameWizardPageState, wizardState: IWizardState, error: GsuError) => {
        if (isGsuServerError(error) && error.status === httpResponseCodeList.tooManyRequests) {
            return (props: IErrorModal<DishNameWizardPageState>) => (
                <GsuDefaultErrorModal
                    btnLabel={commonErrorViewStingContent}
                    header={textBlockByRequest}
                    description={textBlockDescription}
                    action={props.reset}
                    {...props}
                ></GsuDefaultErrorModal>
            );
        }

        if (isGsuServerError(error) && error.status === httpResponseCodeList.notFound) {
            if (error.link === "/getRecipeByName") {
                return (props: IErrorModal<DishNameWizardPageState>) => {
                    return <CookingDishNameError {...props}></CookingDishNameError>;
                };
            }
        }

        return (props: IErrorModal<DishNameWizardPageState>) => (
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

    const wizardContentStyle = (componentState: DishNameWizardPageState, wizardState: IWizardState) => {
        return wizardState._loader ? {paddingTop: "0"} : {};
    };

    return (
        <>
            <Head>
                <title>Блюда по названию — Cooking AI</title>
                <meta
                    name="description"
                    content="Введите название блюда и количество порций — Cooking AI мгновенно подберёт рецепты с точными ингредиентами и пошаговыми инструкциями."
                />
                <link rel="canonical" href="https://cooking.alivio.ai/dishes-by-name" />

                <meta property="og:title" content="Блюда по названию — Cooking AI" />
                <meta
                    property="og:description"
                    content="Укажите название блюда и число порций — ИИ подберёт идеальный рецепт с рассчитанными ингредиентами и инструкциями."
                />
                <meta property="og:url" content="https://cooking.alivio.ai/dishes-by-name" />

                <meta name="twitter:title" content="Блюда по названию — Cooking AI" />
                <meta
                    name="twitter:description"
                    content="Cooking AI найдёт рецепт по названию и рассчитает ингредиенты на нужное количество порций. Удобно и точно."
                />

                <script type="application/ld+json">
                    {JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "WebApplication",
                        name: "Cooking AI — Блюда по названию",
                        url: "https://cooking.alivio.ai/dishes-by-name",
                        applicationCategory: "FoodApplication",
                        operatingSystem: "Web",
                        inLanguage: "ru-RU",
                        description:
                            "Cooking AI позволяет ввести название блюда и количество порций, чтобы получить рецепты с рассчитанными ингредиентами и пошаговыми инструкциями.",
                        featureList: [
                            "Поиск блюд по названию",
                            "Расчёт ингредиентов по количеству порций",
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
                        name: "Блюда по названию — Cooking AI",
                        url: "https://cooking.alivio.ai/dishes-by-name",
                        description:
                            "Введите название блюда и нужное количество порций, и Cooking AI подберёт точный рецепт с ингредиентами и шагами приготовления.",
                    })}
                </script>
            </Head>
            <div className={styles.wizardPageContainer}>
                <GsuWizard
                    workflow={workflow}
                    id={"DishName"}
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

export default DishNamePage;
