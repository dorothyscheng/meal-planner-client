import { RecipeLong } from './Recipe.interface';

export interface ListWithUser {
    username: string,
    name: string,
}

export default interface List {
    name: string,
    recipes: RecipeLong[],
    _id?: string,
}