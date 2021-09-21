import { User } from "src/auth/entity/user.entity";
import { fromTodoDto } from "src/shared/mapper";
import { EntityRepository, getRepository, Repository } from "typeorm";
import { CreateTodoBlockDto } from "../dto/create-todo-block";
import { GetTodossFilterDto } from "../dto/get-filter-todo.dto";
import { TodoBlock } from "./todo-block.entity";

@EntityRepository(TodoBlock)
export class TodoBlockRepository extends Repository<TodoBlock>{

    async getTodos(filterDto: GetTodossFilterDto, user: User): Promise<TodoBlock[]> {
        const { isDone, pageId } = filterDto;
        const queryBuilder = this.createQueryBuilder('todoBlock');
        //featch Todos by userID
        queryBuilder.where('todoBlock.userId = :userId', { userId: user.id });
        if (isDone) {
            queryBuilder.andWhere('todoBlock.isDone= :isDone', { isDone });
        }
        if (pageId) {
            queryBuilder.andWhere('todoBlock.pageId= :pageId', { pageId });
        }
        const todos = await queryBuilder.getMany();
        // var todoList: TodoDto[] = [];
        // todos.forEach(todo => {
        //     todoList.push(toTodoDto(todo));
        // });

        return todos;
    }

    async createTodo(createTodoBlockDto: CreateTodoBlockDto, user: User): Promise<TodoBlock> {
        const { order, pageId, todo,  } = createTodoBlockDto;
        const todoBlock = new TodoBlock();
        todoBlock.pageId = pageId;
        todoBlock.order = order;
        todoBlock.todo = fromTodoDto(todo);
        todoBlock.userId = user.id;
        //await getRepository(TodoBlock).save(todoBlock);
        await todoBlock.save();
        delete todoBlock.userId;
        return todoBlock;
    }

    //List Todo


}