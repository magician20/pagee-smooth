import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { toUserDto } from 'src/shared/mapper';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { UserDto } from './dto/user.dto';
import { User } from './entity/user.entity';
import { UserRepository } from './entity/user.repository';
import { JwtPayload } from './jwt/jwt-payload.interface';

@Injectable()
export class AuthService {

   constructor(
      @InjectRepository(UserRepository) private userRepository: UserRepository,
      private jwtService: JwtService,
   ) { }

   async singUp(createUserDto: CreateUserDto) {
      return await this.userRepository.singUp(createUserDto);
   }


   async signIn(authCredentialsDto: AuthCredentialsDto): Promise<{ accesstoken: string; }> {
      //check the validation
      const user = await this.userRepository.validateUserPassword(authCredentialsDto);
      
      if (!user) {
         throw new UnauthorizedException("Invalid credentials");
      }
      //Start generating the token (payload)
      const userName = `${user.firstName} ${user.lastName}`;
      const userTokenNumber = user.utid;

      const payload: JwtPayload = {
         userTokenNumber,
         userName,
      };
      //run to generate the access Token from the JWT options     
      const accesstoken = await this.jwtService.sign(payload);

      return { accesstoken };
   }


   getAuthUserInfo(user: User): UserDto{
      return toUserDto(user);
  }

}
