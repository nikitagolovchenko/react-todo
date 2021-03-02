import { makeStyles, Theme } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) => ({
  todoItem: {
    '&.completed': {
      textDecoration: 'line-through',
    },
  },
}));

export default useStyles;
