import { Block } from 'src/block/entity/block.entity';
import { NoteState, TaskStatus } from '../task-status.enum';

///Respond Page
export class PageDto {
     id: number;
     object: string;
     title: string;
     status: TaskStatus;
     noteState: NoteState;
     color: String;
     created_at: Date;
     updated_at: Date;
     //Block as base typ for label, todo, Text ,EmptyBlock (as LineBreak), Headers , Images  and Page be able to know order of each element owned
     content: Block[] | null;
}