
import { store } from "./redux/store/store";
import Routing from "./Routing/Routing";
import { Provider } from 'react-redux';


function App() {

  return (
    <>

   <Provider store={store}>
      <Routing />
    
      </Provider>

    </>
  );
}

export default App;
