import { createContext } from 'react';
import { CurrentUserFragment } from './api/graphql/api';

export interface ContextState {
  currentUser?: CurrentUserFragment;
  isAuth: boolean;
}

export type MainContextType = {
  state: ContextState;
  dispatch: React.Dispatch<any>;
};
export const initialState: ContextState = {
  isAuth: false,
};

const MainContext = createContext<MainContextType>({
  state: initialState,
  dispatch: () => null,
});
export default MainContext;
