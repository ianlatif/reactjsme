import Get from "../../action/get";
import { Dispatch } from "redux";

export const getPartner = (query: string) => {
  return async (dispatch: Dispatch) => {
    const payload = await Get({
      url: "/partner/list",
      query,
    });

    if (!payload.data) return;

    dispatch({
      type: "GET_PARTNER",
      payload: payload.data,
    });
  };
};

// get partner detail fors user & devices
export const getPartnerDetail = (url: string, query?: string) => {
  return async (dispatch: Dispatch) => {
    const payload = await Get({
      url: url,
      query,
    });

    if (!payload.data) return;

    dispatch({
      type: "GET_PARTNER_DETAIL",
      payload: payload.data,
    });
  };
};
