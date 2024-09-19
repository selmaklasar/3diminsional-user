import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Home from '../pages/HomeScreen/Home';


import SignUpScreen from '../pages/SignUpScreen/SignUpScreen';

import ProductScreen3 from '../pages/productscreen3/productscreen';
import React, { createContext, useState } from 'react';
import { store } from '../redux/store/store';
import { Provider, useSelector } from 'react-redux';
import LoginScreen from '../pages/LoginScreen/loginscreen';
import PrivateRoute from '../private_route/private-route';



const Routing = () => {

  return (<>
    <Provider store={store}>
      <Router>
        <Routes>
          <Route index element={<LoginScreen />} />
          <Route path="/signup" element={<SignUpScreen />} />
          <Route 
            path="/home" 
            element={
              <PrivateRoute>
                <Home />
              </PrivateRoute>
            } 
          />
         
         
 <Route 
            path="/productscreen3" 
            element={
              <PrivateRoute>
                <ProductScreen3 />
              </PrivateRoute>
            } 
          />
          

         
        </Routes>
      </Router>
      </Provider>
      
      </>
  );
};

export default Routing;