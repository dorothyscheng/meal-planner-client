export default interface User {
    username: string,
    password: string,
    email: string,
    familySize?: number,
    lists: string[],
    weeks: string[],
}