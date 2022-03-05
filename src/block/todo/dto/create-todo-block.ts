import { Type } from "class-transformer";
import { IsNotEmpty, IsNotEmptyObject, IsNumber, } from "class-validator";
import { TodoDto } from "./todo.dto";


export class CreateTodoBlockDto {

    @Type(() => Number)
    @IsNumber()
    @IsNotEmpty()
    order: number;

    @Type(() => Number)
    @IsNumber()
    @IsNotEmpty()
    pageId: number;

    @IsNotEmptyObject()
    @Type(() => TodoDto)
    todo: TodoDto;

}