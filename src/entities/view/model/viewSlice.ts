import { IDish } from "@/entities/dish";
import { createSlice } from "@reduxjs/toolkit";

export interface ViewState {
  ui: {
    openedDishInfoModal: boolean;
    openedReservationPanel: boolean;
  };
  selectedDish: IDish | null;
}

const initialState: ViewState = {
  ui: {
    openedDishInfoModal: false,
    openedReservationPanel: false,
  },
  selectedDish: null,
};

export const viewSlice = createSlice({
  name: "view",
  initialState,
  reducers: {
    setOpenDishInfoModal: (state, action) => {
      state.ui.openedDishInfoModal = action.payload;
    },
    setSelectedDish: (state, action) => {
      state.selectedDish = action.payload;
    },
    setOpenReservationPanel: (state, action) => {
      state.ui.openedReservationPanel = action.payload;
    },
  },
});

export const {
  setOpenDishInfoModal,
  setSelectedDish,
  setOpenReservationPanel,
} = viewSlice.actions;
export const viewReducer = viewSlice.reducer;
