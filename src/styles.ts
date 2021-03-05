import { makeStyles, Theme } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) => ({
  todoItem: {
    '&.completed': {
      textDecoration: 'line-through',
    },
  },
  inputHolder: {
    display: 'flex',
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    minHeight: '100%'
  },
  btnGroup: {
    minHeight: '100%',
    marginLeft: theme.spacing(1)
  },
  fadeEnter: {
    opacity: 0,
  },
  fadeEnterActive: {
    opacity: 1,
    transition: 'opacity 500ms 500ms',
  },
  fadeExit: {
    opacity: 1,
  },
  fadeExitActive: {
    opacity: 0,
    transition: 'opacity 500ms'
  },
  textHolder: {
    width: '100%'
  }
}));

export default useStyles;
