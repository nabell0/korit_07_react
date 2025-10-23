import { Button , DialogContent,TextField} from "@mui/material";
import { Todo } from "../types";
import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";

type AddTodoprops = {
  addTodo: (todo: Todo) => void;
}

function AddList(props: AddTodoprops){
  const [todo, setTodo] = useState<Todo>({
    content:''
  });
  

  const addTodo = () => {
    props.addTodo(todo);
    setTodo({content: ''})
  }

  return(
  <>
  <DialogContent>
  <TextField value= {todo.content} margin="dense"
  onChange={e => setTodo({...todo, content: e.target.value})}
  label="Content/항목" fullWidth />
  </DialogContent>
  <Button onClick={addTodo}>
          Add / 저장
        </Button>
  </>
  )

}

export default AddList