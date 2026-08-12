export enum Role {
    USER,
    MERCHANT,
    ADMIN,
}

export interface User {
    id: number;
    name: string;
    email: string;
    roles: Role[];
}
