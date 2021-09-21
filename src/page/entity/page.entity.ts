import { Exclude } from "class-transformer";
import { User } from "src/auth/entity/user.entity";
import { Block } from "src/block/entity/block.entity";
import {
    BaseEntity, Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn,
    UpdateDateColumn
} from "typeorm";
import { NoteState, TaskStatus } from "../task-status.enum";

///Ok, this Can be Change To be a Page that have header(Title / cover=image or color)+body (body contain text/images/video/todo/header/)
@Entity()
export class Page extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ default: 'page' })
    object: string;

    @Column({ default: "" })
    title: string;//change to Title Entity that have embeded Text Entity as content

    @Column({ default: "0xFFFFFF" })
    color: string;

    @Column({ type: 'enum', enum: TaskStatus, default: TaskStatus.OPEN })
    status: TaskStatus;

    @Column({ type: 'enum', enum: NoteState, default: NoteState.UNSPECIFIED })
    noteState: NoteState;//new Value

    @CreateDateColumn({ type: 'timestamptz' })
    created_at: Date;

    @UpdateDateColumn({ type: 'timestamptz' })
    updated_at: Date;

    @ManyToOne(type => User, user => user.pages, { eager: false, onDelete: 'CASCADE', })
    @JoinColumn({ name: "userId" })
    user: User;
    //(it generate automatically by TypeOrm But must define so can work with PostgreSql)
    @Exclude()
    @Column({ select: false })
    userId: number;

    ///below can be change to another table relation to handle list of blocks
    //relation with block
    @OneToMany(type => Block, block => block.page, { eager: true, cascade: true })
    content: Block[] | null;

}