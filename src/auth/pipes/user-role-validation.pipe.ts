import { BadRequestException, Injectable, PipeTransform } from "@nestjs/common";
import { UserRole } from "../user-role.enum";

@Injectable()
export class UserRoleValidationPipe implements PipeTransform {

    readonly allowedStatus = [
        UserRole.USER,
        UserRole.ADMIN,
        UserRole.EDITOR,
        UserRole.GUEST,       
    ];

    transform(value: any) {
        value = value.toUpperCase();

        if (this.isStatusValid(value)) {
            throw new BadRequestException(`${value} is an invalid roles.`);
        }

        return value;
    }

    private isStatusValid(status: any) {
        const index = this.allowedStatus.indexOf(status);
        return index == -1;
    }

}