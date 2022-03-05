import { Type } from "class-transformer";
import { IsNotEmpty, IsNotEmptyObject, IsNumber, } from "class-validator";
import { TagDto } from "./tag.dto";

export class UpdateTagBlockDto {

    @Type(() => Number)
    @IsNumber()
    @IsNotEmpty()
    order: number;


    @IsNotEmptyObject()
    @Type(() => TagDto)
    tag: TagDto;

}