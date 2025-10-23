import axios from "axios";
import { Todo, TodoResponse } from "../types";


export const getTodos = async (): Promise<TodoResponse[]> => {
  const response = await axios.get(
    `${import.meta.env.VITE_API_URL}/api/todos`
  );

  return response.data._embedded.todos;
};

export const deleteTodo = async (link: string):
Promise<TodoResponse> => {
  const response = await axios.delete(link);

  return response.data;
}

export const addTodo = async (todo:Todo): Promise<TodoResponse> => {
  const response = await axios.post(
    `${import.meta.env.VITE_API_URL}/api/todos`,todo
  );

  return response.data;
}