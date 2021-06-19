import Recipe from './Recipe.interface';

export default interface List {
    name: string,
    recipes: Recipe[],
}