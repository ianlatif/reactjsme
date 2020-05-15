import Get from "../../action/get";
import Post from "../../action/post";
import Cookies from "js-cookie";
import Axios from "axios";
import store from "../../store";
import { Dispatch } from "redux";

export const loginProtected = () => {
  return async (dispatch: Dispatch) => {
    dispatch({
      type: "LOGIN_PROTECTED_LOADING",
      payload: true,
    });

    const payload = await Get({
      url: "/auth/admin/protected",
      disabledMessage: true,
    });

    if (payload && payload.data) {
      dispatch({
        type: "LOGIN_PROTECTED",
        payload: true,
      });
    } else {
      dispatch({
        type: "LOGIN_PROTECTED",
        payload: false,
      });
    }

    setTimeout(() => {
      dispatch({
        type: "LOGIN_PROTECTED_LOADING",
        payload: false,
      });
    }, 1000);
  };
};

export const RefreshToken = async () => {
  store.dispatch({
    type: "LOGIN_PROTECTED_LOADING",
    payload: true,
  });
  Post(
    {
      url: "/auth/refresh_token",
      disabledMessage: true,
      values: {
        refresh_token: Cookies.get("refresh_token"),
      },
    },
    (payload) => {
      Axios.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${payload.data.access_token}`;

      store.dispatch({
        type: "LOGIN_PROTECTED",
        payload: true,
      });
    }
  );
};
