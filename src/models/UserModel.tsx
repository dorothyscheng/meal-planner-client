import axios, { AxiosResponse } from 'axios';

import User, { UserLogin } from './User.interface';

const endPoint = 'http://localhost:4000/api/v1/users';

interface errorMessage {
    message: string,
}

class UserModel {
    static login = async (user: UserLogin): Promise<User | errorMessage> => {
        const response: AxiosResponse = await axios.post<User>(`${endPoint}/login`, user);
        return response.data;
    }

    static create = async (user: User): Promise<User | errorMessage> => {
        const response: AxiosResponse = await axios.post<User>(endPoint, user);
        return response.data;
    }
}

export default UserModel;