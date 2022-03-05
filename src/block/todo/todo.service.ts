import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/auth/entity/user.entity';
import { fromTodoDto } from 'src/shared/mapper';
import { getRepository } from 'typeorm';
import { CreateTodoBlockDto } from './dto/create-todo-block';
import { GetTodossFilterDto } from './dto/get-filter-todo.dto';
import { IsCompletedDto } from './dto/is-completed-todo.dto';
import { UpdateTodoBlockDto } from './dto/update-todo-block';
import { TodoBlock } from './entity/todo-block.entity';
import { TodoBlockRepository } from './entity/todo.repository';

@Injectable()
export class TodoService {

    constructor(@InjectRepository(TodoBlockRepository) private todoRepository: TodoBlockRepository) { }

    async getAllTodoBlock(filterDto: GetTodossFilterDto, user: User): Promise<TodoBlock[]> {
        return await this.todoRepository.getTodos(filterDto, user);
    }

    async getTodoBlockByID(id: number, user: User): Promise<TodoBlock> {
        const found = await this.todoRepository.findOne({ where: { id, userId: user.id } });
        if (!found) {
            throw new NotFoundException(`TodoBlock with ID "${id}" not found.`);
        }
        return found;
    }
    
    async createTodoBlock(createTodoBlockDto: CreateTodoBlockDto, user: User): Promise<TodoBlock> {
        return await this.todoRepository.createTodo(createTodoBlockDto, user);
    }


    async editTodoBlock(id: number, updateTodoBlockDto: UpdateTodoBlockDto, user: User): Promise<TodoBlock> {
        const todoBlock = await this.getTodoBlockByID(id, user);
        const { todo, order} = updateTodoBlockDto;
       // const todoCase={...todo,isDone:todo.isDone.toLowerCase()} //I lowerCase value before store that cause of not able to use @Transform()
        todoBlock.todo = fromTodoDto(todo);
        todoBlock.order = order;

        //await getRepository(TodoBlock).save(todoBlock);
        await todoBlock.save();
        delete todoBlock.userId;
        return todoBlock;
    }

    async updateTodoBlockState(id: number, isCompletedDto: IsCompletedDto, user: User): Promise<TodoBlock> {
        const todoBlock = await this.getTodoBlockByID(id, user);
        todoBlock.todo.isDone = isCompletedDto.isDone.toLowerCase();

        //await getRepository(TodoBlock).save(todoBlock);
        await todoBlock.save();
        return todoBlock;

    }


    async deleteTodoBlockByID(id: number, user: User): Promise<void> {
        const result = await this.todoRepository.delete({ id, userId: user.id });
        //check effect to know if it's done
        if (result.affected == 0) {
            throw new NotFoundException(`TodoBlock with ID "${id}" not found.`);
        }
    }

}

///remove
// const todoBlock = await this.getTodoBlockByID(id, user);
// let deleteTodo = this.todoRepository.remove(todoBlock);
// if (deleteTodo === null) {
//     throw new NotFoundException(`TodoBlock with ID "${id}" not found.`);
// }