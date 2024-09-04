// src/auth/dto/google-user-response.dto.ts
import { IsString } from 'class-validator';

export class GoogleUserResponseDto {
    @IsString()
    id: string;

    @IsString()
    email: string;

    @IsString()
    name: string;

    @IsString()
    photo: string;

    @IsString()
    rol: string;

    @IsString()
    accessToken: string;
}
