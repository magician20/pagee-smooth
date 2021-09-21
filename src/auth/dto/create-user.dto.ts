import { IsAlpha, IsEmail, IsNotEmpty, IsString, Matches, MaxLength, MinLength } from "class-validator";


export class CreateUserDto {
    @IsNotEmpty()
    @IsString()
    @MinLength(3)
    @MaxLength(20)
    @IsAlpha()//this will not accept space
    firstName: string;

    @IsNotEmpty()
    @IsString()
    @MinLength(3)
    @MaxLength(20)
    @IsAlpha()//this will not accept space
    lastName: string;

    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    @IsString()
    @MinLength(6)
    @MaxLength(30)
    // at least one letter loweCase , upperCase , number and special character.
    @Matches(/((?=.*\d|(?=.*\w+)))(?![.\n])(?=.*[A-Z])(?=.*[a-z])(?=.*[@#$%^&+=]).*$/, 
    { message: 'Password too week' })
    password: string;

    ///better if only done by admin
    // @IsOptional()
    // @IsIn([UserRole.USER,UserRole.ADMIN,UserRole.EDITOR,UserRole.GUEST,])
    // role: UserRole;
}