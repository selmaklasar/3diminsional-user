import React, { useState } from 'react';
import { Button, Form, Col, Container, Row } from 'react-bootstrap';
import style from './SignUpScreen.module.css';
import { Link, useNavigate } from 'react-router-dom';
import axiosInstance from '../../api/axios-instances';
import CustomAlert from '../../common/custom_alert/custom-alert';
import GLTFViewer from '../../common/gltfviewer';
import { OrbitControls } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';

const SignUpScreen = () => {
  const navigate = useNavigate();
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    userType: 'Customer', 
    registrationType: 'Traditional'
  });

  const [errors, setErrors] = useState({});
 const [message,setMessage]=useState('')
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


  const validateForm = () => {
    const newErrors = {};
    if (!formData.firstName.trim()) newErrors.firstName = 'First name is required.';
    if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required.';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required.';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid.';
    }
    if (!formData.password) newErrors.password = 'Password is required.';
    else if (formData.password.length < 6) newErrors.password = 'Password must be at least 8 characters long.';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };


  const handleSignUp = async () => {
    if (!validateForm()) return;

    try {
      const response = await axiosInstance.post('/auth/register', formData);

      if (response.status === 200) {
       
   
        navigate('/');
      } 
    
    }catch (error) {
      if (error.response) {
       
        if (error.response.status === 409) {
          setMessage('Email already in use.');
          setMessageType("error");
        } else {
          setMessage('An unexpected error occurred. Please try again.');
          setMessageType("error");
        }
      } else if (error.request) {
        
        setMessage('There is an issue in sign up.');
        setMessageType("error");
      } else {
      
        setMessage('An unexpected error occurred. Please try again.');
        setMessageType("error");
      }
      console.error('Sign up error:', error);
    }
    
  };

  const handleGoogleLogin = () => {
    window.location.href = 'http://localhost:3000/api/auth/google';
  };

  return (
    <div className={`d-flex justify-content-center align-items-center ${style.signup_bg}`}>
      <Container className={`${style.signup_container}`}>
        <Row className="p-3 h-100 bg-white rounded-4 d-flex justify-content-center align-items-center shadow-sm">
         
          <Col lg={6} className={`${style.signup_form} px-4`}>
            <center>
            {message && (
  <CustomAlert message={message} type={messageType} />
)} 
              <h5 className={`${style.signupheading}`}>Sign Up</h5>
            </center>
            <div className="form-group py-1">
              <label>First Name</label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
                className={`form-control py-2 ${style.input_field}`}
                placeholder="Enter your first name"
              />
                 {errors.firstName && (
    <CustomAlert message={errors.firstName}type={"error"}/>
  )}
            </div>
            <div className="form-group py-1">
              <label>Last Name</label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
                className={`form-control py-2 ${style.input_field}`}
                placeholder="Enter your last name"
              />
    {errors.lastName && (
    <CustomAlert message={errors.lastName}type={"error"}/>
  )}
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
                  {errors.email && (
    <CustomAlert message={errors.email}type={"error"}/>
  )}
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
                  {errors.password && (
    <CustomAlert message={errors.password}type={"error"}/>
  )}
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
            <Button variant="primary" className="w-100 mb-1 mt-2" onClick={handleSignUp}>
              Create account
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
            <Link to={'/'}>
            <button type="button" className={`mt-2 ${style.login_google}`} >
              
              Login
            </button>
            </Link>
          </Col>
          <div style={{ width: "600px", height: "500px",   backgroundColor: "#2B4136", 
           
          }}
          className={`${style.canvas3d}`}>
      <Canvas>
        <ambientLight />
        <pointLight position={[10, 10, 10]} />
        <GLTFViewer modelUrl="https://3dimensionaldilu.s3.ap-south-1.amazonaws.com/falling.gltf" />
        <OrbitControls />
      </Canvas>
    </div>
        </Row>
      </Container>
    </div>
  );
};

export default SignUpScreen;
