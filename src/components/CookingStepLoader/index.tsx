import {FC} from "react";

import {GsuStepLoaderProps} from "@gsu-ai/gsu-ui-core/dist/types/types/globalTypes";
import {GsuBasicStepLoader} from "@gsu-ai/gsu-ui-core";

import {CookingIcon} from "../../core/icons";

const CookingStepLoader: FC<GsuStepLoaderProps> = ({steps, terminated, onComplete}) => {
    return <GsuBasicStepLoader steps={steps} terminated={terminated} onComplete={onComplete} Logo={CookingIcon} />;
};

export default CookingStepLoader;
