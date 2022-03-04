import { Type } from "class-transformer";
import { IsNotEmpty, IsNumber, } from "class-validator";
import { TextDto } from "./text.dto";


export class UpdateTextBlockDto  {

    @Type(() => Number)
    @IsNumber()
    @IsNotEmpty()
    order: number;

   // @IsObject()
    @Type(() => TextDto)
    text: TextDto;

}