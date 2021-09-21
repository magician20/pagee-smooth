import { UserDto } from "src/auth/dto/user.dto";
import { User } from "src/auth/entity/user.entity";
import { PageDto } from "src/page/dto/page.dto";
import { Page } from "src/page/entity/page.entity";
import { Tag } from "src/block/tag/entity/tag.entity";
import { TodoDto } from "src/block/todo/dto/todo.dto";
import { Todo } from "src/block/todo/entity/todo.entity";
import { TagDto } from "src/block/tag/dto/tag.dto";
import { Text } from "src/block/text/entity/text.entity";
import { TextDto } from "src/block/text/dto/text.dto";

///Define how json will be look like

export const toUserDto = (data: User): UserDto => {
    const { firstName,lastName, email, userRole, created_at, updated_at } = data;
    let userDto: UserDto = { firstName,lastName, email, userRole, created_at, updated_at };
    return userDto;
};

export const toPageDto = (data: Page): PageDto => {
    const { id, object, title, status, noteState, color, created_at, updated_at, content } = data;
    //weard part why PageDto take Todo[] not TodoDto[]
    let pageDto: PageDto = { id, object, title, status, noteState, color, created_at, updated_at, content };
    return pageDto;
};


/******************************************************************************************** */


export const fromTodoDto = (data: TodoDto): Todo => {
    const { content, isDone, } = data;
    //let textdto =new TextDto;
    //textdto=textDto; 
    // let text = fromTextDto(textdto);  //undefined { ...data };//didn't work because i had to create Text object assign that value to todo then pass content value
    let todo: Todo = { content, isDone };
    return todo;
};

export const fromTagDto = (data: TagDto): Tag => {
    const { name, color }: { name: string, color: string } = data;
    let tag: Tag = { name, color };
    return tag;
};

export const fromTextDto = (data: TextDto): Text => {
    const { content } = data;
    let text: Text = { content };
    return text;
};

// export const fromCreateBlockDto = (data: BlockDto): Block=> {
//     if(data instanceof TextDto)
//     {
//         const { content } = data;
//     }
//     if(data instanceof TodoDto)
//     if(data instanceof TagDto)

//     return ;
// };