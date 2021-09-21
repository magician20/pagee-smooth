import { ConflictException, InternalServerErrorException } from "@nestjs/common";
import { EntityRepository, Repository } from "typeorm";
import { CreateUserDto } from "../dto/create-user.dto";
import { User } from "./user.entity";
import * as bcrypt from "bcrypt";
import { AuthCredentialsDto } from "../dto/auth-credentials.dto";

const PG_UNIQUE_CONSTRAINT_VIOLATION = "23505";

@EntityRepository(User)
export class UserRepository extends Repository<User>{

    async singUp(createUserDto: CreateUserDto): Promise<void> {
        const { firstName,lastName, email, password } = createUserDto;

        const salt = await bcrypt.genSalt();

        const user = new User();
        user.firstName = firstName;
        user.lastName = lastName;
        user.email = email;
        user.password = await this.hashPassword(password, salt);;
        user.salt = salt;
        try {
            await user.save();
        } catch (error) {
            if (error && error.code == PG_UNIQUE_CONSTRAINT_VIOLATION) {//duplicate email
                throw new ConflictException("Email already exists");
            } else {
                throw new InternalServerErrorException();
            }
        }

    }

    async validateUserPassword(authCredentialsDto: AuthCredentialsDto): Promise<User> {
        const { email, password } = authCredentialsDto;
        const user = await this.findOne({email});
        //validate Passowrd using bcrypt  
        if (user && await user.validatePassword(password)) {
            return user;
        }
            return null;       
    }


    private async hashPassword(password: string, salt: string): Promise<string> {
        return bcrypt.hash(password, salt);
    }

    //get user from payload
    async getUserPayload(userTokenNumber:String) : Promise<User>{
        const queryBuilder = this.createQueryBuilder('user');
       return await queryBuilder.where('user.utid = :utid', { utid: userTokenNumber }).getOne();

    }

}