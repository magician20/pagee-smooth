import { UserRole } from "../user-role.enum";

export class UserDto {
    //name:Name
    firstName: string;
    lastName: string;
    email: string;
    userRole: UserRole;
    created_at: Date;
    updated_at: Date;
}