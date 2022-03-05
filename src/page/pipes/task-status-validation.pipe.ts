import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform } from "@nestjs/common";
import { TaskStatus } from "../task-status.enum";

@Injectable()
export class TaskStatusValidationPipe implements PipeTransform {

    readonly allowedStatus = [
        TaskStatus.OPEN,
        TaskStatus.IN_PROGRESS,
        TaskStatus.DONE,
        TaskStatus.HOLD,
    ];

    transform(value: string, metatype : ArgumentMetadata) {
        value = value.toUpperCase();
        if (this.isStatusValid(value)) {
            throw new BadRequestException(`${value} is an invalid status.`);
        }

        return value;
    }

    private isStatusValid(status: any) {
        const index = this.allowedStatus.indexOf(status);
        return index == -1;
    }

}