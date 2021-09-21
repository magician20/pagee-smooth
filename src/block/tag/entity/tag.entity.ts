import { Column } from "typeorm";

export class Tag {

    @Column({ nullable: false})
    name: string;

    //add moe value like shape, color , icon ..
    @Column({ nullable: false})
    color: string;

}