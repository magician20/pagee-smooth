import { Type } from "class-transformer";
import { IsNotEmpty, IsNumber, } from "class-validator";
import { TagDto } from "./tag.dto";

export class UpdateTagBlockDto {

    @Type(() => Number)
    @IsNumber()
    @IsNotEmpty()
    order: number;

    @IsNotEmpty()
   // @IsObject()
    @Type(() => TagDto)
    tag: TagDto;

}