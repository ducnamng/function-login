import { LOGIN_FAILED, LOGIN_SUCCESS, LOGOUT } from "./actions";

export interface AuthState {
  authenticated: boolean;
  error: string | null;
  currentUser?: object;
}

export interface AuthActions {
  type: string;
  payload?: string;
}

const currentUser = {
  id: "",
  username: "",
};
const initialState: AuthState = {
  authenticated: false,
  error: "",
  currentUser: currentUser,
};

const authReducer = (state = initialState, action: AuthActions) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return {
        ...state,
        authenticated: true,
        currentUser: action.payload,
      };
    case LOGIN_FAILED:
      return {
        ...state,
        error: action.payload,
      };
    case LOGOUT:
      return {
        ...state,
        authenticated: false,
        currentUser: undefined,
      };
    default:
      return state;
  }
};

export default authReducer;
