import {FC, useState} from "react";
import {IOptions} from "@gsu-ai/gsu-ui-core/dist/types/types/globalTypes";
import {
    GsuButton,
    GsuMobileDropDown,
    MobileOpenPhotoIcon,
    OpenMobileAutocompleteIcon,
    showGsuAlert,
} from "@gsu-ai/gsu-ui-core";

import styles from "./index.module.css";

interface GsuMobileAutocompleteActionsProps {
    openFilePicker: () => void;
    options: IOptions;
    listName: string;
    values: string[];
    onOptionsSelect: (key: string[]) => void;
    onAddMessage?: (label: string) => string;
    onRemoveMessage?: (label: string) => string;
}

const GsuMobileAutocompleteActions: FC<GsuMobileAutocompleteActionsProps> = ({
    openFilePicker,
    options,
    listName,
    onOptionsSelect,
    values,
    onRemoveMessage,
    onAddMessage,
}) => {
    const [opneMobileAutocomplete, setOpenMobileAutocomplete] = useState(false);
    const [searchValue, setSearchValue] = useState("");

    const onOptionSelect = (key: string) => {
        const hasSearchValue = !!searchValue;
        const {label} = options[key];
        let itemRemoved = false;

        setSearchValue("");

        const newKeys = [...values];
        const index = newKeys.indexOf(key);
        if (index !== -1) {
            newKeys.splice(index, 1);
            itemRemoved = true;
        } else {
            newKeys.push(key);
        }

        if (hasSearchValue) {
            if (itemRemoved && onRemoveMessage) {
                showGsuAlert(onRemoveMessage(label), 3000);
            } else if (!itemRemoved && onAddMessage) {
                showGsuAlert(onAddMessage(label), 3000);
            }
        }

        onOptionsSelect(newKeys);
    };

    const handleClose = () => {
        setOpenMobileAutocomplete(false);
    };

    const handleOpen = () => {
        setOpenMobileAutocomplete(true);
    };

    const filteredOptions: IOptions = Object.fromEntries(
        Object.entries(options).filter(([, autocompleteItem]) =>
            autocompleteItem.label.toLowerCase().includes(searchValue.toLowerCase()),
        ),
    );

    return (
        <div className={styles.mobileAutocompleteOpenWrapper}>
            <GsuButton
                Icon={OpenMobileAutocompleteIcon}
                iconClassName={styles.iconWrapper}
                btnClassName={styles.mobileAddProductAction}
                style={"outline"}
                text={"Добавить продукты"}
                onClick={handleOpen}
            ></GsuButton>
            <GsuButton
                btnClassName={styles.mobileOpenPhotoIcon}
                style={"outline"}
                onClick={openFilePicker}
                Icon={MobileOpenPhotoIcon}
            />

            <GsuMobileDropDown
                values={values}
                closeOnSelect={false}
                searchValue={searchValue}
                setSearchValue={setSearchValue}
                listName={listName}
                onOptionSelect={onOptionSelect}
                closeMobileAutocomplete={handleClose}
                openMobileAutocomplete={opneMobileAutocomplete}
                options={filteredOptions}
            />
        </div>
    );
};
export default GsuMobileAutocompleteActions;
