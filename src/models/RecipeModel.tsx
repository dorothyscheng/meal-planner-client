import axios, { AxiosResponse } from 'axios';
import { RecipeResponse } from './Recipe.interface';

const endPoint = 'https://api.edamam.com/api/recipes/v2?type=public&app_id=488fc9d4&app_key=dd84cee819e411dcf66e9ca1c4b933ec'

class RecipeModel {
    static querySearch = async (query: string): Promise<RecipeResponse> => {
        const response: AxiosResponse = await axios.get<RecipeResponse>(`${endPoint}&${query}`);
        return response.data;
    }

    static show = async (url: string): Promise<RecipeResponse> => {
        const response: AxiosResponse = await axios.get<RecipeResponse>(url);
        return response.data;
    }
}

export default RecipeModel;