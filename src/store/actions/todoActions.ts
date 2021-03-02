import { NewTodo } from './../../components/TodoForm';
import { Todo, TodoAction, TodoActions } from '../types';
import { RootState } from '../reducers/rootReducer';
import { ThunkAction } from 'redux-thunk';
import { db } from '../../firebase';

export const getTodo = (): ThunkAction<void, RootState, null, TodoAction> => {
  return (dispatch) => {
    dispatch(todoLoading());

    db.collection('todos')
      .get()
      .then((querySnapshot) => {
        if (querySnapshot.size) {
          let todoArr: Todo[] = [];

          querySnapshot.forEach((doc) => {
            todoArr.push({
              id: doc.id,
              text: doc.data().text,
              completed: doc.data().completed,
            });
          });

          dispatch({
            type: TodoActions.GET_TODO,
            payload: todoArr,
          });
        } else {
          dispatch({
            type: TodoActions.GET_TODO,
            payload: null,
          });
        }
      })
      .catch((e) => {
        dispatch(todoError(e));
      });
  };
};

export const completeTodoAction = (
  id: string
): ThunkAction<void, RootState, null, TodoAction> => {
  return (dispatch) => {
    dispatch(todoLoading());

    const todoRef = db.collection('todos').doc(id);
    todoRef
      .get()
      .then((doc) => {
        if (doc.exists) {
          const completeStatus = doc.data()?.completed;

          todoRef
            .update({
              completed: !completeStatus,
            })
            .then(() => {
              dispatch({
                type: TodoActions.COMPLETE_TODO,
                payload: {
                  id,
                  completed: !completeStatus,
                },
              });
            })

            .catch((e) => {
              dispatch(todoError(e));
            });
        }
      })
      .catch((e) => {
        dispatch(todoError(e));
      });
  };
};

export const deleteTodoAction = (
  id: string
): ThunkAction<void, RootState, null, TodoAction> => {
  return (dispatch) => {
    dispatch(todoLoading());

    db.collection('todos')
      .doc(id)
      .delete()
      .then(() => {
        dispatch({
          type: TodoActions.REMOVE_TODO,
          payload: id,
        });
      })
      .catch((e) => {
        dispatch(todoError(e));
      });
  };
};

export const deleteAllCompletedAction = (): ThunkAction<
  void,
  RootState,
  null,
  TodoAction
> => {
  return (dispatch) => {
    dispatch(todoLoading());

    db.collection('todos')
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          if (doc.data().completed) {
            db.collection('todos')
              .doc(doc.id)
              .delete()
              .catch((e) => {
                dispatch(todoError(e));
              });
          }
        });
      })
      .then(() => {
        dispatch({
          type: TodoActions.REMOVE_ALL_COMPLETED,
        });
      })
      .catch((e) => {
        dispatch(todoError(e));
      });
  };
};

export const addTodoAction = ({
  text,
  completed,
}: NewTodo): ThunkAction<void, RootState, null, TodoAction> => {
  return (dispatch) => {
    dispatch(todoLoading());

    db.collection('todos')
      .add({
        text,
        completed,
      })
      .then((docRef) => {
        docRef.get().then((doc) => {
          if (doc !== undefined) {
            const newTodo:Todo = {
              id: doc.id,
              text: String(doc?.data()?.text),
              completed: Boolean(doc?.data()?.completed),
            }
            dispatch({
              type: TodoActions.ADD_TODO,
              payload: newTodo,
            });
          }
        });
      })
      .catch((e) => {
        dispatch(todoError(e));
      });
  };
};

export const todoLoading = (): TodoAction => {
  return {
    type: TodoActions.TODO_LOADING,
  };
};

export const todoError = (e: any): TodoAction => {
  return {
    type: TodoActions.TODO_ERROR,
    payload: e.message,
  };
};
