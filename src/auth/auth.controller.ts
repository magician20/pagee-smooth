import { Body, Controller, Get, Post, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { GetUser } from './decorators/get-user.decorator';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { UserDto } from './dto/user.dto';
import { User } from './entity/user.entity';

@Controller()
export class AuthController {
    constructor(private authService: AuthService) { }

    @Post('/signup')
    @UsePipes(ValidationPipe)
    signUp(@Body() createUserDto: CreateUserDto) {
        return this.authService.singUp(createUserDto);
    }

    @Post('/signin')
    signIn(@Body(ValidationPipe) authCredentialsDto: AuthCredentialsDto)
        : Promise<{ accesstoken: string; }> {
        return this.authService.signIn(authCredentialsDto);
    }



    //built for generate current user from token if it's valid
    //still iam not sure about this way
    @Get('/auth')
    @UseGuards(AuthGuard())
    GetUser(@GetUser() user: User,): UserDto {
        //get user
        return this.authService.getAuthUserInfo(user);
    }

}
