import { Button ,TextField} from "@mui/material";
import { Todo } from "../types";
import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addTodos } from "../api/todolistapi";


// type AddTodoprops = {
//   addTodo: (todo: Todo) => void;
// }

function AddList(){
  const [todo, setTodo] = useState<Todo>({
    content:'',
    
  });

  const { mutate } = useMutation(addTodos, {
    onSuccess: () => {
      queryClient.invalidateQueries(["todos"]);
    },
    onError: err => {
      console.log(err);
    },
  });

  const queryClient = useQueryClient();
  


  const addTodo = () => {
    mutate(todo);
    setTodo({content: ''})
  }

  return(
  <>
  <TextField value= {todo.content} margin="dense"
  onChange={e => setTodo({...todo, content: e.target.value})}
  label="Content/항목" fullWidth />
  <Button onClick={addTodo}>
          Add / 저장
        </Button>
  </>
  )

}

export default AddList