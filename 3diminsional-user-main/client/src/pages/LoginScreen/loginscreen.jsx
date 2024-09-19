import React, { useState } from 'react';
import { Button, Form, Col, Container, Row } from 'react-bootstrap';

import { Link, useNavigate } from 'react-router-dom';
import axiosInstance from '../../api/axios-instances';
import CustomAlert from '../../common/custom_alert/custom-alert';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import GLTFViewer from '../../common/gltfviewer';
import { setAuthenication } from '../../redux/slice/login_slice';
import { useDispatch } from 'react-redux';
import style from './loginscreen.module.css';
const LoginScreen = () => {
  const navigate = useNavigate();
  const [passwordVisible, setPasswordVisible] = useState(false);

  const [formData, setFormData] = useState({
    
    userName: '',
    email: '',
    password: '',
    
  });
  const [message, setMessage] = useState(null);
  const [messageType, setMessageType] = useState('');
  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handlelogin = async () => {
    try {
      const response = await axiosInstance.post('/auth/login', formData);

      if (response.status === 200) {
        setMessageType('success');
        setMessage("Successfully logged in");

        navigate('/home');
      } else if (response.status === 401) {
        setMessageType('error');
        setMessage("Incorrect username or password");
      }
    } catch (error) {
      console.error('Login error:', error);
      setMessageType('error');
      setMessage("There are some issues");
    }
  };
  const handleGoogleLogin = () => {

    window.location.href = 'http://localhost:3000/api/auth/google';
  };

  return (
    <div className={`d-flex justify-content-center align-items-center ${style.signup_bg}`}>
      <Container className={`${style.signup_container}`}>
        <Row className="p-3 h-100 bg-white rounded-4 d-flex justify-content-center align-items-center shadow-sm">
          
          <Col lg={6} className={`${style.login_form}px-4`}>
            <center>
            {message && (
  <CustomAlert message={message} type={messageType} />
)}
              <h5 className={`${style.signupheading}`}>Login</h5>
            </center>
 
            <div className="form-group py-1">
              <label>User Name</label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
                className={`form-control py-2 ${style.input_field}`}
                placeholder="Enter your last name"
              />
            </div>
            <div className="form-group py-1">
              <label>Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className={`form-control py-2 ${style.input_field}`}
                placeholder="Enter your email"
              />
            </div>
            <div className="form-group py-1">
              <label>Password</label>
              <input
                type={passwordVisible ? 'text' : 'password'}
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                className={`form-control py-2 ${style.input_field}`}
                placeholder="Enter your password"
              />
            </div>
            <div className="form-check py-1 mt-1">
              <input
                className="form-check-input"
                type="checkbox"
                onClick={togglePasswordVisibility}
              />
              <label className="form-check-label">
                Show Password
              </label>
            </div>
            <Button variant="primary" className="w-100 mb-1 mt-2" onClick={handlelogin}>
              Login
            </Button>
            <div className={style.divider}>Or</div>
            <button type="button" className={`mt-2 ${style.login_google}`} onClick={handleGoogleLogin}>
              <img
                className={style.google_icon}
                src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTgiIGhlaWdodD0iMTgiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGcgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj48cGF0aCBkPSJNMTcuNiA5LjJsLS4xLTEuOEg5djMuNGg0LjhDMTMuNiAxMiAxMyAxMyAxMiAxMy42djIuMmgzYTguOCA4LjggMCAwIDAgMi42LTYuNnoiIGZpbGw9IiM0Mjg1RjQiIGZpbGwtcnVsZT0ibm9uemVybyIvPjxwYXRoIGQ9Ik05IDE4YzIuNCAwIDQuNS0uOCA2LTIuMmwtMy0yLjJhNS40IDUuNCAwIDAgMS04LTIuOUgxVjEzYTkgOSAwIDAgMCA4IDV6IiBmaWxsPSIjMzRBODUzIiBmaWxsLXJ1bGU9Im5vbnplcm8iLz48cGF0aCBkPSJNNCAxMC43YTUuNCA1LjQgMCAwIDEgMC0zLjRWNUgxYTkgOSAwIDAgMCAwIDhsMy0yLjN6IiBmaWxsPSIjRkJCQzA1IiBmaWxsLXJ1bGU9Im5vbnplcm8iLz48cGF0aCBkPSJNOSAzLjZjMS4zIDAgMi41LjQgMy40IDEuM0wxNSAyLjNBOSA5IDAgMCAwIDEgNWwzIDIuNGE1LjQgNS40IDAgMCAxIDUtMy43eiIgZmlsbD0iI0VBNDMzNSIgZmlsbC1ydWxlPSJub256ZXJvIi8+PHBhdGggZD0iTTAgMGgxOHYxOEgweiIvPjwvZz48L3N2Zz4="
                alt="Google Icon"
              />
              Sign up with Google
            </button>
            <Link to={'/signup'}>
            <button type="button" className={`mt-2 ${style.login_google}`} >
              
              Create Account
            </button>
            </Link>
          </Col>
          <Col className={`${style.canvas}`}>
          <div style={{ width: "600px", height: "500px",   backgroundColor: "#2B4136" }}
          className={`${style.canvas3d}`}>
      <Canvas>
        <ambientLight />
        <pointLight position={[10, 10, 10]} />
        <GLTFViewer modelUrl="https://3dimensionaldilu.s3.ap-south-1.amazonaws.com/falling.gltf" />
        <OrbitControls />
      </Canvas>
    </div>
          </Col>
        
        </Row>
      </Container>
    </div>
  );
};

export default LoginScreen;
