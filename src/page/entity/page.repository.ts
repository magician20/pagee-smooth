import { User } from "src/auth/entity/user.entity";
import { EntityRepository, Repository } from "typeorm";
import { CreatePageDto } from "../dto/create-page.dto";
import { PageDto } from "../dto/page.dto";
import { GetPagesFilterDto } from "../dto/get-filter-page.dto";
import { Page } from "./page.entity";
import { toPageDto } from "src/shared/mapper";
import { IPaginationOptions, paginate, Pagination } from "nestjs-typeorm-paginate";


@EntityRepository(Page)
export class PageRepository extends Repository<Page>{

    /**
     * Filter list of pages depend on @param filterDto
     * @param filterDto obj filter data
     * @param user for auth
     * @returns PageDto[]
     */
    async getPages(filterDto: GetPagesFilterDto, user: User): Promise<PageDto[]> {
        const { noteState, status, search } = filterDto;
        //featch Pages with todo[]
        const queryBuilder = this.createQueryBuilder('page').leftJoinAndSelect("page.content", "block");
        //featch Pages by userID
        queryBuilder.where('page.userId = :userId', { userId: user.id });

        if (status) {
            queryBuilder.andWhere('page.status=:status', { status });
        }
        if (noteState) {
            queryBuilder.andWhere('page.noteState=:noteState', { noteState });
        }
        //here this problem with staf like {+,--,*,/}
        if (search) {
            queryBuilder.andWhere('(LOWER(page.title) LIKE LOWER(:search))', { search: `%${search}%` });
        }

        const pages = await queryBuilder.getMany();
        var pagesDto: PageDto[] = [];
        pages.forEach(page => {
            pagesDto.push(toPageDto(page));
        });

        return pagesDto;
    }

    async paginate(options: IPaginationOptions, filterDto: GetPagesFilterDto, user: User): Promise<Pagination<PageDto>> {
        const queryBuilder = this.createQueryBuilder('page').leftJoinAndSelect("page.content", "block");
        if (filterDto !== null || filterDto !== undefined) {
            const { noteState, status, search } = filterDto;
            //featch Pages by userID
            queryBuilder.where('page.userId = :userId', { userId: user.id });
            if (status) {
                queryBuilder.andWhere('page.status=:status', { status });
            }
            if (noteState) {
                queryBuilder.andWhere('page.noteState=:noteState', { noteState });
            }
            //here this problem with staf like {+,--,*,/}
            if (search) {
                queryBuilder.andWhere('(LOWER(page.title) LIKE LOWER(:search))', { search: `%${search}%` });
            }
        }
        queryBuilder.orderBy('page.created_at', "DESC")
        return paginate<PageDto>(queryBuilder, options);
    }

    async createPage(createPageDto: CreatePageDto, user: User): Promise<PageDto> {
        const { title, color, status, noteState } = createPageDto;
        const page = new Page();
        page.userId = user.id;
        page.title = title;
        //this to handle the optional but better if i have default value
        page.color = color;
        page.status = status;
        page.noteState = noteState;


        await page.save();
        delete page.userId;
        return toPageDto(page);
    }


}


/// < This Code When i made to get page data but now i used better way >
        // const { content } = createPageDto;
        // console.log(content);
        // let pageId: number = pageDto.id;
        // if (content === undefined || content.length == 0) {
        //     return pageDto;
        // }
        // //should loop content then save depend on type
        // content.forEach(data => {
        //     const { order, __type, blockdto } = data;
        //     console.log(data);

        //     if (blockdto instanceof TextDto || __type === 'textDto') {
        //         console.log("TextDto");
        //         let text = blockdto as TextDto;//undefined
        //         this.textRepository.createText({ order, pageId, text }, user)
        //     }
        //     if (blockdto instanceof TodoDto || __type === 'todoDto') {
        //         console.log("TodoDto");
        //         let todo = blockdto as TodoDto;//undefined
        //         this.todoRepository.createTodo({ order, pageId, todo }, user)

        //     }
        //     if (blockdto instanceof TagDto || __type === 'tagDto') {
        //         console.log("TagDto");
        //         let tag = blockdto as TagDto;//undefined
        //         this.tagRepository.createTag({ order, pageId, tag }, user)

        //     }
        // });

        // let found = await this.getPageByID(pageDto.id, user);
        // return toPageDto(found);