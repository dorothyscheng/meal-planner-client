import axios, { AxiosResponse, AxiosError } from 'axios';

import List, { ListWithUser } from './List.interface';

const endPoint = 'http://localhost:4000/api/v1/lists';

interface errorMessage {
    message: string,
}

class ListModel {
    static create = async (listWithUser: ListWithUser): Promise<List | errorMessage> => {
        try {
            const response: AxiosResponse = await axios.post<List>(endPoint, listWithUser);
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
}

export default ListModel