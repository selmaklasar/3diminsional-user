import { store } from '../redux/store/store';
import { resetState as resetDecalImageState } from '../redux/slice/decal_image';
import { resetState as resetModelState } from '../redux/slice/model_slice';
import { resetState as resetModelPartsState } from '../redux/slice/model_parts';
import { resetState as resetDecalImagePositionState } from '../redux/slice/decal_image_position';
import { resetState as reset2DImagePartState } from '../redux/slice/2d_image_partselect';

export const resetReduxState = () => {
  store.dispatch(resetDecalImageState());
  store.dispatch(resetModelState());
  store.dispatch(resetModelPartsState());
  store.dispatch(resetDecalImagePositionState());
  store.dispatch(reset2DImagePartState());
  //store.dispatch(resetMaterial());
};
