import axios, { AxiosResponse, AxiosError } from 'axios';

import Week from './Week.interface';

const endPoint = 'http://localhost:4000/api/v1/weeks';

interface errorMessage {
    message: string,
}

class WeekModel {
    static create = async (week: Week): Promise<Week | errorMessage> => {
        try {
            const response: AxiosResponse = await axios.post<Week>(endPoint, week);
            return response.data;
        } catch (err: unknown) {
            const error = err as AxiosError;
            return error;
        }
    }
}

export default WeekModel;