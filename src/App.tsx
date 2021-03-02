import { Box, LinearProgress } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';
import Wrapper from './components/Wrapper';
import { getTodo } from './store/actions/todoActions';
import { RootState } from './store/reducers/rootReducer';

const App: React.FC = () => {
  const dispatch = useDispatch();
  const todo = useSelector((state: RootState) => state.todo);

  useEffect(() => {
    dispatch(getTodo());

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Wrapper>
      {todo.loading && (
        <Box position='fixed' top='0' left='0' width='100%' zIndex='modal'>
          <LinearProgress />
        </Box>
      )}

      <TodoForm />

      {todo.error && (
        <Box py={1}>
          <Alert severity='error'>{todo.error}</Alert>
        </Box>
      )}
      {!todo.todos?.length && (
        <Box py={1}>
          <Alert severity='info'>You don't have a todo list!</Alert>
        </Box>
      )}
      <TodoList />
    </Wrapper>
  );
};

export default App;
