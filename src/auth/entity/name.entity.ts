import { Column } from "typeorm";

//Embedded Entity not used yet
export class Name {

    @Column({ length: 20, name: "first_name" })
    firstName: string;

    @Column({ length: 20, name: "last_name" })
    LastName: string;

}