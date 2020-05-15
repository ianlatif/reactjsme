import Get from "../../action/get";
import { Dispatch } from "redux";

export const getUser = (query?: string) => {
  return async (dispatch: Dispatch) => {
    const payload = await Get({
      url: "/partner/all/user/list",
      query,
      disabledMessage: true,
    });

    if(!payload.data) return

    dispatch({
      type: "GET_USER",
      payload: payload.data,
    });
  };
};

