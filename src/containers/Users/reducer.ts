import { UserPayload, UserState } from "./type";

export const userList = (
  state: UserState[] = [],
  action: UserPayload,
) => {
  switch (action.type) {
    case "GET_USER":
      return action.payload;
    default:
      return state;
  }
};
