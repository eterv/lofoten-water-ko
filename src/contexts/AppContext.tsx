import { createContext, Dispatch, Reducer, useContext, useEffect, useReducer } from 'react';
import { User } from '@/classes/user/user.schema';
import { useGetCurrentUser } from '@/hooks/useCurrentUser';
import { FC, FCProps } from '@/lib/types';

type Props = {
  initialState?: Partial<AppState>;
};

type AppState = {
  currentUser: User | null | undefined;
  loaded: boolean;
  test1: string;
};
export type AppDispatchAction =
  | { type: 'SET_CURRENT_USER'; user: AppState['currentUser'] }
  | { type: 'SET_LOADED' }
  | { type: 'TEST1'; text: AppState['test1'] };
type AppDispatch = Dispatch<AppDispatchAction>;

const AppStateContext = createContext<AppState | null>(null);
const AppDispatchContext = createContext<AppDispatch | null>(null);

function appReducer(state: AppState, action: AppDispatchAction): AppState {
  switch (action.type) {
    case 'SET_CURRENT_USER':
      return { ...state, currentUser: action.user };
    case 'SET_LOADED':
      return { ...state, loaded: true };
    case 'TEST1':
      // test action (example)
      return { ...state, test1: action.text };
    default:
      throw new Error('Unhandled action');
  }
}

export const AppProvider: FC<Props> = ({ children, initialState }: FCProps<Props>) => {
  const defaults: AppState = {
    currentUser: undefined,
    loaded: false,
    test1: '',
  };
  const initial = initialState ? { ...defaults, ...initialState } : defaults;
  const [state, dispatch] = useReducer<Reducer<AppState, AppDispatchAction>>(appReducer, initial);

  // Get current user data
  const user = useGetCurrentUser(dispatch);

  useEffect(() => {
    if (typeof user !== 'undefined') {
      dispatch({ type: 'SET_LOADED' });
    }
  }, [user]);

  return (
    <AppStateContext.Provider value={state}>
      <AppDispatchContext.Provider value={dispatch}>{children}</AppDispatchContext.Provider>
    </AppStateContext.Provider>
  );
};

export function useAppState(): AppState {
  const state = useContext(AppStateContext);
  if (!state) throw new Error('AppProvider not found');
  return state;
}

export function useAppDispatch(): Dispatch<AppDispatchAction> {
  const dispatch = useContext(AppDispatchContext);
  if (!dispatch) throw new Error('AppProvider not found');
  return dispatch;
}
