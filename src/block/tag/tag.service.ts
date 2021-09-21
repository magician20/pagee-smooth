import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/auth/entity/user.entity';
import { fromTagDto } from 'src/shared/mapper';
import { getRepository } from 'typeorm';
import { CreateTagBlockDto as CreateTagBlockDto } from './dto/create-tag-block.dto';
import { GetTagsFilterDto } from './dto/get-filter-tag.dto';
import { TagBlock } from './entity/tag-block.entity';
import { TagBlockRepository as TagBlockRepository } from './entity/tag.repository';

@Injectable()
export class TagService {
    constructor(@InjectRepository(TagBlockRepository) private TagRepository: TagBlockRepository) { }

    async getAllTag(filterDto: GetTagsFilterDto, user: User): Promise<TagBlock[]> {
        return await this.TagRepository.getAllTag(filterDto, user);
    }
    
    async getTagByID(id: number, user: User): Promise<TagBlock> {
        const found = await this.TagRepository.findOne({ where: { id, userId: user.id } });
        if (!found) {
            throw new NotFoundException(`TagBlock with ID "${id}" not found.`);
        }
        return found;
    }

    createTag(createTagBlockDto: CreateTagBlockDto, user: User): Promise<TagBlock> {
        return this.TagRepository.createTag(createTagBlockDto, user);
    }
    
    async editTag(id: number, createTagBlockDto: CreateTagBlockDto, user: User): Promise<TagBlock> {
        const TagBlock = await this.getTagByID(id, user);
        const { order, pageId, tag } = createTagBlockDto;
        TagBlock.order = order;
        TagBlock.pageId = pageId;
        TagBlock.tag = fromTagDto(tag);

        //await getRepository(TagBlock).save(TagBlock);
        await TagBlock.save();
        return TagBlock;
    }
    
    
    async deleteTagByID(id: number, user: User): Promise<void> {
        const result = await this.TagRepository.delete({ id, userId: user.id });
        //check effect to know if it's done
        if (result.affected == 0) {
            throw new NotFoundException(`TagBlock with ID "${id}" not found.`);
        }
    }
    

}
