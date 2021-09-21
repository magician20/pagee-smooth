import { IsEnum, IsIn, IsNotEmpty, IsOptional } from "class-validator";
import { NoteState, TaskStatus } from "../task-status.enum";

export class GetPagesFilterDto {
    @IsOptional()
    @IsEnum(TaskStatus)
    @IsIn([TaskStatus.OPEN,TaskStatus.IN_PROGRESS,TaskStatus.DONE,TaskStatus.HOLD,])
    status: TaskStatus;
    
    @IsOptional()
    @IsEnum(NoteState)
    @IsIn([NoteState.UNSPECIFIED,NoteState.PINNED,NoteState.ARCHIEVED,NoteState.DELETED,])
    noteState: NoteState;

    @IsOptional()
    @IsNotEmpty()
    search: string;
}