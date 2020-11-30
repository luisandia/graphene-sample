import { ContextState } from './MainContext';


interface Action {
  type: string;
  payload: ContextState;
}
export default function reducer(state: ContextState, action: Action): ContextState {
  switch (action.type) {
    case 'LOGIN_USER':
      return {
        ...state,
        currentUser: action.payload.currentUser,
      };
    case 'IS_LOGGED_IN':
      return {
        ...state,
        isAuth: action.payload.isAuth,
      };
    case 'SIGNOUT_USER':
      return {
        ...state,
        isAuth: false,
        currentUser: undefined,
      };
    default:
      return state;
  }
}
