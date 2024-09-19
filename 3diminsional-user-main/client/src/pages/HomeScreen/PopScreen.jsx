import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import style from './HomeScreen.module.css';
import { Link } from 'react-router-dom';


import { setRouteModelSelected } from '../../redux/slice/model_slice';
import { useDispatch, useSelector } from 'react-redux';
const BlackScreen = ({ onClick,type}) => {
  const dispatch = useDispatch();
  return (
    <div
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100vh',
        backgroundColor: '#2B4136',
        filter: blur('50px'),
        opacity: 0.9,
        zIndex: 1,
      }}
      onClick={() => onClick(null)}
    >
      <Container className='h-100 w-100 d-flex justify-content-center align-items-center'>
        <Col xs={8}>
        <Row>
        
          <Col xs={6} className=' d-flex justify-content-center'   onClick={()=>{dispatch(setRouteModelSelected("crop_top"))}}>
          <Link to="/productscreen3" className={style.link}>        <button type="button" className={style.popbutton} >
               Crop Top
              </button></Link>
          </Col>
          <Col xs={6} className=' d-flex justify-content-center' onClick={()=>{dispatch(setRouteModelSelected("jump_suit"))}} >
          <Link to="/productscreen3" className={style.link}>      <button type="button" className={style.popbutton}>
          Jump suit
              </button></Link>
          </Col>
          <Col xs={6} className=' d-flex justify-content-center' onClick={()=>{dispatch(setRouteModelSelected("skirt"))}} >
          <Link to="/productscreen3" className={style.link}>    <button type="button" className={style.popbutton}>
              Skirt
              </button></Link>
          </Col>

          <Col xs={6} className=' d-flex justify-content-center' onClick={()=>{dispatch(setRouteModelSelected("wclth"))}} >
          <Link to="/productscreen3" className={style.link}>  <button type="button" className={style.popbutton}>
               Wclth
              </button></Link>
          </Col>
          <Col xs={6} className=' d-flex justify-content-center' onClick={()=>{dispatch(setRouteModelSelected("basic_shirt"))}} >
          <Link to="/productscreen3" className={style.link}>     <button type="button" className={style.popbutton}>
                Basic Shirt
              </button></Link>
          </Col>

          <Col xs={6} className=' d-flex justify-content-center' onClick={()=>{dispatch(setRouteModelSelected("tshirt"))}} >
          <Link to="/productscreen3" className={style.link}>  <button type="button" className={style.popbutton}>
               T Shirt
              </button></Link>
          </Col>
        </Row>
        </Col>
      </Container>
    </div>
  );
};
export default BlackScreen;