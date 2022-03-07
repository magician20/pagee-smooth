import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { jwtConstants } from './constants/constants';
import { UserRepository } from './entity/user.repository';
import { JwtStrategy } from './jwt/jwt.strategy';

@Module({
    imports: [
        PassportModule.register({ defaultStrategy: "jwt", }),
        JwtModule.register({
            secret: jwtConstants.secret,
            signOptions: { expiresIn: jwtConstants.expiresIn, },//using the default HS256 -- algorithm:"HS512"
        }),
        TypeOrmModule.forFeature([UserRepository]),
    ],
    controllers: [AuthController],
    providers: [
        AuthService,
        JwtStrategy,
    ],
    exports: [JwtStrategy, PassportModule]
})
export class AuthModule {

}
