export type User ={
    id: string;
    name: string;
    email: string;
}

export type LoginResponse = {
    access_token: string;
    token_type: string;
}