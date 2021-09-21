import { IsNotEmpty, IsOptional, IsString, } from "class-validator";
import { Type } from 'class-transformer';
import { IsCompleted } from "../pipes/todo-completed-validation";
import { BlockDto } from "src/block/dto/block.dto";
import { TextDto } from "src/block/text/dto/text.dto";

export class TodoDto implements BlockDto{

    // @Type(() => TextDto)
    // textDto: TextDto;
    @IsString()
    content: string;

    // @Transform(({ value}) => value.toLowerCase()) still can't perform change value to lowercase her but can use pipe
    @IsNotEmpty()
    @IsCompleted()     //validate work also as (@Validate(IsCompletedConstraint))
    isDone: string;     //problem about transform value string to lowercase string

}
