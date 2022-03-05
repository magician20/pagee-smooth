import { Type } from 'class-transformer';
import { IsArray, IsEnum, IsNotEmpty, IsOptional, IsString, } from 'class-validator';
import { CreateBlockDto } from 'src/block/dto/create-block-dto';
import { NoteState, TaskStatus } from '../task-status.enum';

///This Class need to handle Block Validate and transform (Pipe)
export class CreatePageDto {

    //for make my live easy will make this must be enter to create the page
    @IsNotEmpty()
    @IsString()
    title: string;

    @IsOptional()
    @IsNotEmpty() //optional but you can't pass empty
    color: string;

    @IsOptional()
    @IsEnum(TaskStatus)
    status: TaskStatus;

    @IsOptional()
    @IsEnum(NoteState)
    noteState: NoteState;

    /// (away to pass all blocks one time ans safe )the easy way is not add this for now !!?
    // need to add this so i can update page with the new content easy insted of insert each block when it's create
    // @IsOptional()
    // @IsArray()
    // @Type(() => CreateBlockDto,)  //have different subtype so this will not work
    // content: CreateBlockDto[];
}