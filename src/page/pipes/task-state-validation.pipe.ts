import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform } from "@nestjs/common";
import { NoteState, } from "../task-status.enum";

@Injectable()
export class TaskStateValidationPipe implements PipeTransform {

    readonly allowedNoteState = [
        NoteState.UNSPECIFIED,
        NoteState.PINNED,
        NoteState.DELETED,
        NoteState.ARCHIEVED,
    ];

    transform(value: string, metatype : ArgumentMetadata) {
        value = value.toUpperCase();
        if (this.isNoteStateVaild(value)) {
            throw new BadRequestException(`${value} is an invalid state.`);
        }
        return value;
    }
    
    private isNoteStateVaild(state: any) {
        const index = this.allowedNoteState.indexOf(state);
        return index == -1;
    }

}