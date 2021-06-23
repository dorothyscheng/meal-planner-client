import { RecipeLong } from './Recipe.interface';

export default interface List {
    username: string,
    name: string,
    recipes: RecipeLong[],
    _id?: string,
    createdAt?: string,
    updatedAt?: string,
}