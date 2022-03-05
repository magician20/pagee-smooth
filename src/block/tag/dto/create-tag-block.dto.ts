import { Type } from "class-transformer";
import { IsNotEmpty, IsNotEmptyObject, IsNumber, } from "class-validator";
import { TagDto } from "./tag.dto";

export class CreateTagBlockDto {

    @Type(() => Number)
    @IsNumber()
    @IsNotEmpty()
    order: number;

    @Type(() => Number)
    @IsNumber()
    @IsNotEmpty()
    pageId: number;

    @IsNotEmptyObject()
    @Type(() => TagDto)
    tag: TagDto;

}