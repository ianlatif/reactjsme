import axios from "axios";
import { objectToFormData } from "object-to-formdata";
import { API_URL, LANG } from "../config/api";
import { message } from "antd";

interface PutProps {
  url: string;
  values?: Record<string, any>;
  type?: string;
  disabledMessage?: boolean;
}

const Put = async (
  { url, values, type, disabledMessage }: PutProps,
  callback?: (obj?: any) => any
) => {
  let body = values;
  switch (type) {
    case "form":
      body = objectToFormData(values);
      break;
  }

  try {
    const create = await axios.put(API_URL + url + `?lang=${LANG}`, body, {
      withCredentials: true,
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
    if (!disabledMessage && data.msg) {
      message.error(typeof data.msg === "string" ? data.msg : data.msg["en"]);
    }
  }
};

export default Put;
