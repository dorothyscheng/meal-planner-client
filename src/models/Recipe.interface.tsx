interface nutrients {
    label: string,
    quantity: number,
    unit: string,
}

interface nutrientObj {
    ENERC_KCAL?: nutrients,
    FAT?: nutrients,
    FASAT?: nutrients,
    FATRN?: nutrients,
    FAMS?: nutrients,
    FAPU?: nutrients,
    CHOCDF?: nutrients,
    FIBTG?: nutrients,
    SUGAR?: nutrients,
    PROCNT?: nutrients,
    CHOLE?: nutrients,
    NA?: nutrients,
    CA?: nutrients,
    MG?: nutrients,
    K?: nutrients,
    FE?: nutrients,
    ZN?: nutrients,
    P?: nutrients,
    VITA_RAE?: nutrients,
    VITC?: nutrients,
    THIA?: nutrients,
    RIBF?: nutrients,
    NIA?: nutrients,
    VITB6A?: nutrients,
    FOLDFE?: nutrients,
    FOLFD?: nutrients,
    FOLAC?: nutrients,
    VITB12?: nutrients,
    VITD?: nutrients,
    TOCPHA?: nutrients,
    VITK1?: nutrients,
    WATER?: nutrients,
}

interface digest {
    label?: string,
    tag?: string,
    schemaOrgTag?: string,
    total?: number,
    hasRDI?: boolean,
    daily?: number,
    unity?: string,
    sub?: digest[],
}

export interface RecipeLong {
    recipe: {
        uri?: string,
        label?: string,
        image?: string,
        source?: string,
        url?: string,
        shareAs?: string,
        yield?: number,
        dietLabels?: string[],
        healthLabels?: string[],
        cautions?: string[],
        ingredientLines?: string[],
        ingredients?: Array<{
            text?: string,
            weight?: number,
            foodCategory?: string,
            foodId?: string,
            image?: string,
        }>,
        calories?: number,
        totalWeight?: number,
        totalTime?: number,
        cuisineType?: string[],
        mealType?: string[],
        dishType?: string[],
        totalNutrients?: nutrientObj,
        totalDaily?: nutrientObj,
        digest?: digest,
    },
    _links: {
        self: {
            href: string,
            title: string,
        },
    },
}

export interface RecipeResponse {
    from: number,
    to: number,
    count: number,
    _links: {
        next: {
            href: string,
            title: string,
        },
    },
    hits: RecipeLong[],
}

// export default interface Recipe {
//     url?: string,
//     image?: string,
//     source?: string,
//     label?: string,
//     yield?: number,
//     dietLabels?: string[],
//     healthLabels?: string[],
//     ingredientLines?: string[],
//     totalTime?: number,
//     cuisineType?: string[],
//     mealType?: string[],
//     apiLink?: string,
// }