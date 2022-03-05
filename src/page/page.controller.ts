import { Body, Controller, DefaultValuePipe, Delete, Get, Param, ParseArrayPipe, ParseIntPipe, Patch, Post, Query, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/decorators/get-user.decorator';
import { User } from 'src/auth/entity/user.entity';
import { CreatePageDto } from './dto/create-page.dto';
import { GetPagesFilterDto } from './dto/get-filter-page.dto';
import { PageDto } from './dto/page.dto';
import { Page } from './entity/page.entity';
import { ValidateCreatePagePipe } from './pipes/page-create-validation.pipe';
import { TaskStateValidationPipe } from './pipes/task-state-validation.pipe';
import { TaskStatusValidationPipe } from './pipes/task-status-validation.pipe';
import { NoteState, TaskStatus } from './task-status.enum';
import { PageService } from './page.service';
import { Pagination } from 'nestjs-typeorm-paginate';


///Need to handle any Block type (for Response and Request)
@Controller('page')
@UseGuards(AuthGuard())
export class PageController {

      constructor(private pageService: PageService) { }

      //hide or remove this after test
      // @Get()
      // getPages(
      //       @Query(ValidationPipe) filterDto: GetPagesFilterDto,
      //       @GetUser() user: User,
      // ): Promise<PageDto[]> {
      //      // if (Object.keys(filterDto).length) //check filter have data (call service to return) or not (return all data or return void)
      //       return this.pageService.getPages(filterDto, user);
      // }

      @Get()
      index(
            @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number = 1,
            @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number = 10,
            @Query(ValidationPipe) filterDto: GetPagesFilterDto,
            @GetUser() user: User,
      ): Promise<Pagination<PageDto>> {
            limit = limit > 10 ? 10 : limit;
            return this.pageService.paginate({ page, limit, route: 'http://localhost:3000/page', }, filterDto, user);
      }

      @Get('/:id')
      getPageByID(
            @Param('id', ParseIntPipe) id: number,
            @GetUser() user: User,
      ): Promise<Page> {
            return this.pageService.getPageByID(id, user);
      }

      @Post()
      createPage(
            @Body(ValidateCreatePagePipe) createPageDto: CreatePageDto,
            @GetUser() user: User,
      ): Promise<PageDto> {
            return this.pageService.createPage(createPageDto, user);
      }

      @Patch('/:id')
      savePage(
            @Param('id', ParseIntPipe) id: number,
            @Body(ValidateCreatePagePipe) createPageDto: CreatePageDto,
            @GetUser() user: User,
      ): Promise<PageDto> {
            return this.pageService.savePage(id, createPageDto, user);
      }

      @Patch('/:id/status')
      updatePageStatus(
            @Param('id', ParseIntPipe) id: number,
            @Body('status', TaskStatusValidationPipe) status: TaskStatus,
            @GetUser() user: User,
      ): Promise<PageDto> {
            return this.pageService.updatePageStatus(id, status, user);
      }

      @Patch('/:id/state')
      updatePageState(
            @Param('id', ParseIntPipe) id: number,
            @Body('noteState', TaskStateValidationPipe) noteState: NoteState,
            @GetUser() user: User,
      ): Promise<PageDto> {
            return this.pageService.updatePageState(id, noteState, user);
      }

      //IDK if that Good way
      @Patch('/state/change')
      updatePagesState(
            @Body('ids', new ParseArrayPipe({ items: Number })) ids: number[],
            @Body('noteState', TaskStateValidationPipe) noteState: NoteState,
            @GetUser() user: User,
      ): Promise<PageDto[]> {
            return this.pageService.updatePagesState(ids, noteState, user);
      }
      
       //IDK if that Good way
      @Patch('/status/change')
      updatePagesStatus(
            @Body('ids', new ParseArrayPipe({ items: Number })) ids: number[],
            @Body('status', TaskStatusValidationPipe) status: TaskStatus,
            @GetUser() user: User,
      ): Promise<PageDto[]> {
            return this.pageService.updatePagesStatus(ids, status, user);
      }


      @Delete('/:id')
      deletePageById(
            @Param('id', ParseIntPipe) id: number,
            @GetUser() user: User,
      ): Promise<void> {
            return this.pageService.deletePageByID(id, user);
      }

      // @Delete()
      // deletePages(
      //       @Body('id', new ParseArrayPipe({ items: Number })) id: number[],
      //       @GetUser() user: User,
      // ): Promise<void> {
      //       return this.pageService.deletePages(id, user);
      // }


}
