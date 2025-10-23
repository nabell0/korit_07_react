import { ChangeEvent } from "react";
import { DialogContent,TextField,Stack } from "@mui/material";
import { Todo } from "../types";

type DialogFormProps = {
  todos: Todo;
  handleChange: (event: ChangeEvent<HTMLInputElement>) => 
    void;
}

function TodoDialogContent({todos,handleChange}:DialogFormProps) {
  return(
    <DialogContent>
      <Stack>
        <TextField label="Todo" value={todos.content} onChange={handleChange}/>
      </Stack>
    </DialogContent>
  )
}
export default TodoDialogContent