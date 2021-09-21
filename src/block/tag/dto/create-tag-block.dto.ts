import { Type } from "class-transformer";
import { IsNotEmpty, IsNumber, } from "class-validator";
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

    @IsNotEmpty()
   // @IsObject()
    @Type(() => TagDto)
    tag: TagDto;

}