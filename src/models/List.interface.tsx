import { RecipeLong } from './Recipe.interface';

export default interface List {
    name: string,
    recipes: RecipeLong[],
    _id?: string,
}