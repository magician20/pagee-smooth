import { Type } from "class-transformer";
import { IsNotEmpty, IsNumber, IsOptional } from "class-validator";


export class GetTagsFilterDto{

    @IsOptional()
    @IsNotEmpty()
    @Type(() => Number)
    @IsNumber()
    pageId: number;

}