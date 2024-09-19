import React, { useRef, useState } from 'react';
import { Modal, Button, Form ,Row, Col, Container} from 'react-bootstrap';


import Cookies from 'js-cookie';
import ConfirmationModal from '../../common/conformation';

import style from './tshirt_2d.module.css';
import Tshirt_2d from './tshirt_2d';
import { useDispatch } from 'react-redux';
import axiosInstance from '../../api/axios-instances';

import { setSelectedPart_2d_image } from '../../redux/slice/2d_image_partselect';
import { setDecal_image_selected,  setDecal_image_selected_back,  setDecal_image_selected_left,  setDecal_image_selected_right,  setDragPosition,
    setDragPosition_back, setDragPosition_left, setDragPosition_right } from '../../redux/slice/decal_image';

  
import Tshirt_3d_prints_modal from './tshirt_print/tshirt_prints';
import { setIsprint_modal } from '../../redux/slice/print_modal/print_modal';
const Tshirt_3d_model_modal = ({ show, onHide }) => {
    const dispatch = useDispatch();
    const images = [
        { src: "https://3dimensionaldilu.s3.ap-south-1.amazonaws.com/front_new_2d.png", label: "F" },
        { src: "https://3dimensionaldilu.s3.ap-south-1.amazonaws.com/back_new_2d.png", label: "B" },
     
    ];
    const [selectedImage, setSelectedImage] = useState(images[0].src);
    const [processedImage, setProcessedImage] = useState([]);
    const [imageSize, setImageSize] = useState({ width: 80, height: 80 });
    const [showModal, setShowModal] = useState(false);
    const[new_y,setNew_y]=useState([])
    const[new_x,setNew_x]=useState([])
    const [showModal1, setShowModal1] = useState(false);
    const [selectedSide, setSelectedSide] = useState('F');
    const fileInputRef = useRef(null);
    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error,setError]=useState('')

    const handleImageUpload = (event) => {
        const file = fileInputRef.current?.files[0]; 
        if (file) {
            setShowConfirmModal(true);
        } else {
            console.error('No file selected');
        }
    };


    const handleSideSelection = (sideProduct, index) => {
        setSelectedSide(sideProduct);
        setSelectedImage(images[index].src);
        dispatch(setSelectedPart_2d_image(images[index].label));
    };


    const handleConfirm = async () => {
        setShowConfirmModal(false);
        setLoading(true);
    
        try {
            const formData = new FormData();
            const file = fileInputRef.current?.files[0]; // Use the ref to get the file
    
            if (!file) {
                throw new Error('No file selected');
            }
    
            formData.append('image', file);
    
            const token = Cookies.get("accessToken");
            const response = await axiosInstance.post('/remove/background_image', formData, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data'
                }
            });
    
            if (response && response.status === 200) {
                console.log('Image processed successfully:', response.data);
            } else {
                throw new Error('Unexpected response status');
            }
    
            const newImages = Array.isArray(response.data.image) ? response.data.image : [response.data.image];
    
       
            if (selectedSide === "F") {
                dispatch(setDecal_image_selected(newImages));
            }  else if (selectedSide === "B") {
                dispatch(setDecal_image_selected_back(newImages));
            } 
    
           
            fileInputRef.current.value = '';
    
        } catch (error) {
            setError("Something went wrong");
            console.error('Error:', error.message);
        } finally {
            setLoading(false);
        }
    };
    const handleCancel = () => {
        setShowConfirmModal(false);
        const file = fileInputRef.current.files[0];
        if (file) {
          const reader = new FileReader();
          reader.onloadend = () => {
            const base64Image = reader.result;
            if(selectedSide==="F"){
            dispatch(setDecal_image_selected([base64Image]));

            }
         
                else if(selectedSide==="B"){
                    dispatch(setDecal_image_selected_back([base64Image]));
        
                    }
                   
          };
          reader.readAsDataURL(file);
          fileInputRef.current.value = '';
        }
        
       
    };
    const handleShowPrints = () => dispatch(setIsprint_modal((true)));

    return (
        <Modal centered size="xl" show={show} onHide={onHide}>
            <Modal.Body>
             <Tshirt_2d selectedImage={selectedImage} selectedSide={selectedSide}/>
<Tshirt_3d_prints_modal selectedSide={selectedSide} />
            <ConfirmationModal
                show={showConfirmModal}
                handleClose={handleCancel}
                handleConfirm={handleConfirm}
            />
            </Modal.Body>
            <Modal.Footer>

<h1>hello</h1>

            <Row className={`px-3 align-items-baseline`}>
                       
                       <Col className='p-2 my-auto text-white '>
                           <Row className=''>
                               {images.map((image, index) => (
                                   <Col key={index}  onClick={() => handleSideSelection(image.label, index)} className='d-flex justify-content-evenly'>
                                       <div className={`${selectedSide === image.label ? style.selected_image_view : style.image_view} position-relative d-flex justify-content-center align-items-center`}>
                                           <img src={image.src} alt="" className={`${style.product_side}`} />
                                           <div className="position-absolute bottom-0 end-0 me-2 fs-6 fw-bold">{image.label}</div>
                                       </div>
                                   </Col>
                               ))}
                           </Row>



                       </Col>
                   </Row>


          
               
                <input type="file" accept="image/*"  ref={fileInputRef} onChange={handleImageUpload} className={`${style.myButton}`} />
                <Button variant="primary" onClick={handleShowPrints}>Show Prints</Button> 
           
                <Button variant="secondary" onClick={onHide}>
                    Close
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default Tshirt_3d_model_modal;
