import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  decal_image_Selected: [],
  dragPosition: {},
  decal_image_Selected_right: [],
  dragPosition_right: {},
  decal_image_Selected_back: [],
  dragPosition_back: {},
  decal_image_Selected_left: [],
  dragPosition_left: {},

};

const modelSlice = createSlice({
  name: 'decal_image',
  initialState,
  reducers: {
    setDecal_image_selected: (state, action) => {
      state.decal_image_Selected = [...state.decal_image_Selected, action.payload];
    },
    setDecal_image_selected_right: (state, action) => {
      state.decal_image_Selected_right = [...state.decal_image_Selected_right, ...action.payload];
    },
    setDragPosition: (state, action) => {
      state.dragPosition = { ...state.dragPosition, ...action.payload };
    },
    setDragPosition_right: (state, action) => {
      state.dragPosition_right = { ...state.dragPosition_right, ...action.payload };
    },

    setDecal_image_selected_back: (state, action) => {
      state.decal_image_Selected_back = [...state.decal_image_Selected_back, action.payload];
    },
    setDragPosition_back: (state, action) => {
      state.dragPosition_back = { ...state.dragPosition_back, ...action.payload };
    },
    setDecal_image_selected_left: (state, action) => {
      state.decal_image_Selected_left = [...state.decal_image_Selected_left, ...action.payload];
    },
    setDragPosition_left: (state, action) => {
      state.dragPosition_left = { ...state.dragPosition_left, ...action.payload };
    },

    resetState() {
      return initialState;
    },
  },
});

export const { setDecal_image_selected, setDragPosition, resetState, setDecal_image_selected_right, 
  setDragPosition_right,setDecal_image_selected_back, setDragPosition_back,
  setDecal_image_selected_left, setDragPosition_left,

} = modelSlice.actions;

export default modelSlice.reducer;