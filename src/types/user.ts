export enum Role {
    USER,
    MERCHANT,
    ADMIN,
}

export interface User {
    userId: number;
    name: string;
    email: string;
    roles: Role[];
}
