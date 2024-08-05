import { createAction, createReducer } from '@reduxjs/toolkit';

export interface User {
  id: string;
  email: string | null;
  name: string | null;
  role?: string;
}
export interface AppState {
  user: User | null;
}

const initialState: AppState = {
  user: null
};

export const signInAction = createAction<User>('signIn');
export const logOutAction = createAction('logOut');

export default createReducer(initialState, (builder) => {
  builder.addCase(signInAction, (state, action) => {
    state.user = action.payload;
  });
  builder.addCase(logOutAction, (state) => {
    state.user = null;
  });
});
