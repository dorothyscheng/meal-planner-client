import axios, { AxiosResponse, AxiosError } from 'axios';

import List from './List.interface';

const endPoint = 'https://meal-plan-api.herokuapp.com/api/v1/lists';

interface errorMessage {
    message: string,
}

class ListModel {
    static create = async (list: List): Promise<List | errorMessage> => {
        try {
            const response: AxiosResponse = await axios.post<List>(endPoint, list);
            return response.data;
        } catch (err: unknown) {
            const error = err as AxiosError;
            return error;
        }
    }

    static update = async (list: List): Promise<List | errorMessage> => {
        try {
            const response: AxiosResponse = await axios.put<List>(`${endPoint}/${list._id}`, list);
            return response.data;
        } catch (err: unknown) {
            const error = err as AxiosError;
            return error;
        }
    }

    static delete = async (list: List): Promise<List | errorMessage> => {
        try {
            const response: AxiosResponse = await axios.delete<List>(`${endPoint}/${list._id}`);
            return response.data;
        } catch (err: unknown) {
            const error = err as AxiosError;
            return error;
        }
    }
}

export default ListModel