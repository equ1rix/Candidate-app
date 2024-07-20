import { User, SET_USER } from './actions';

export interface AppState {
  user: User | null;
}

const initialState: AppState = {
  user: null
};

const userReducer = (state = initialState, action: any): AppState => {
  switch (action.type) {
    case SET_USER:
      return {
        ...state,
        user: action.payload.user
      };
    default:
      return state;
  }
};

export default userReducer;
