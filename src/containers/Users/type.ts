import { Action } from "redux";

export interface UserPayload extends  Action {
  payload: any;
}

export interface UserState {
  partner_id: number;
  partner_name?: string;
  profile_image?: string;
  total_devices?: number;
  is_valid?: boolean;
}
