export interface JwtResponse {
    accessToken: string;
}

export interface LoginRequest {
    email: string;
    password: string;
}
