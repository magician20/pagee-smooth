import { Type } from "class-transformer";
import { IsNotEmpty, IsString, } from "class-validator";


//error here because order
export abstract class TurnIntoBlockDto {

    @IsNotEmpty()
    @IsString()
    type_from: string;// (text,todo)

    @IsNotEmpty()
    @IsString()
    type_to: string;//(text,todo)

}