import {
  AppBar,
  Toolbar,
  Typography,
  Container,
  CssBaseline,
} from "@mui/material";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// import { Todo } from "./types";
// import {List, ListItem, ListItemText} from '@mui/material';
// import { useState } from 'react';
// import AddList from "./components/AddList";
import Login from "./components/Login";
const queryClient = new QueryClient();

function App() {
  // const [todos,setTodos] =useState<Todo[]>([]);
  // const addTodo = (todo:Todo) => {
  //   setTodos([todo,...todos]);
  // }
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
      <QueryClientProvider client={queryClient}>
        <Login>
        </Login>
      </QueryClientProvider>
    </Container>
  );
}

export default App;
