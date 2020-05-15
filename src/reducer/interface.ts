import { Action } from "redux";

export interface ReducerAction extends Action {
  payload: any;
}
