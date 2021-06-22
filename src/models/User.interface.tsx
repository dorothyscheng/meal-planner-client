import List from './List.interface';
import Week from './Week.interface';

export interface UserLogin {
    username: User['username'],
    password: User['password'],
  }

export default interface User {
    username: string,
    password: string,
    email: string,
    familySize?: number,
    lists?: List[],
    weeks?: Week[],
    _id?: string,
}