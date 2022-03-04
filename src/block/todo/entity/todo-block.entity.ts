import { IsNotEmpty } from "class-validator";
import { Block } from "src/block/entity/block.entity";
import { ChildEntity, Column, Entity, } from "typeorm";
import { Todo } from "./todo.entity";


@ChildEntity()
export class TodoBlock extends Block {

    // @Column({ default: 'todo' })
    // object: string;

    @Column(() => Todo)
    @IsNotEmpty()
    todo: Todo;

}