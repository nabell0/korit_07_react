import axios,{AxiosRequestConfig} from "axios";
import { Todo, TodoResponse } from "../types";


const getAxiosConfig = (): AxiosRequestConfig => {
  const token = sessionStorage.getItem('jwt');
  return{
    headers: {
        'Authorization' : token,
        'Content-Type': 'application/json',
      },
  };
};


export const getTodos = async (): Promise<TodoResponse[]> => {
  const response = await axios.get(
    `${import.meta.env.VITE_API_URL}/todos`,getAxiosConfig()
  );
console.log(response.data)
  return response.data;
};

export const deleteTodo = async (id: string):
Promise<TodoResponse> => {
  const response = await axios.delete(`${import.meta.env.VITE_API_URL}/todos/${id}`,getAxiosConfig());

  return response.data;
}

export const addTodos = async (todo:Todo): Promise<TodoResponse> => {
  const response = await axios.post(
    `${import.meta.env.VITE_API_URL}/todos`,todo,getAxiosConfig()
  );

  return response.data;
}
