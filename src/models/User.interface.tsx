export interface UserLogin {
    username: User['username'],
    password: User['password'],
  }

export default interface User {
    username: string,
    password: string,
    email: string,
    familySize?: number,
    lists: string[],
    weeks: string[],
    _id?: string,
}