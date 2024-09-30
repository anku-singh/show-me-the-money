import { configureStore } from "@reduxjs/toolkit";
import dataReducer from "./dataReducer";
import { createLogger } from "redux-logger";

const logger = createLogger();

const store = configureStore({
  reducer: {
    data: dataReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
