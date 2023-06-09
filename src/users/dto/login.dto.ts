import { IsString } from 'class-validator';

export class LoginRequest {
    @IsString()
    id: string;
    @IsString()
    password: string;
}

export class LoginResponse {
    @IsString()
    token: string;
}
