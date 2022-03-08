import { Injectable, UnauthorizedException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { InjectRepository } from "@nestjs/typeorm";
import { Strategy, ExtractJwt } from "passport-jwt";
import { User } from "../entity/user.entity";
import { UserRepository } from "../entity/user.repository";
import { JwtPayload } from "./jwt-payload.interface";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {

    constructor(
        @InjectRepository(UserRepository) private userRepository: UserRepository,
        private configService: ConfigService
    ) {
        super(
            {
                jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
                ignoreExpiration: false,
                secretOrKey: configService.get('JWT_SECRET'),
            }
        );
    }

    async validate(payload: JwtPayload): Promise<User> {
        //use unique column isn't show importan information like email , password 
        //userTokenNumber >> is unique and not have important info
        const { userName, userTokenNumber } = payload;
        const user = await this.userRepository.findOne({ where: { utid: userTokenNumber } });//work
        //const user=await this.userRepository.getUserPayload(userTokenNumber);//work

        if (!user) {
            throw new UnauthorizedException();
        }

        return user;
    }

}