export enum TodoActions {
  GET_TODO = 'GET_TODO',
  TODO_LOADING = 'TODO_LOADING',
  TODO_ERROR = 'TODO_ERROR',
  ADD_TODO = 'ADD_TODO',
  CHANGE_TODO = 'CHANGE_TODO',
  COMPLETE_TODO = 'COMPLETE_TODO',
  REMOVE_TODO = 'REMOVE_TODO',
  REMOVE_ALL_COMPLETED = 'REMOVE_ALL_COMPLETED',
}

export interface Todo {
  id: string;
  text: string;
  completed: boolean;
}

export interface TodoState {
  todos: Todo[] | null;
  loading: boolean;
  error: null | string;
}

interface GetTodo {
  type: TodoActions.GET_TODO;
  payload: Todo[] | null;
}

interface TodoLoading {
  type: TodoActions.TODO_LOADING;
}

interface TodoError {
  type: TodoActions.TODO_ERROR;
  payload: string;
}

interface AddTodo {
  type: TodoActions.ADD_TODO;
  payload: Todo;
}

interface ChangeTodo {
  type: TodoActions.CHANGE_TODO;
  payload: Todo;
}

interface CompleteTodo {
  type: TodoActions.COMPLETE_TODO;
  payload: {
    id: string;
    completed: boolean;
  };
}

interface RemoveTodo {
  type: TodoActions.REMOVE_TODO;
  payload: string;
}

interface RemoveAllCompleted {
  type: TodoActions.REMOVE_ALL_COMPLETED;
}

export type TodoAction =
  | GetTodo
  | TodoError
  | AddTodo
  | ChangeTodo
  | CompleteTodo
  | RemoveTodo
  | TodoLoading
  | RemoveAllCompleted;
