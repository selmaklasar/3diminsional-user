
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isorbital_control: true,

};

const orbital_control = createSlice({
  name: 'orbital control',
  initialState,
  reducers: {
    setIsorbital_control: (state, action) => {
      state.isorbital_control = action.payload;
    },
  
  
  },
});

export const { setIsorbital_control } = orbital_control.actions;

export default orbital_control.reducer;
