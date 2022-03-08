import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserRepository } from './entity/user.repository';
import { JwtStrategy } from './jwt/jwt.strategy';


@Module({
    imports: [
        PassportModule.register({ defaultStrategy: "jwt", }),
        JwtModule.registerAsync({
            inject: [ConfigService],
            useFactory: async (config: ConfigService) => ({
                secret: config.get<string>('JWT_SECRET'),
                signOptions: { expiresIn: config.get<string | number>('JWT_ACCESS_TOKEN_EXP'), }//using the default HS256
            }),
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
