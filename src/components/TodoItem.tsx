import {
  IconButton,
  ListItem,
  ListItemIcon,
  ListItemSecondaryAction,
  ListItemText,
  Box,
  TextField,
  ButtonGroup,
  Button,
} from '@material-ui/core';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import DoneIcon from '@material-ui/icons/Done';
import CloseIcon from '@material-ui/icons/Close';
import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked';
import DeleteIcon from '@material-ui/icons/Delete';
import React, { useState } from 'react';
import useStyles from '../styles';
import { Todo } from '../store/types';
import { CSSTransition } from 'react-transition-group';

interface TodoItemProps extends Todo {
  completeTodo: (id: string) => void;
  deleteTodo: (id: string) => void;
  changeTodo: (id: string, text: string) => void;
}

const TodoItem: React.FC<TodoItemProps> = ({
  id,
  completed,
  text,
  completeTodo,
  deleteTodo,
  changeTodo,
}) => {
  const classes = useStyles();
  const [inputText, setInputText] = useState<string>(text);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const textRef = React.useRef(null);
  const inputRef = React.useRef(null);

  const doubleClickHandler = () => {
    if (!completed) {
      setIsOpen(!isOpen);
    }
  };

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputText(e.target.value);
  };

  const closeHandler = () => {
    setInputText(text);
    setIsOpen(false);
  };

  const setChangeHandler = () => {
    if (inputText !== '') {
      changeTodo(id, inputText);
      setIsOpen(false);
    }
  };

  const completeHandler = () => {
    setInputText(text);
    setIsOpen(false);
    completeTodo(id);
  };

  return (
    <ListItem
      className={`${classes.todoItem}  ${completed ? 'completed' : ''}`}
    >
      <ListItemIcon>
        <IconButton
          aria-label='toggle'
          color='primary'
          onClick={completeHandler}
        >
          {completed ? <CheckCircleIcon /> : <RadioButtonUncheckedIcon />}
        </IconButton>
      </ListItemIcon>

      <Box
        position='relative'
        flexGrow='1'
        height='100%'
        minHeight='40px'
        display='flex'
        alignItems='center'
      >
        <CSSTransition
          in={isOpen}
          timeout={1000}
          unmountOnExit
          nodeRef={inputRef}
          classNames={{
            enter: classes.fadeEnter,
            enterActive: classes.fadeEnterActive,
            exit: classes.fadeExit,
            exitActive: classes.fadeExitActive,
          }}
        >
          <div className={classes.inputHolder} ref={inputRef}>
            <Box flexGrow='1'>
              <TextField
                value={inputText}
                onChange={changeHandler}
                variant='outlined'
                fullWidth
                size='small'
              />
            </Box>
            <ButtonGroup
              variant='contained'
              color='primary'
              size='small'
              className={classes.btnGroup}
            >
              <Button onClick={setChangeHandler}>
                <DoneIcon />
              </Button>
              <Button onClick={closeHandler}>
                <CloseIcon />
              </Button>
            </ButtonGroup>
          </div>
        </CSSTransition>

        <CSSTransition
          in={!isOpen}
          timeout={1000}
          unmountOnExit
          nodeRef={textRef}
          classNames={{
            enter: classes.fadeEnter,
            enterActive: classes.fadeEnterActive,
            exit: classes.fadeExit,
            exitActive: classes.fadeExitActive,
          }}
        >
          <div className={classes.textHolder} ref={textRef} onDoubleClick={doubleClickHandler}>
            <ListItemText primary={text} />
          </div>
        </CSSTransition>
      </Box>

      <ListItemSecondaryAction>
        <IconButton
          edge='end'
          aria-label='delete'
          color='secondary'
          onClick={() => deleteTodo(id)}
        >
          <DeleteIcon />
        </IconButton>
      </ListItemSecondaryAction>
    </ListItem>
  );
};

export default TodoItem;
