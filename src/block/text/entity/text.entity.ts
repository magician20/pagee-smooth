import { Column } from "typeorm";

//Embedded Entitie
export class Text {

    @Column({ type: "text" ,  nullable: true, })
    content: string | null;

    // @Column({ type: "varchar", nullable: true })
    // link: string | null;

}