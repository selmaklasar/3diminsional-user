import { configureStore } from '@reduxjs/toolkit';
import modelReducer from '../slice/model_slice';
import model_parts from '../slice/model_parts';
import decal_image from '../slice/decal_image';
import decal_image_position from '../slice/decal_image_position';
import image_2d_part from '../slice/2d_image_partselect';
import authenication from '../slice/login_slice'
import { saveStateToSessionStorage } from '../../util/localstorage';
import { loadStateFromSessionStorage } from '../../util/load_localstorage';
import print_modal from '../slice/print_modal/print_modal';
import orbital_control_stop from '../slice/print_modal/orbital_control_stop';
import loadingError from '../slice/loading-error/loading-error';
import text from '../slice/text_slice/text';
import indexSelect from '../slice/text_slice/index-select';
import back_text from '../slice/text_slice/back_text';

const preloadedState = loadStateFromSessionStorage();

export const store = configureStore({
  reducer: {
    model: modelReducer,
    modelparts: model_parts,
    decalimage: decal_image,
    decalposition: decal_image_position,
    image_2d_part: image_2d_part,
    authenication:authenication,
    print_modal:print_modal,
    orbital_control:orbital_control_stop,
    loadingError:loadingError,
    text:text,
    indexSelect:indexSelect,
    back_text:back_text,
  },
  preloadedState,
});

store.subscribe(() => {
  saveStateToSessionStorage(store.getState());
});

// Optional: If you want to reset the session storage on page unload
window.addEventListener('beforeunload', () => {
  sessionStorage.removeItem('sessionActive');
});
