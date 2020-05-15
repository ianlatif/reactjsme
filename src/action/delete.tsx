import axios from "axios";
import { API_URL, LANG } from "../config/api";
import { message } from "antd";

interface DeleteProps {
  url: string;
  type?: string;
  values?: Record<string, any>;
  disabledMessage?: boolean;
}

const Delete = async (
  { url, type, values, disabledMessage }: DeleteProps,
  callback?: (obj?: any) => any
) => {
  try {
    const create = await axios.delete(API_URL + url + `?lang=${LANG}`, {
      withCredentials: true,
      data: values,
    });
    const results = await create;
    const { data, status } = results;

    if (!callback) {
      return;
    }

    if (status === 200) {
      callback(data);
    }
  } catch (e) {
    if (!e.response) {
      message.error("Doesn't have connection");
      return;
    }
    const { data } = e.response;
    if (!disabledMessage) {
      message.error(typeof data.msg === "string" ? data.msg : data.msg["en"]);
    }
  }
};

export default Delete;
