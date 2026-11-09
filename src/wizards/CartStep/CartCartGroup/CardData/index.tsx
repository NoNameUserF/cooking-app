import {FC} from "react";
import {IGsuInfoContainerCell} from "@gsu-ai/gsu-ui-core/dist/types/types/globalTypes";
import {GsuInfoContainer} from "@gsu-ai/gsu-ui-core";

interface ICardDataProps {
    cardData: IGsuInfoContainerCell[];
}

const CardData: FC<ICardDataProps> = ({cardData}) => {
    return <GsuInfoContainer cells={cardData} type={"separated"} />;
};
export default CardData;
