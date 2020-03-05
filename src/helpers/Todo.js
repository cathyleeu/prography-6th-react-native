import React, {createContext, useContext, useReducer} from 'react';

const StateContext = createContext();
const DispatchContext = createContext();

function todosReducer(state, action) {
  switch (action.type) {
    case 'ADD':
      return state.concat({
        id: new Date().getTime(),
        task: action.task,
        edit: false,
        done: false,
      });
    case 'EDIT':
      return state.map(todo =>
        todo.id === action.id
          ? {
              ...todo,
              edit: !todo.edit,
              task: action.task ? action.task : todo.task,
            }
          : todo,
      );
    case 'DEL':
      return state.filter(todo => todo.id !== action.id);
    case 'DONE':
      return state.map(todo =>
        todo.id === action.id ? {...todo, done: !todo.done} : todo,
      );
    case 'UPDATE':
      return state.map(todo =>
        todo.id === action.id
          ? {
              ...todo,
              done: false,
              edit: false,
              task: action.task ? action.task : todo.task,
            }
          : todo,
      );
    default:
      break;
  }
}

export function useCustomState() {
  const state = useContext(StateContext);
  if (!state) {
    throw new Error('No Provider');
  }
  return state;
}

export function useCustomDispatch() {
  const dispatch = useContext(DispatchContext);
  if (!dispatch) {
    throw new Error('No Provider');
  }
  return dispatch;
}

export function CustomContextProvider({children}) {
  const [state, dispatch] = useReducer(todosReducer, []);
  return (
    <DispatchContext.Provider value={dispatch}>
      <StateContext.Provider value={state}>{children}</StateContext.Provider>
    </DispatchContext.Provider>
  );
}
