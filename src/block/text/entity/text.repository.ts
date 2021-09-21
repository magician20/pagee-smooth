import { User } from "src/auth/entity/user.entity";
import { fromTextDto } from "src/shared/mapper";
import { EntityRepository, getRepository, Repository } from "typeorm";
import { CreateTextBlockDto } from "../dto/create-text-block.dto";
import { TextBlock } from "./text-block.entity";

@EntityRepository(TextBlock)
export class TextBlockRepository extends Repository<TextBlock>{


    async createText(createTextBlockDto: CreateTextBlockDto, user: User): Promise<TextBlock> {
        const { order, pageId, text } = createTextBlockDto;
        const textBlock = new TextBlock();
        //Insert values
        textBlock.order = order;
        textBlock.pageId = pageId;
        textBlock.text = fromTextDto(text);
        textBlock.userId = user.id;//
       // await getRepository(TextBlock).save(textBlock);
        await textBlock.save();
        delete textBlock.userId;
        
        return textBlock;
    }


}