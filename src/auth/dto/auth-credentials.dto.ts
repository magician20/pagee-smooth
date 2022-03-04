import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class AuthCredentialsDto {
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    @IsString()
    password: string;//maybe also i handle null password here

}