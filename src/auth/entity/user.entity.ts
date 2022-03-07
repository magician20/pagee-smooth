import {
    BaseEntity, Column, CreateDateColumn, Entity, Generated, OneToMany, PrimaryGeneratedColumn,
    Unique, UpdateDateColumn
} from "typeorm";
import { UserRole } from "../user-role.enum";
import * as bcrypt from "bcrypt";
import { Page } from "src/page/entity/page.entity";
import { Block } from "src/block/entity/block.entity";
import { Exclude } from "class-transformer";

@Entity()
@Unique(["email"])
export class User extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;
    //i wanted to replace firstName and lastName with Name Entity
    @Column({ length: 20, name: "first_name" })
    firstName: string;

    @Column({ length: 20, name: "last_name" })
    lastName: string;

    @Column()
    email: string;

    @Exclude()
    @Column()
    password: string;

    @Column({
        type: "enum",
        enum: UserRole,
        default: UserRole.USER
    })
    userRole: UserRole

    @Column()
    salt: string;

    @CreateDateColumn({ type: 'timestamptz' })
    created_at: Date;

    @UpdateDateColumn({ type: 'timestamptz' })
    updated_at: Date;

    //relation with page
    @OneToMany(type => Page, page => page.user, { eager: true, cascade: true })
    pages: Page[];

    //relation with block
    @OneToMany(type => Block, block => block.user, { eager: true, cascade: true })
    blocks: Block[];

    ///Used for more secure when dealing  with Auth with Flutter web
    @Column()
    @Generated("uuid")
    utid: string;

    /// Custom Method (run business logic aginst a specific user instance ) to Validate Password before LogIn
    async validatePassword(password: string): Promise<boolean> {
        const hash = await bcrypt.hash(password, this.salt);
        return hash === this.password;   //bcrypt.compare(hash,this.password) not working ??
    }

}