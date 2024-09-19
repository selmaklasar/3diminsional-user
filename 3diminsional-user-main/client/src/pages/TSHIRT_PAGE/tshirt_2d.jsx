import React, { useState, useRef } from 'react';
import Draggable from 'react-draggable';
import Cookies from 'js-cookie';
import { Col, Container, Row } from 'react-bootstrap';

import style from './tshirt_2d.module.css';
import 'react-resizable/css/styles.css';

import { useDispatch, useSelector } from 'react-redux';
import { setDecal_image_selected,  setDecal_image_selected_back,  setDecal_image_selected_left,  setDecal_image_selected_right,  setDragPosition,
     setDragPosition_back, setDragPosition_left, setDragPosition_right } from '../../redux/slice/decal_image';

import Loading from '../../common/loading';
import { setSelectedPart_2d_image } from '../../redux/slice/2d_image_partselect';

import { setDecal_image_position, setDecal_image_position_back, setDecal_image_position_left, setDecal_image_position_right } from '../../redux/slice/decal_image_position';


import ConfirmationModal from '../../common/conformation';


import CustomAlert from '../../common/custom_alert/custom-alert';


const Tshirt_2d = (selectedSide) => {
    const dispatch = useDispatch();
   
    const [loading, setLoading] = useState(false);
  
  const decalimage=useSelector((state) => state.decalimage.decal_image_Selected);

  const decalimage_back = useSelector((state) => state.decalimage.decal_image_Selected_back);


  

    const [imageSize, setImageSize] = useState({ width: 80, height: 80 });
    const [showModal, setShowModal] = useState(false);
  
    const[new_y,setNew_y]=useState([])
    const[new_x,setNew_x]=useState([])
    const [showModal1, setShowModal1] = useState(false);
    const [textType, setTextType] = useState('');
    const [error,setError]=useState('')




    const handleStop = (e, data, index) => {
        const { x, y } = data;
        
        if (selectedSide === "F")  {
        const newx = (x / 580) -0.076;
        const max_height = 200;
        const n_y = (max_height - (y )) / 600 +1.05
    
      console.log("y is this",newx)
         
            dispatch(setDragPosition({ [index]: { x, y } }));
            dispatch(setDecal_image_position({ [index]: { newx, n_y } }));
        } else if (selectedSide === "R") {

            const maxHeight = 80;
            
            const new_y = (((maxHeight + y)/38)-4.5);
         
            dispatch(setDragPosition_right({ [index]: { x, y } }));
            dispatch(setDecal_image_position_right({ [index]: { new_y } }));
        }



        else if (selectedSide === "B") {
            const newx = -((x / 580) -0.05);
            console.log("y is this",newx)
            const max_height = 200;
            const n_y = (max_height - (y )) / 600 +1.05      
       dispatch(setDragPosition_back({ [index]: { x, y } }));
           dispatch(setDecal_image_position_back({[index]: { newx, n_y } }))
           
        }


        else if (selectedSide === "L") {

           
            const maxHeight = 80;
            
            const new_y = (((maxHeight + y)/44)-4.35);

            console.log("the y value",new_y)
         
            dispatch(setDragPosition_left({ [index]: { x, y } }));
         dispatch(setDecal_image_position_left({[index]: {  new_y } }))
            
         }


    };



 const dragPosition = useSelector((state) => state.decalimage.dragPosition);
  
    const dragPosition_back = useSelector((state) => state.decalimage.dragPosition_back);
  

    return (
        <div className={`${style.bg}`}>
        <Container fluid className={`${style.product_container} d-flex flex-column`} style={{backgroundColor:"#2B4136"}}>
          {error && <CustomAlert message={error} type={"error"} />}
          {loading && <Loading />}
          
          {/* Image Section */}
          <Row className={`${style.product_img_box} justify-content-center align-items-center`}>
            <div style={{ position: 'relative', width: '100%', height: '500px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              {/* Selected Image */}
              <img
                src={selectedSide.selectedImage}
                alt=""
                className={`${style.product}`}
                style={{ position: 'absolute', width: '100%', height: '100%' }}
              />
      
              {/* Draggable Area (image-wrapper) */}
              <div className="image-wrapper" style={{ 
                position: 'relative',
                top:"25px" ,
                right:"5px",
                width: '23%', 
                height: '77%', 
                border: '2px dashed red',  
                backgroundColor: 'transparent',
                borderRadius: '8px',      
                overflow: 'hidden',      
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                zIndex: 1 /* Make sure the draggable area stays above the image */
              }}>
                {/* Decals */}
                {selectedSide.selectedSide === "F" && decalimage.map((image, index) => (
                  <Draggable
                    key={index}
                    bounds=".image-wrapper"
                    defaultPosition={dragPosition[index] || { x: 0, y: 0 }}
                    onStop={(e, data) => handleStop(e, data, index)}
                  >
                    <img
                      src={image}
                      alt={`Processed ${index}`}
                      style={{
                        width: '80px',
                        height: '65px',
                        position: 'absolute',
                        top: 0,
                        left: 0,
                      }}
                    />
                  </Draggable>
                ))}
      
               
      
                {selectedSide.selectedSide === "B" && decalimage_back.map((image, index) => (
                  <Draggable
                    key={index}
                    bounds=".image-wrapper"
                    defaultPosition={dragPosition_back?.[index] || { x: 0, y: 0 }}
                    onStop={(e, data) => handleStop(e, data, index)}
                  >
                    <img
                      src={image}
                      alt={`Processed ${index}`}
                      style={{
                        width: '60px',
                        height: '45px',
                        position: 'absolute',
                        top: 0,
                        left: 0,
                      }}
                    />
                  </Draggable>
                ))}
      
             
              </div>
            </div>
          </Row>
        </Container>
      </div>
    );
};

export default Tshirt_2d;
