import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/decorators/get-user.decorator';
import { User } from 'src/auth/entity/user.entity';
import { CreateTodoBlockDto } from './dto/create-todo-block';
import { GetTodossFilterDto } from './dto/get-filter-todo.dto';
import { IsCompletedDto } from './dto/is-completed-todo.dto';
import { UpdateTodoBlockDto } from './dto/update-todo-block';
import { TodoBlock } from './entity/todo-block.entity';
import { TodoService } from './todo.service';

@Controller('todo')
@UseGuards(AuthGuard())
export class TodoController {

    constructor(private todoService: TodoService) { }

    @Get()
    getAllTodoBlock(
        @Query(ValidationPipe) filterDto: GetTodossFilterDto,
        @GetUser() user: User,
    ): Promise<TodoBlock[]> {
        //get all Todos
        return this.todoService.getAllTodoBlock(filterDto, user);
    }

    @Get('/:id')
    getTodoBlockByID(
        @Param('id', ParseIntPipe) id: number,
        @GetUser() user: User,
    ): Promise<TodoBlock> {
        return this.todoService.getTodoBlockByID(id, user);
    }

    @Post()
    @UsePipes(ValidationPipe)
    createTodoBlock(
        @Body() createTodoBlockDto: CreateTodoBlockDto,
        @GetUser() user: User,
        //@Body('pageId', ParseIntPipe) pageId: number,
    ): Promise<TodoBlock> {
        return this.todoService.createTodoBlock(createTodoBlockDto, user);
    }

    @Patch('/:id')
    editTodoBlock(
        @Param('id', ParseIntPipe) id: number,
        @Body(ValidationPipe) updateTodoBlockDto: UpdateTodoBlockDto,
        //@Body('pageId', ParseIntPipe) pageId: number,
        @GetUser() user: User,
    ): Promise<TodoBlock> {
        return this.todoService.editTodoBlock(id, updateTodoBlockDto, user);
    }


    @Patch('/:id/state')
    updateTodoBlockState(
        @Param('id', ParseIntPipe) id: number,
        @Body(ValidationPipe) isCompletedDto: IsCompletedDto,
        @GetUser() user: User,
    ): Promise<TodoBlock> {
        return this.todoService.updateTodoBlockState(id, isCompletedDto, user);
    }

    @Delete('/:id')
    deleteTodoBlockByID(
        @Param('id', ParseIntPipe) id: number,
        @GetUser() user: User,
    ): Promise<void> {
        return this.todoService.deleteTodoBlockByID(id, user);
    }

}
