import thunk from "redux-thunk";
import { applyMiddleware, compose, createStore } from "redux";
import promise from "redux-promise-middleware";
import { createLogger } from "redux-logger";
import allRedducers from "./reducer/reducer";

const loggerMiddleware = createLogger();

const allStoreEnhancers = compose(
  process.env.NODE_ENV === "production"
    ? applyMiddleware(promise, thunk)
    : applyMiddleware(promise, thunk, loggerMiddleware)
);
const store = createStore(allRedducers, allStoreEnhancers);

export default store;
