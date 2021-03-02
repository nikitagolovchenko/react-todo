import { TodoState, TodoAction, TodoActions } from '../types';

const initialState: TodoState = {
  todos: null,
  loading: false,
  error: null,
};

const todoReducer = (state: TodoState = initialState, action: TodoAction) => {
  switch (action.type) {
    case TodoActions.TODO_LOADING:
      return { ...state, loading: true, error: null };

    case TodoActions.TODO_ERROR:
      return { ...state, error: action.payload, loading: false };

    case TodoActions.GET_TODO:
      return { ...state, todos: action.payload, loading: false };

    case TodoActions.COMPLETE_TODO:
      return {
        ...state,
        loading: false,
        todos: state.todos
          ? state.todos?.map((el) => {
              if (el.id === action.payload.id) {
                return { ...el, completed: action.payload.completed };
              }

              return el;
            })
          : null,
      };

    case TodoActions.REMOVE_TODO:
      return {
        ...state,
        loading: false,
        todos: state.todos
          ? state.todos.filter((el) => el.id !== action.payload)
          : null,
      };

    case TodoActions.REMOVE_ALL_COMPLETED:
      return {
        ...state,
        loading: false,
        todos: state.todos ? state.todos.filter((el) => !el.completed) : null,
      };

    case TodoActions.ADD_TODO:
      return {
        ...state,
        loading: false,
        todos: state.todos ? [...state.todos, action.payload] : null,
      };
    default:
      return state;
  }
};

export default todoReducer;
