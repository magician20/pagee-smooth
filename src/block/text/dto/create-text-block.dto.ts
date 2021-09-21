import { Type } from "class-transformer";
import { IsNotEmpty, IsNumber, } from "class-validator";
import { TextDto } from "./text.dto";


export class CreateTextBlockDto  {

    @Type(() => Number)
    @IsNumber()
    @IsNotEmpty()
    order: number;

    @Type(() => Number)
    @IsNumber()
    @IsNotEmpty()
    pageId: number;

   // @IsObject()
    @Type(() => TextDto)
    text: TextDto;

}