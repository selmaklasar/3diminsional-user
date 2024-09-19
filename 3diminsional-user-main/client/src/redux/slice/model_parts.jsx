
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  selectedPart: 'front',
  selectedimage:null,
};

const modelparts = createSlice({
  name: 'modelparts',
  initialState,
  reducers: {
    setSelectedPart: (state, action) => {
      state.selectedPart = action.payload;
    },
    setSelectedimage: (state, action) => {
      state.selectedimage = action.payload;
    },
    resetState() {
      return initialState;
    },
  },
});

export const { setSelectedPart,resetState,setSelectedimage } = modelparts.actions;

export default modelparts.reducer;
