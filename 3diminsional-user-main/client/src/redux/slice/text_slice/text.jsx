import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  texts: [],
};

const textSlice = createSlice({
  name: 'text3d',
  initialState,
  reducers: {
    addText: (state, action) => {
     
      state.texts.push(action.payload);
    },
    updateText: (state, action) => {
      const { index, newText } = action.payload;
     
      if (index >= 0 && index < state.texts.length) {
        state.texts[index] = { ...state.texts[index], ...newText };
      }
    },
    removeText: (state, action) => {
      const index = action.payload;
     
      if (index >= 0 && index < state.texts.length) {
        state.texts.splice(index, 1);
      }
    },
    clearTexts: (state) => {
     
      state.texts = [];
    },
  },
});

export const { addText, updateText, removeText, clearTexts } = textSlice.actions;

export default textSlice.reducer;
