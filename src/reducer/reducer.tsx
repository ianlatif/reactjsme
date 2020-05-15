import { combineReducers } from "redux";
import { loginProtected, loginLoading } from "../containers/Login/reducer";
import { partnerList, partnerDetailList } from "../containers/Partner/reducer";
import { userList } from "../containers/Users/reducer";
const allRedducers = combineReducers({
  loginLoading,
  loginProtected,
  partnerList,
  partnerDetailList,
  userList,
});

export default allRedducers;
