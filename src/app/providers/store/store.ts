import { configureStore } from "@reduxjs/toolkit";
import { listenerMiddleware, registerListeners } from "./listenersMiddleware";

import { baseApi } from "@/shared/api";
import { userSlice } from "@/entities/user/model/userSlice";

export const store = configureStore({
  //? Подключение слайсов
  reducer: {
    user: userSlice.reducer,

    [baseApi.reducerPath]: baseApi.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().prepend(
      baseApi.middleware,
      listenerMiddleware.middleware,
    ),
});

export type _RootState = ReturnType<typeof store.getState>;
export type _AppDispatch = typeof store.dispatch;

declare global {
  type RootState = _RootState;
  type AppDispatch = _AppDispatch;
}
registerListeners();
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
