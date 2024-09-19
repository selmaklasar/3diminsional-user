
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isloading: false,
  iserror: {
    message: '', // Holds the error message
    state: false, // Holds the error status
  },

};

const loading_error = createSlice({
  name: 'loading and error',
  initialState,
  reducers: {
    setIsLoading: (state, action) => {
      state.isloading = action.payload;
    },

    setIserror: (state, action) => {
        state.iserror = {
          message: action.payload.message, // Set the error message
          state: action.payload.state,     // Set the error state (true/false)
        };
      },
  
  },
});

export const { setIsLoading,setIserror } = loading_error.actions;

export default loading_error.reducer;
