import Recipe from './Recipe.interface';

export interface UserLogin {
    username: User['username'],
    password: User['password'],
  }

// export interface UserPopulated {
//     username: string,
//     password: string,
//     email: string,
//     familySize?: number,
//     lists?: Recipe[],
//     weeks?: Recipe[],
//     _id?: string,
// }

export default interface User {
    username: string,
    password: string,
    email: string,
    familySize?: number,
    lists?: Recipe[],
    weeks?: Recipe[],
    _id?: string,
}