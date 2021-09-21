import { IsAlpha, IsNotEmpty, IsOptional, IsString, Length,} from "class-validator";
import { BlockDto } from "src/block/dto/block.dto";

export class TagDto implements BlockDto {

    @IsNotEmpty()
    @IsString()
    @IsAlpha()
    @Length(20)
    name: string;

    @IsOptional()
    color: string;

}