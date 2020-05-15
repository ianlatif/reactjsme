import { Action } from "redux";

interface LoginProtectedProps extends Action {
  payload: boolean;
}

export const loginLoading = (
  state: boolean = true,
  action: LoginProtectedProps
) => {
  switch (action.type) {
    case "LOGIN_PROTECTED_LOADING":
      return action.payload;
    default:
      return state;
  }
};

export const loginProtected = (
  state: boolean = true,
  action: LoginProtectedProps
) => {
  switch (action.type) {
    case "LOGIN_PROTECTED":
      return action.payload;
    default:
      return state;
  }
};
