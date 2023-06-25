import { IsString } from 'class-validator';

export class UserSearchRequest {
    @IsString()
    first_name: string;
    @IsString()
    second_name: string;
}
