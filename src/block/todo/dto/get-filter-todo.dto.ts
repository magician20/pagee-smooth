import { Type } from "class-transformer";
import { IsNotEmpty, IsNumber, IsOptional } from "class-validator";
import { IsCompleted } from "../pipes/todo-completed-validation";

export class GetTodossFilterDto{

    @IsOptional()
    @IsNotEmpty()
    @IsCompleted()
    isDone: string;

    //@Transform(parm => parseInt(parm))
    @IsOptional()
    @IsNotEmpty()
    @Type(() => Number)
    @IsNumber()
    pageId: number;
}