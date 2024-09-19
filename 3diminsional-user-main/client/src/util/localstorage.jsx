export const saveStateToSessionStorage = (state) => {
  try {
    const stateToSave = {
      model: state.model,          
      image_2d_part: state.image_2d_part, 
     
      decalposition: state.decalposition,
  
    };

    const serializedState = JSON.stringify(stateToSave);
    sessionStorage.setItem('state', serializedState);
  } catch (err) {
    console.error("Error saving state to sessionStorage", err);
  }
};
