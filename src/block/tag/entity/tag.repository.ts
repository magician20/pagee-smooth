import { User } from "src/auth/entity/user.entity";
import { fromTagDto } from "src/shared/mapper";
import { EntityRepository, getRepository, Repository } from "typeorm";
import { CreateTagBlockDto } from "../dto/create-tag-block.dto";
import { GetTagsFilterDto } from "../dto/get-filter-tag.dto";
import { TagBlock } from "./tag-block.entity";


@EntityRepository(TagBlock)
export class TagBlockRepository extends Repository<TagBlock>{

    async createTag(createTagBlockDto: CreateTagBlockDto, user: User): Promise<TagBlock> {
        const { order, pageId, tag } = createTagBlockDto;
        
        const tagBlock = new TagBlock();
        tagBlock.order = order;
        tagBlock.pageId = pageId;
        if(!tag.color){
            tag.color="0xFFFFFF";//better if we run beforeInsert to initialize default value "0xFFFFFF"
        }
        tagBlock.tag = fromTagDto(tag);
        tagBlock.userId = user.id;
       // await getRepository(TagBlock).save(TagBlock);
         await tagBlock.save();
        delete tagBlock.userId;
        return tagBlock;
    }

    async getAllTag(filterDto: GetTagsFilterDto, user: User): Promise<TagBlock[]> {
        const { pageId } = filterDto;
        const queryBuilder = this.createQueryBuilder('tagBlock');
        //featch tag by userID
        queryBuilder.where('tagBlock.userId = :userId', { userId: user.id });

        if (pageId) {
            queryBuilder.andWhere('tagBlock.pageId= :pageId', { pageId });
        }
        const tags = await queryBuilder.getMany();
        // var tagList: tagBlock[] = [];
        // tags.forEach(tag => {
        //     tagList.push(totagDto(tag));
        // });

        return tags;
    }

}