import { User } from "src/auth/entity/user.entity";
import { EntityRepository, Repository } from "typeorm";
import { CreatePageDto } from "../dto/create-page.dto";
import { PageDto } from "../dto/page.dto";
import { GetPagesFilterDto } from "../dto/get-filter-page.dto";
import { Page } from "./page.entity";
import { toPageDto } from "src/shared/mapper";


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

    async createPage(createPageDto: CreatePageDto, user: User): Promise<PageDto> {
        const { title, color, status, noteState } = createPageDto;
        const page = new Page();
        page.userId = user.id;
        page.title = title;
        //this to handle the optional but better if i have default value
        if (color != null) { page.color = color; }
        if (status != null) { page.status = status; }
        if (noteState != null) { page.noteState = noteState; }


        await page.save();
        delete page.userId;
        return toPageDto(page);
    }


}