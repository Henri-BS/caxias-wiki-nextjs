export class User {
    name?: string;
    email?: string;
    password?: string;
}

export class Credentials {
    email?: string;
    password?: string;
}

export class AccessToken {
    accessToken?: string;
}

export class UserSessionToken {
    id?: string;
    name?: string;
    email?: string;
    accessToken?: string;
    expiration?: number;
}