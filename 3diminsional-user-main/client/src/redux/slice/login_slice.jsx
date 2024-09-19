
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isAutheniticated: false,

};

const authenication = createSlice({
  name: 'authenication',
  initialState,
  reducers: {
    setAuthenication: (state, action) => {
      state.isAutheniticated = action.payload;
    },
  
  
  },
});

export const { setAuthenication } = authenication.actions;

export default authenication.reducer;
