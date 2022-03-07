import { Column } from "typeorm";

//Embedded Entitie
export class Text {

    @Column({ type: "text" ,   }) //nullable: true, add null here made the value equal null if not exist
    content: string ;  //string | null

    // @Column({ type: "varchar", nullable: true })
    // link: string | null;

}