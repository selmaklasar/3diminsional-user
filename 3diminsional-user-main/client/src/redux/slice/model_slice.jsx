
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  routeModelSelected: "tshirt",
};

const modelSlice = createSlice({
  name: 'model',
  initialState,
  reducers: {
    setRouteModelSelected: (state, action) => {
      state.routeModelSelected = action.payload;
    },
    resetState() {
      return initialState;
    },
  },
});

export const { setRouteModelSelected,resetState } = modelSlice.actions;

export default modelSlice.reducer;
