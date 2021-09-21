import { IsNotEmpty } from "class-validator";
import { IsCompleted } from "../pipes/todo-completed-validation";


export class IsCompletedDto {

   @IsCompleted()     //validate work also as (@Validate(IsCompletedConstraint))
   @IsNotEmpty()
   isDone: string;     //problem about transform value string to lowercase string
   
}