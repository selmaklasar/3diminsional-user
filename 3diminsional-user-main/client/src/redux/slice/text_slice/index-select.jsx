import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  index_selected:null,
};

const indexselected= createSlice({
  name: 'index selection',
  initialState,
  reducers: {
    setSelected_index: (state, action) => {
     
      state.index_selected=action.payload;
    },
    
  },
});

export const { setSelected_index} = indexselected.actions;

export default indexselected.reducer;
