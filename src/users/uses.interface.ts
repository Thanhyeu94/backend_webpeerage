export interface userCreatePayLoad{
    name: string;
    email: string;
    password: string;
    phone: string;
    vetify_token: string;
    status_token: boolean;
}
export interface updateCreatePayLoad{
    email: string;
    status_token: boolean;
}