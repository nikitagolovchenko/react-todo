import { Box, IconButton, TextField } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addTodoAction } from '../store/actions/todoActions';

export interface NewTodo {
  text: string;
  completed: boolean;
}

const TodoForm: React.FC = () => {
  const dispatch = useDispatch();
  const [text, setText] = useState<string>('');

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setText(e.target.value);
  };

  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (text !== '') {
      const todoObj: NewTodo = {
        text: text,
        completed: false,
      };
      dispatch(addTodoAction(todoObj));
      setText('');
    }
  };

  return (
    <form noValidate autoComplete='off' onSubmit={submitHandler}>
      <Box display='flex' alignItems='flex-start' mb={3}>
        <Box flexGrow='1'>
          <TextField
            label='Todo Text'
            multiline
            rowsMax={7}
            fullWidth
            value={text}
            onChange={changeHandler}
          />
        </Box>
        <IconButton type='submit'>
          <AddIcon />
        </IconButton>
      </Box>
    </form>
  );
};

export default TodoForm;
