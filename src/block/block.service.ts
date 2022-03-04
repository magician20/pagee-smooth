import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/auth/entity/user.entity';
import { TurnIntoBlockDto } from './dto/turn-into-block.dto';
import { Block } from './entity/block.entity';
import { BlockRepository } from './entity/block.repository';
import { TextBlock } from './text/entity/text-block.entity';
import { Text } from './text/entity/text.entity';
import { TextService } from './text/text.service';
import { TodoBlock } from './todo/entity/todo-block.entity';
import { Todo } from './todo/entity/todo.entity';
import { TodoService } from './todo/todo.service';


@Injectable()
export class BlockService {

  constructor(
    @InjectRepository(BlockRepository) private blockRepository: BlockRepository,
    private todoService: TodoService,
    private textService: TextService,
  ) { }

  //posgresql problem with id cause it increase automitcally when save trigger also i need to return DTO better
  /** 
   * Used to transform from one block type to another if it's valid to do that
  */
  async turnInto(id: number, turnIntoBlockDto: TurnIntoBlockDto, user: User): Promise<Block> {
    const { type_from, type_to } = turnIntoBlockDto;

    if (type_from === "text") {
      //get the text that will be turnInto todo
      let textBlock = await this.textService.getTextByID(id, user);
      //Create the todo by taking the data from text
      //check first type_to
      let todoBlock = new TodoBlock();
      todoBlock.todo = new Todo();
      try {
        //todoBlock.id = textBlock.id; //autoincrement generate (bad code) 
        todoBlock.userId = user.id;
        todoBlock.order = textBlock.order;
        todoBlock.pageId = textBlock.pageId;
        const { content } = textBlock.text;
        todoBlock.todo.content = content;
        todoBlock.todo.isDone = "false";
      } catch (err) {
        throw new NotFoundException(err.message);
      }
      //delete the old text that turned into the new todo
      await this.textService.deleteTextByID(id, user);
      //Save the new one 
      await todoBlock.save();

      delete todoBlock.userId;

      return todoBlock;
    }
    //get the todo that will be turnInto text
    let todoBlock = await this.todoService.getTodoBlockByID(id, user);
    //Create the todo by taking the data from text
    //check first type_to
    let textBlock = new TextBlock();
    textBlock.text = new Text();
    try {
      //textBlock.id = todoBlock.id;//autoincrement generate 
      textBlock.userId = user.id;
      textBlock.order = todoBlock.order;
      textBlock.pageId = todoBlock.pageId;
      textBlock.text.content = todoBlock.todo.content;
    } catch (err) {
      throw new NotFoundException(err.message);
    }
    //delete the old text that turned into the new todo
    await this.todoService.deleteTodoBlockByID(id, user);
    //Save the new one 
    await textBlock.save();

    delete textBlock.userId;

    return textBlock;
  }

}
