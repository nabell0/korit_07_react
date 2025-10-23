export type Todo = {
  content: string;
}
export type TodoResponse = {
  content: string;
  _link: {
    self: {
      href: string;
    }
  }
}