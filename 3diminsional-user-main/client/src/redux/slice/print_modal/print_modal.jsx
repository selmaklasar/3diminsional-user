
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isprint_modal: false,

};

const print_modal = createSlice({
  name: 'print modal',
  initialState,
  reducers: {
    setIsprint_modal: (state, action) => {
      state.isprint_modal = action.payload;
    },
  
  
  },
});

export const { setIsprint_modal } = print_modal.actions;

export default print_modal.reducer;
