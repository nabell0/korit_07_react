import {
  AppBar,
  Toolbar,
  Typography,
  Container,
  CssBaseline,
} from "@mui/material";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Todo } from "./types";
import {List, ListItem, ListItemText} from '@mui/material';
import { useState } from 'react';
import AddList from "./components/AddList";

const queryClient = new QueryClient();

function App() {
  const [todos,setTodos] =useState<Todo[]>([]);
  const addTodo = (todo:Todo) => {
    setTodos([todo,...todos]);
  }
  return (
    <Container>
      <CssBaseline />
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">
            Todo List
          </Typography>
        </Toolbar>
      </AppBar>
      <AddList addTodo={addTodo}/>
      <List>
        {
          todos.map((todo, index)=>
            <ListItem key={index} divider>
              <ListItemText
              primary={todo.content}
              />
            </ListItem>
          )
        }
      </List>
      <QueryClientProvider client={queryClient}></QueryClientProvider>
    </Container>
  );
}

export default App;
