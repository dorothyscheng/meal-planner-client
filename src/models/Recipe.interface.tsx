export default interface Recipe {
    url?: string,
    image?: string,
    source?: string,
    label?: string,
    yield?: number,
    dietLabels?: string[],
    healthLabels?: string[],
    ingredientLines?: string[],
    totalTime?: number,
    cuisineType?: string[],
    mealType?: string[],
    apiLink?: string,
}

// I think I need to either expand the recipe interface here and in meal-api to exactly match what the external API is sending, or create a second recipe interface that has all the external API properties