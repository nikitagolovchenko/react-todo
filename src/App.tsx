import { Box, Chip, createMuiTheme, LinearProgress, ThemeProvider } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';
import Wrapper from './components/Wrapper';
import { getTodo } from './store/actions/todoActions';
import { RootState } from './store/reducers/rootReducer';
import WbSunnyIcon from '@material-ui/icons/WbSunny';
import Brightness2Icon from '@material-ui/icons/Brightness2';

const App: React.FC = () => {
  const dispatch = useDispatch();
  const todo = useSelector((state: RootState) => state.todo);
  const [themeMode, setThemeMode] = useState<'light' | 'dark'>('light');

  useEffect(() => {
    dispatch(getTodo());

    if (localStorage.getItem('themeMode') === 'dark') {
      setThemeMode('dark');
    } else {
      setThemeMode('light');
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const switchHandler = () => {
    let newTheme: 'light' | 'dark' = themeMode === 'light' ? 'dark' : 'light';
    setThemeMode(newTheme);
    localStorage.setItem('themeMode', newTheme);
  };

  const theme = createMuiTheme({
    palette: {
      type: themeMode,
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <Wrapper>
        <Box position='absolute' top={16} right={16}>
          <Chip
            color='primary'
            icon={themeMode === 'light' ? <WbSunnyIcon /> : <Brightness2Icon/>}
            label={themeMode === 'light' ? 'light theme' : 'dark theme'}
            onClick={switchHandler}
          />
        </Box>

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
    </ThemeProvider>
  );
};

export default App;
