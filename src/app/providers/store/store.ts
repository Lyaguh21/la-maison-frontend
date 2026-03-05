import { configureStore } from "@reduxjs/toolkit";
import { listenerMiddleware, registerListeners } from "./listenersMiddleware";
import { authReducer } from "@/features/auth";

export const store = configureStore({
  //? Подключение слайсов
  reducer: {
    auth: authReducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().prepend(listenerMiddleware.middleware),

  //? Предзагруженные состояния
  preloadedState: {
    // settings: loadSettingsState(),
  },
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
