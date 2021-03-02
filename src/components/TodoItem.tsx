import {
  IconButton,
  ListItem,
  ListItemIcon,
  ListItemSecondaryAction,
  ListItemText,
} from '@material-ui/core';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked';
import DeleteIcon from '@material-ui/icons/Delete';
import React from 'react';
import useStyles from '../styles';
import { Todo } from '../store/types';

interface TodoItemProps extends Todo {
  completeTodo: (id: string) => void;
  deleteTodo: (id: string) => void;
}

const TodoItem: React.FC<TodoItemProps> = ({
  id,
  completed,
  text,
  completeTodo,
  deleteTodo,
}) => {
  const classes = useStyles();

  return (
    <ListItem
      className={`${classes.todoItem}  ${completed ? 'completed' : ''}`}
    >
      <ListItemIcon>
        <IconButton
          aria-label='toggle'
          color='primary'
          onClick={() => completeTodo(id)}
        >
          {completed ? <CheckCircleIcon /> : <RadioButtonUncheckedIcon />}
        </IconButton>
      </ListItemIcon>
      <ListItemText primary={text} />
      <ListItemSecondaryAction>
        <IconButton edge='end' aria-label='delete' color='secondary' onClick={() => deleteTodo(id)}>
          <DeleteIcon />
        </IconButton>
      </ListItemSecondaryAction>
    </ListItem>
  );
};

export default TodoItem;
