
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  decal_image_position: {},
  decal_image_position_right:{},
  decal_image_position_back:{},
  decal_image_position_left:{},
 
};

const decalPosition = createSlice({
  name: 'decal_position',
  initialState,
  reducers: {
    setDecal_image_position: (state, action) => {
      state.decal_image_position ={ ...state.decal_image_position, ...action.payload };
    }, 
    
    setDecal_image_position_right: (state, action) => {
      state.decal_image_position_right ={ ...state.decal_image_position_right, ...action.payload };
    },
    setDecal_image_position_back: (state, action) => {
      state.decal_image_position_back ={ ...state.decal_image_position_back, ...action.payload };
    }, setDecal_image_position_left: (state, action) => {
      state.decal_image_position_left ={ ...state.decal_image_position_left, ...action.payload };
    },
   
    resetState() {
      return initialState;
    },
   
 
  },
},





);

export const { setDecal_image_position,resetState,setDecal_image_position_right,
  setDecal_image_position_back,setDecal_image_position_left
} = decalPosition.actions;

export default decalPosition.reducer;