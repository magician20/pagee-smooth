import { IsNotEmpty, IsString, } from "class-validator";
import { BlockDto } from "src/block/dto/block.dto";


export class TextDto implements BlockDto {

    @IsString()
    content: string;

    //other values
}