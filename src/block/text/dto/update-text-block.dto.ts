import { Type } from "class-transformer";
import { IsNotEmpty, IsNotEmptyObject, IsNumber, } from "class-validator";
import { TextDto } from "./text.dto";


export class UpdateTextBlockDto  {

    @Type(() => Number)
    @IsNumber()
    @IsNotEmpty()
    order: number;

    @IsNotEmptyObject()
    @Type(() => TextDto)
    text: TextDto;

}