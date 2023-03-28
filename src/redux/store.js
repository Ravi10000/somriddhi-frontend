import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./user/user.reducer";
import flashReducer from "./flash/flash.reducer";
import logger from "redux-logger";

const store = configureStore({
  reducer: { user: userReducer, flash: flashReducer },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});
// import { createStore, applyMiddleware } from "redux";
// import logger from "redux-logger";
// import rootReducer from "./rootReducer";

// const middlewares = [];

// if (process.env.NODE_ENV === "development") middlewares.push(logger);
// const store = createStore(rootReducer, applyMiddleware(...middlewares));

export default store;
