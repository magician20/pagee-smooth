import { IsNotEmpty } from "class-validator";
import { Block } from "src/block/entity/block.entity";
import { ChildEntity, Column, Entity, } from "typeorm";
import { Tag } from "./tag.entity";

@ChildEntity()
export class TagBlock extends Block {

    @Column(() => Tag)
    @IsNotEmpty()
    tag: Tag;
}