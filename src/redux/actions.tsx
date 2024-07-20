export const REDUCER_NAME = 'USER';
export const SET_USER = `${REDUCER_NAME}/SET_USER`;

export interface User {
  id: string;
  email: string | null;
  name: string | null;
  role?: string;
}

export const setUsers = (user: User | null) => ({
  type: SET_USER,
  payload: {
    user
  }
});
