import {FC} from "react";
import {
    GsuPageDescription,
    GsuSeparator,
    GsuTile,
    GsuWizardGroupContainer,
    GsuWizardSelectCount,
    storeDataToStorage,
} from "@gsu-ai/gsu-ui-core";

import {FileData, IWizardStep} from "@gsu-ai/gsu-ui-core/dist/types/types/globalTypes";

import {Plates2Icon} from "../../core/icons";

import styles from "./index.module.css";
import ProductsStepIngredients from "./ProductsStepIngredients";
import ProductsStepAddProduct from "./ProductsStepAddProduct";

export interface ProductsStepState {
    fileData: FileData | null;
    products: string[];
    portionCount: number;
}

const ProductsStep: FC<IWizardStep<ProductsStepState>> = ({componentState, change, innerTasks}) => {
    const {fileData} = componentState;
    const {products} = componentState;

    const {portionCount} = componentState;

    const changePortionCount = (updatedPortionCount: number) => {
        storeDataToStorage("productsPortionCount", updatedPortionCount);
        change({...componentState, portionCount: updatedPortionCount});
    };

    const setProductList = (list: string[]) => {
        storeDataToStorage("products", list);
        change({...componentState, products: list});
    };

    const addProductClickEvent = (keys: string[]) => {
        setProductList(keys);
    };

    const onDeleteProduct = (key: string) => {
        const newProducts = [...products];
        const index = newProducts.indexOf(key);
        if (index !== -1) {
            newProducts.splice(index, 1);
        }

        setProductList(newProducts);
    };

    const clearFile = () => {
        change({...componentState, fileData: null});
    };

    return (
        <GsuWizardGroupContainer>
            <GsuPageDescription
                title={"Блюда из ингредиентов"}
                description={
                    "Добавьте фото еды или введите два и более ингредиента, которые есть у вас дома, и выберите количество порций — мы предложим вам рецепты для приготовления"
                }
            />

            <div className={styles.productsContainer}>
                {!fileData && (
                    <ProductsStepAddProduct
                        displayMobileIcon={true}
                        products={products}
                        addProductClickEvent={addProductClickEvent}
                        prepareImg={innerTasks.prepareImg}
                    />
                )}

                <GsuTile className={styles.productIngredientsWrapper}>
                    <ProductsStepIngredients
                        products={products}
                        onDeleteProduct={onDeleteProduct}
                        fileData={fileData}
                        loadImg={innerTasks.loadImg}
                        clearFile={clearFile}
                    />
                    <GsuSeparator withGaps={true} />
                    <GsuWizardSelectCount
                        Icon={Plates2Icon}
                        value={portionCount}
                        change={changePortionCount}
                        header={"Порции"}
                    />
                </GsuTile>
            </div>
        </GsuWizardGroupContainer>
    );
};

export default ProductsStep;
