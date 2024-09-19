
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  selectedPart_2d_image: "F",
};

const image_2d_part = createSlice({
  name: '2dimage_part_select',
  initialState,
  reducers: {
    setSelectedPart_2d_image: (state, action) => {
      state.selectedPart_2d_image = action.payload;
    },
    resetState() {
      return initialState;
    },
  },
});

export const { setSelectedPart_2d_image,resetState } = image_2d_part.actions;

export default image_2d_part.reducer;
