import {ChildEntity, Column, Entity,} from "typeorm";
import { Block } from "../../entity/block.entity";
import { Text } from "./text.entity";


///will be the most used Block can be empty
@ChildEntity()
export class TextBlock extends Block {

    @Column(() => Text)
    text: Text;

}