import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  texts_back: [],
};

const textSlice_back = createSlice({
  name: 'text3d_back',
  initialState,
  reducers: {
    addText_back: (state, action) => {
      state.texts_back.push(action.payload);
    },
    updateText_back: (state, action) => {
      const { index, newText } = action.payload;
      if (index >= 0 && index < state.texts_back.length) {
        state.texts_back[index] = { ...state.texts_back[index], ...newText };
      }
    },
    removeText_back: (state, action) => {
      const index = action.payload;
      if (index >= 0 && index < state.texts_back.length) {
        state.texts_back.splice(index, 1);
      }
    },
    clearTexts_back: (state) => {
      state.texts_back = [];
    },
  },
});

export const { addText_back, updateText_back, removeText_back, clearTexts_back } = textSlice_back.actions;

export default textSlice_back.reducer;
