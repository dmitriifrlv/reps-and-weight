import { configureStore } from "@reduxjs/toolkit";
import { rnwApi } from "./service";

const store = configureStore({
  reducer: {
    [rnwApi.reducerPath]: rnwApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(rnwApi.middleware),
});

export { store };

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
