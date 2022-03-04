
//Maybe better if create table task and add to page when page need to have task life cycle
/**
 * TaskStatus add to a page to represent task life cycle.
 * 
 * TaskStatus: OPEN, IN_PROGRESS, DONE, HOLD
 */
export enum TaskStatus {
   //UNSPECIFIED = 'UNSPECIFIED',///add this will make the page by default not support task options
   OPEN = 'OPEN',
   IN_PROGRESS = 'IN_PROGRESS',
   DONE = 'DONE',
   HOLD = 'HOLD',
}

//should be renamed as PageState (that handle page when showing in our client ) 
/**
 * TaskStatus: UNSPECIFIED, PINNED, ARCHIEVED, DELETED
 */
export enum NoteState {
   UNSPECIFIED = 'UNSPECIFIED',
   PINNED = 'PINNED',
   ARCHIEVED = 'ARCHIEVED',
   DELETED = 'DELETED',
}
