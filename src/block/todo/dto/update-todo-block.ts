import { Type } from "class-transformer";
import { IsNotEmpty, IsNotEmptyObject, IsNumber, } from "class-validator";
import { TodoDto } from "./todo.dto";


export class UpdateTodoBlockDto {

    @Type(() => Number)
    @IsNumber()
    @IsNotEmpty()
    order: number;

    @IsNotEmptyObject()
    @Type(() => TodoDto)
    todo: TodoDto;

}