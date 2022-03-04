//import { UserRole } from "../user-role.enum";

export interface JwtPayload{
    userTokenNumber: String;
    userName:string;   
    //we can also add role here 
}