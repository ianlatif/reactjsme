import axios, { AxiosError } from "axios";
import { API_URL, LANG } from "../config/api";
import { message } from "antd";
import { RefreshToken } from "../containers/Login/action";

interface GetProps {
  url: string;
  query?: string;
  disabledMessage?: boolean;
  onError?: (payload: AxiosError | number) => void;
}

const Get = async (
  { url, disabledMessage, query, onError }: GetProps,
  callback?: (obj?: any) => any
) => {
  try {
    const create = await axios.get(
      API_URL + url + `?lang=${LANG}${query ? `&${query}` : ""}`,
      {
        withCredentials: true,
      }
    );
    const results = create;
    const { data, status } = results;

    if (!callback) {
      return data;
    }

    if (status === 200) {
      callback(data);
    }

    if (status === 204) {
      if (onError) {
        onError(204);
      }
    }
    return data;
  } catch (e) {
    if (!e.response) {
      message.error("Doesn't have connection");
      localStorage.removeItem("refresh_token");
      localStorage.removeItem("access_token");
      return;
    }

    if (onError) {
      onError(e);
    }

    const { data, status } = e.response;

    if (status === 401) {
      RefreshToken();
      return;
    }

    if (!disabledMessage) {
      message.error(typeof data.msg === "string" ? data.msg : data.msg["en"]);
    }

    return data;
  }
};

export default Get;
