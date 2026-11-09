export interface IStep {
    description: string;
    time: number;
    items: string[];
}

export interface IProducts {
    products: string[];
}

export interface IProduct {
    product: string;
    image?: string;
}

export interface ICartProduct {
    cost: number;
    name: string;
}

export interface ICart {
    products: ICartProduct[];
}

export interface IDish {
    name: string;
    description: string;
    products: string[];
    time: number;
    imageSrc: string | null;
}

export interface IDishes {
    dishes: IDish[];
}

export interface IRecipe {
    steps: IStep[];
}

export interface IRecipeByName {
    products: string[];
    time: number;
    steps: IStep[];
}
