import React, { useRef, useState } from 'react';
import { Modal, Button, Form ,Row, Col, Container} from 'react-bootstrap';
import Cookies from 'js-cookie';
import ConfirmationModal from '../../common/conformation';
import { useDispatch, useSelector } from 'react-redux';
import axiosInstance from '../../api/axios-instances';
import { setSelectedPart_2d_image } from '../../redux/slice/2d_image_partselect';
import { setDecal_image_selected,  setDecal_image_selected_back,  } from '../../redux/slice/decal_image';
import Loading from '../../common/loading';
import CustomAlert from '../../common/custom_alert/custom-alert';
import { setIserror, setIsLoading } from '../../redux/slice/loading-error/loading-error';


const Decal_upload = () => {
   
const dispatch=useDispatch()
    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const fileInputRef = useRef(null);
    const selectedpart = useSelector((state) => state.modelparts.selectedPart); 
  
console.log("sele",selectedpart)

    const handleImageUpload = (event) => {
        const file = fileInputRef.current?.files[0]; 
        console.log("file")
        if (file) {
            setShowConfirmModal(true);
        } else {
            console.error('No file selected');
        }
    };




    const handleConfirm = async () => {
        setShowConfirmModal(false);
        dispatch(setIsLoading(true));
    
        try {
            console.log("inside")
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
    
       
            if (selectedpart === "front") {
                dispatch(setDecal_image_selected(newImages));

                console.log("image setted")
            }  else if (selectedpart === "back") {
                dispatch(setDecal_image_selected_back(newImages));
            } 
    
           
            fileInputRef.current.value = '';
    
        } catch (error) {
            dispatch(setIserror({ message: "Something went wrong", state: true }));
            console.error('Error:', error.message);
        } finally {
            dispatch(setIsLoading(false));
        }
    };
    const handleCancel = () => {

        console.log("inside2")
        setShowConfirmModal(false);
        const file = fileInputRef.current.files[0];
        if (file) {
          const reader = new FileReader();
          reader.onloadend = () => {
            const base64Image = reader.result;
            if(selectedpart==="front"){
            dispatch(setDecal_image_selected([base64Image]));
            console.log("image setted")

            }
         
                else if(selectedpart==="back"){
                    dispatch(setDecal_image_selected_back([base64Image]));
        
                    }
                   
          };
          reader.readAsDataURL(file);
          fileInputRef.current.value = '';
        }
        
       
    };


    return (<>
    <input type="file" accept="image/*"  ref={fileInputRef} onChange={handleImageUpload}  />
    <ConfirmationModal
    show={showConfirmModal}
    handleClose={handleCancel}
    handleConfirm={handleConfirm}
/>

</>
);
};

export default Decal_upload;
