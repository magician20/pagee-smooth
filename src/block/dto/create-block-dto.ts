import { Type } from "class-transformer";
import { IsNotEmpty, IsNumber, IsObject, IsString, } from "class-validator";
import { TagDto } from "../tag/dto/tag.dto";
import { TextDto } from "../text/dto/text.dto";
import { TodoDto } from "../todo/dto/todo.dto";
import { BlockDto } from "./block.dto";

///This calss not used yet
export abstract class CreateBlockDto {//error here because order

    @Type(() => Number)
    @IsNumber()
    @IsNotEmpty()
    order: number;

    @IsString()
    __type: string;//work with oe without IDk what the difference

    //need base type like Block
    @IsNotEmpty()
    // @IsObject()
     @Type(() => BlockDto,{
        discriminator: {
            property: '__type',
            subTypes: [
                { value: TextDto, name: 'textDto' },
                { value: TodoDto, name: 'todoDto' },
                { value: TagDto, name: 'tagDto' },
            ],
        },
    })
     blockdto: TextDto|TodoDto|TagDto;

}