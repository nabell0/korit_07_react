import { Stack, TextField ,Button , Snackbar} from "@mui/material";
import axios from "axios";
import { useState } from "react";
// import AddList from "./AddList";
// import { addTodos } from "../api/todolistapi";
import Todolist from "./Todolist";


type User = {
  username: string;
  password: string;
}

function Login(){
  const[user,setUser] = useState<User>({
    username:'',
    password:''
  });

  const [isAuthenticated, setAuth] = useState(false);
  const [open, setOpen] = useState(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>)=> {
    setUser({...user, [event.target.name]:event.target.value});
  }
  const handleLogin = () => {
    axios.post(import.meta.env.VITE_API_URL + "/login", user,{
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(res => {
      const jwtToken = res.headers.authorization;
      if(jwtToken !== null) {
        sessionStorage.setItem("jwt",jwtToken);
        setAuth(true);
      }
    })
    .catch(err => {console.log(err)
    });
  }
  if(isAuthenticated){
    return (
      <>
        <Todolist/>
      </>
  )
  }else{
    return(
      <Stack spacing={2} alignItems={"center"} mt={2}>
        <TextField 
        name="username"
        label="Username"
        onChange={handleChange}
        />
        <TextField 
        type="password"
        name="password"
        label="password"
        onChange={handleChange}
        />
        <Button
        variant="outlined"
        color="primary"
        onClick={handleLogin}
        >
          Login
        </Button>
        <Snackbar
        open={open}
        autoHideDuration={3000}
        onClose={()=> setOpen(false)}
        message='Id 혹은 비밀번호가 틀렸습니다.'
        />
        
      </Stack>
    )
  }
}
export default Login
