import { Box, Button, List, Typography } from '@material-ui/core';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  changeTodoAction,
  completeTodoAction,
  deleteAllCompletedAction,
  deleteTodoAction,
} from '../store/actions/todoActions';
import { RootState } from '../store/reducers/rootReducer';
import { Todo } from '../store/types';
import TodoItem from './TodoItem';

const TodoList: React.FC = () => {
  const dispatch = useDispatch();
  const todo = useSelector((state: RootState) => state.todo);

  const completeTodo = (id: string): void => {
    dispatch(completeTodoAction(id));
  };

  const deleteTodo = (id: string): void => {
    dispatch(deleteTodoAction(id));
  };

  const deleteAllCompleted = (): void => {
    dispatch(deleteAllCompletedAction());
  };

  const changeTodo = (id: string, text: string): void => {
    dispatch(changeTodoAction(id, text));
  };

  return (
    <>
      <List>
        {todo.todos?.map((el: Todo) => {
          return (
            <TodoItem
              {...el}
              key={el.id}
              completeTodo={completeTodo}
              deleteTodo={deleteTodo}
              changeTodo={changeTodo}
            />
          );
        })}
      </List>

      {todo.todos?.find(el => el.completed) ? (
        <Box textAlign='right' py={2}>
          <Button variant='outlined' size='small' onClick={deleteAllCompleted}>
            Delete all completed todos
          </Button>
        </Box>
      ) : null}

      {todo.todos?.find(el => !el.completed) ? (
        <Box textAlign='center' py={2}>
          <Typography variant='overline'>
            To change the todo double click on the item
          </Typography>
        </Box>
      ) : null}
    </>
  );
};

export default TodoList;
