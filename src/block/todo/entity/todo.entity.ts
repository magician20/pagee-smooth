import { Text } from "src/block/text/entity/text.entity";
import { Column, } from "typeorm";

//Embedded Entitie
export class Todo {

    // @Column(()=>Text)
    // text: Text;
    
    @Column({ type: "text" , })
    content: string ;

    @Column()
    isDone: string;

}