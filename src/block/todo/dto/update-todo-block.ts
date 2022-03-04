import { Type } from "class-transformer";
import { IsNotEmpty, IsNumber, } from "class-validator";
import { TodoDto } from "./todo.dto";


export class UpdateTodoBlockDto {

    @Type(() => Number)
    @IsNumber()
    @IsNotEmpty()
    order: number;

    @IsNotEmpty()
// @IsObject()
    @Type(() => TodoDto)
    todo: TodoDto;

}