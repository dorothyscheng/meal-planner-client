import axios, { AxiosResponse, AxiosError } from 'axios';

import User, { UserLogin } from './User.interface';

const endPoint='https://meal-plan-api.herokuapp.com/api/v1/users';

interface errorMessage {
    message: string,
}

class UserModel {
    static login = async (user: UserLogin): Promise<User | errorMessage> => {
        try {
            const response: AxiosResponse = await axios.post<User>(`${endPoint}/login`, user);
            return response.data;
        } catch (err: unknown) {
            const error = err as AxiosError;
            return error;
        };
    }

    static create = async (user: User): Promise<User | errorMessage> => {
        try {
            const response: AxiosResponse = await axios.post<User>(endPoint, user);
            return response.data;
        } catch (err: unknown) {
            const error = err as AxiosError;
            return error;
        };
    }

    static show = async (username: User['username']): Promise<User | errorMessage> => {
        try {
            const response: AxiosResponse = await axios.get<User>(`${endPoint}/${username}`);
            return response.data;
        } catch (err: unknown) {
            const error = err as AxiosError;
            return error;
        };
    }

    static update = async (username: User['username'], user: User): Promise<User | errorMessage> => {
        try {
            const response: AxiosResponse = await axios.put<User>(`${endPoint}/${username}`, user);
            return response.data;
        } catch (err: unknown) {
            const error = err as AxiosError;
            return error;
        };
    }

    static delete = async (user: User): Promise<User | errorMessage> => {
        try {
            const response: AxiosResponse = await axios.delete<User>(`${endPoint}/${user.username}`);
            return response.data;
        } catch (err: unknown) {
            const error = err as AxiosError;
            return error;
        }
    }

}

export default UserModel;