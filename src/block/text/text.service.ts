import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/auth/entity/user.entity';
import { fromTextDto } from 'src/shared/mapper';
import { CreateTextBlockDto } from './dto/create-text-block.dto';
import { UpdateTextBlockDto } from './dto/update-text-block.dto';
import { TextBlock } from './entity/text-block.entity';
import { TextBlockRepository } from './entity/text.repository';

@Injectable()
export class TextService {

    constructor(@InjectRepository(TextBlockRepository) private textRepository: TextBlockRepository) { }

    async createText(createTextBlockDto: CreateTextBlockDto, user: User): Promise<TextBlock> {
        return await this.textRepository.createText(createTextBlockDto, user);
    }

    async getTextByID(id: number, user: User): Promise<TextBlock> {
        const found = await this.textRepository.findOne({ where: { id, userId: user.id } });
        if (!found) {
            throw new NotFoundException(`TextBlock with ID "${id}" not found.`);
        }
        return found;
    }

    async editText(id: number, updateTextBlockDto: UpdateTextBlockDto, user: User): Promise<TextBlock> {
        const textBlock = await this.getTextByID(id, user);
        const { order, text } = updateTextBlockDto;
        //Insert values
        textBlock.order = order;
        textBlock.text = fromTextDto(text);
        //await getRepository(TextBlock).save(textBlock);
        
        await textBlock.save();
        return textBlock;
    }

    async deleteTextByID(id: number, user: User): Promise<void> {
        const result = await this.textRepository.delete({ id, userId: user.id });
        //check effect to know if it's done
        if (result.affected == 0) {
            throw new NotFoundException(`TextBlock with ID "${id}" not found.`);
        }
    }


}
