import { Injectable, NotFoundException, Query } from '@nestjs/common';
import { PageRepository } from './entity/page.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Page } from './entity/page.entity';
import { CreatePageDto } from './dto/create-page.dto';
import { NoteState, TaskStatus } from './task-status.enum';
import { GetPagesFilterDto } from './dto/get-filter-page.dto';
import { User } from 'src/auth/entity/user.entity';
import { PageDto } from './dto/page.dto';
import { toPageDto } from 'src/shared/mapper';
import { paginate, Pagination, IPaginationOptions, } from 'nestjs-typeorm-paginate';
import { Cron, CronExpression } from '@nestjs/schedule';


@Injectable()
export class PageService {

    constructor(
        @InjectRepository(PageRepository) private pageRepository: PageRepository,
        // @InjectRepository(TextBlockRepository) private textRepository: TextBlockRepository,
        // @InjectRepository(TodoBlockRepository) private todoRepository: TodoBlockRepository,
        // @InjectRepository(TagBlockRepository) private tagRepository: TagBlockRepository
    ) { }

    //hide or remove this after test
    // async getPages(filterDto: GetPagesFilterDto, user: User): Promise<PageDto[]> {
    //     return this.pageRepository.getPages(filterDto, user);
    // }

    async paginate(options: IPaginationOptions, filterDto: GetPagesFilterDto, user: User): Promise<Pagination<PageDto>> {
        const queryBuilder = this.pageRepository.createQueryBuilder('page').leftJoinAndSelect("page.content", "block");
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

    async getPageByID(id: number, user: User): Promise<Page> {
        const found = await this.pageRepository.findOne({ where: { id, userId: user.id } });
        if (!found) {
            throw new NotFoundException(`Page with ID "${id}" not found.`);
        }
        return found;
    }


    async createPage(
        createPageDto: CreatePageDto,
        user: User,
    ): Promise<PageDto> {
        return this.pageRepository.createPage(createPageDto, user,);
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
    }


    async savePage(id: number, createPageDto: CreatePageDto, user: User): Promise<PageDto> {
        const page = await this.getPageByID(id, user);
        const { title, color, status, noteState } = createPageDto;
        page.title = title;
         //this to handle the optional
         if (color!=null) { page.color = color; }
         if (status!=null) { page.status = status; }
         if (noteState!=null) { page.noteState = noteState; }

        await page.save();
        return toPageDto(page);
    }


    async updatePageStatus(id: number, status: TaskStatus, user: User): Promise<PageDto> {
        const page = await this.getPageByID(id, user);
        page.status = status;
        await page.save();
        return toPageDto(page);
    }

    //IDK if that Good way
    async updatePagesStatus(ids: number[], status: TaskStatus, user: User): Promise<PageDto[]> {
        //IDK if this good way
        var pagesDto: PageDto[] = [];
        for (let index = 0; index < ids.length; index++) {
            const element = ids[index];
            const page = await this.updatePageStatus(element, status, user);
            pagesDto.push(page);
        }

        return pagesDto;
    }

    async updatePageState(id: number, noteState: NoteState, user: User): Promise<PageDto> {
        const page = await this.getPageByID(id, user);
        page.noteState = noteState;
        await page.save();
        return toPageDto(page);
    }

    //IDK if that Good way
    async updatePagesState(ids: number[], noteState: NoteState, user: User): Promise<PageDto[]> {
        //IDK if this good way
        var pagesDto: PageDto[] = [];
        for (let index = 0; index < ids.length; index++) {
            const element = ids[index];
            const page = await this.updatePageState(element, noteState, user);
            pagesDto.push(page);
        }

        return pagesDto;
        ///Failed Try
        // const queryBuilder = this.pageRepository.createQueryBuilder();
        // queryBuilder.where('page.userId = :userId', { userId: user.id });
        // queryBuilder.update<Page>(Page,{noteState:noteState},);
        // queryBuilder.where('page.id IN (:...ids)', { ids: id },);//error
        // let pages = await queryBuilder.getMany();
        // var pagesDto: PageDto[] = [];
        // pages.forEach(page => {
        //     pagesDto.push(toPageDto(page));
        // });
    }

    //This Method will Kill every Page have state deleted EveryWeek (Dum mmmm...)
    //maybe upgrade this to be implemented for each user depend on which date page deleted (but this will be complicated) 
    @Cron(CronExpression.EVERY_WEEK, { name: 'KillPages' })
    async clearForEverPagesDeleted() {
        const queryBuilder = this.pageRepository.createQueryBuilder();
        queryBuilder.where('noteState=:noteState', { noteState: "DELETED" });
        let result = await queryBuilder.delete().execute();
        // console.log(result.affected);
    }

    async deletePageByID(id: number, user: User): Promise<void> {
        //delete do less read and using condation
        const result = await this.pageRepository.delete({ id, userId: user.id });//delete one row
        //check effect to know if it's done
        if (result.affected == 0) {
            throw new NotFoundException(`Page with ID "${id}" not found.`);
        }
    }

    ///I forget that ican't delete pages but i will move them to trash folder and 
    ///then delete them or create function to delte them after a peroid of time
    // async deletePages(id: number[], user: User): Promise<void> {
    //     const queryBuilder = this.pageRepository.createQueryBuilder().delete();
    //     try {
    //         queryBuilder.where('userId = :userId', { userId: user.id });//error here 
    //     } catch {
    //         throw new NotFoundException(`User not found.`);
    //     }
    //     const result = await queryBuilder.andWhere('page.id IN (:ids)', { ids: id }).execute();
    //     //check effect to know if it's done
    //     if (result.affected == 0) {
    //         throw new NotFoundException(`Page with ID "${id}" not found.`);
    //     }
    // }

}
