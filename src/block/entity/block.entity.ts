import { Exclude } from "class-transformer";
import { User } from "src/auth/entity/user.entity";
import { Page } from "src/page/entity/page.entity";
import { BaseEntity, Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, TableInheritance, Unique, UpdateDateColumn } from "typeorm";

@Entity()
@TableInheritance({ column: { type: "varchar", name: "type" } })
export abstract class Block extends BaseEntity {

    @PrimaryGeneratedColumn({ type: 'bigint', })
    id?: number;

    //here maybe we need change the object from block to subtype objects !! and update their entity files
    @Column({ default: 'block' })
    object: string;

    //if we use that as unique then chnage get by id to get by orderNo and page id
    @Column(/*{ unique: true }*/) //i think it's better to use orderNo as a unique insted of Primary key
    order: number;

    
    @CreateDateColumn({ type: 'timestamptz' })
    created_at: Date;

    @UpdateDateColumn({ type: 'timestamptz' })
    updated_at: Date;

    @ManyToOne(type => User, user => user.blocks, { eager: false, onDelete: 'CASCADE', })
    @JoinColumn({ name: "userId" })
    user: User;
    @Exclude()
    @Column({ select: false })
    userId: number;


    @ManyToOne(type => Page, page => page.content, { eager: false, onDelete: 'CASCADE', })//Error when try to create Page relation
    @JoinColumn({ name: "pageId" })
    page: Page;
    @Column()
    pageId: number;

}

/**
 * Single Table Inheritance: Single table inheritance is a pattern when you have multiple classes with
 * their own properties, but in the database they are stored in the same table.
 *
 * @TableInheritance({ column: { type: "varchar", name: "type" } })
 *
 * Use: think better if iam trying to make one controller,service, validation & repository to handle Block with different types
 * problem: have issues with Null and empty column values
 *
 * ------------------------------------------------------------
 * Concrete Table Inheritance:The simplest and the most effective is concrete table inheritance
 *
 * Use: belive in my case this is better than Single Table because i don't have one controller
 *
 */