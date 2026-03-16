import { ViewState } from "./viewSlice";

export const selectOpenedDishInfoModal = (state: { view: ViewState }) =>
  state.view.ui.openedDishInfoModal;
export const selectSelectedDish = (state: { view: ViewState }) =>
  state.view.selectedDish;

export const selectOpenedReservationPanel = (state: { view: ViewState }) =>
  state.view.ui.openedReservationPanel;
