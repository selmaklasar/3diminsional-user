import React, { useState, useEffect, Suspense, useRef } from 'react';
import Draggable from 'react-draggable';
import Cookies from 'js-cookie';
import { Col, Container, Row } from 'react-bootstrap';
import NavBar from '../../common/NavBar';
import style from './product.module.css';
import 'react-resizable/css/styles.css';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setDecal_image_selected,  setDecal_image_selected_back,  setDecal_image_selected_left,  setDecal_image_selected_right,  setDragPosition,
     setDragPosition_back, setDragPosition_left, setDragPosition_right } from '../../redux/slice/decal_image';

import Loading from '../../common/loading';
import { setSelectedPart_2d_image } from '../../redux/slice/2d_image_partselect';
import CurveTextModal from '../text/text_modal_curve';
import NormalTextModal from '../text/normal_test_modal';
import CircleTextModal from '../text/circle_test_modal';
import { setDecal_image_position, setDecal_image_position_back, setDecal_image_position_left, setDecal_image_position_right } from '../../redux/slice/decal_image_position';

import { resetReduxState } from '../../util/allstate_rest';
import ConfirmationModal from '../../common/conformation';
import NavBar1 from '../../common/Navbar_Tshirt_screen';
import axiosInstance from '../../api/axios-instances';
import CustomAlert from '../../common/custom_alert/custom-alert';


const ProductScreen = () => {
    const dispatch = useDispatch();
    const images = [
        { src: "https://3dimensionaldilu.s3.ap-south-1.amazonaws.com/new_tshirt_front_ouptut.png", label: "F" },
        { src: "https://3dimensionaldilu.s3.ap-south-1.amazonaws.com/new_tshirt_back_ouptut.png", label: "B" },
        { src: "https://3dimensionaldilu.s3.ap-south-1.amazonaws.com/new_tshirt_left_ouptut.png", label: "L" },
        { src: "https://3dimensionaldilu.s3.ap-south-1.amazonaws.com/new_tshirt_right_ouptut.png", label: "R" }
    ];
    const [loading, setLoading] = useState(false);
    const sizes = ['S', 'M', 'L', 'XL', 'XXL'];
    const [selectedSide, setSelectedSide] = useState('F');
    const [selectedImage, setSelectedImage] = useState(images[0].src);
    const [processedImage, setProcessedImage] = useState([]);
    const [imageSize, setImageSize] = useState({ width: 80, height: 80 });
    const [showModal, setShowModal] = useState(false);
    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const[new_y,setNew_y]=useState([])
    const[new_x,setNew_x]=useState([])
    const [showModal1, setShowModal1] = useState(false);
    const [textType, setTextType] = useState('');
    const [error,setError]=useState('')
    
    const handleSideSelection = (sideProduct, index) => {
        setSelectedSide(sideProduct);
        setSelectedImage(images[index].src);
        dispatch(setSelectedPart_2d_image(images[index].label));
    };
    const fileInputRef = useRef(null);

    const handleImageUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            setShowConfirmModal(true); 
          
        }
    };

    const handleConfirm = async () => {
        setShowConfirmModal(false); // Close the modal
        setLoading(true);

        try {

            const formData = new FormData();
            const fileInput = document.querySelector('input[type="file"]');
            const file = fileInput?.files[0];
            
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
            console.log("Response:", response);
    
            if (!response.data || !response.data.image) {
                throw new Error('Failed to process image');
            }
    
            const newImages = Array.isArray(response.data.image) ? response.data.image : [response.data.image];
    
    
          
            if(selectedSide==="F"){
            
            dispatch(setDecal_image_selected(newImages));
            fileInputRef.current.value = '';
            }
            else if(selectedSide==="R"){
            
                dispatch(setDecal_image_selected_right(newImages));
                fileInputRef.current.value = '';
                }
                else if(selectedSide==="B"){
            
                    dispatch(setDecal_image_selected_back(newImages));
                    fileInputRef.current.value = '';
                    }
                    else if(selectedSide==="L"){
            
                        dispatch(setDecal_image_selected_left(newImages));
                        fileInputRef.current.value = '';
                        }


        } catch (error) {
            setError("something went wrong")
            console.error('Error:', error.message);

        } finally {
            setLoading(false);
        }
    };

    const handleCancel = () => {
        setShowConfirmModal(false); // Close the modal
        const file = fileInputRef.current.files[0];
        if (file) {
          const reader = new FileReader();
          reader.onloadend = () => {
            const base64Image = reader.result;
            if(selectedSide==="F"){
            dispatch(setDecal_image_selected([base64Image]));

            }
           else if(selectedSide==="R"){
                dispatch(setDecal_image_selected_right([base64Image]));
    
                }
                else if(selectedSide==="B"){
                    dispatch(setDecal_image_selected_back([base64Image]));
        
                    }
                    else if(selectedSide==="L"){
                        dispatch(setDecal_image_selected_left([base64Image]));
            
                        }
          };
          reader.readAsDataURL(file);
          fileInputRef.current.value = '';
        }
        
       
    };

    
 


    const decalimage = useSelector((state) => state.decalimage.decal_image_Selected);
    const decalimage_right = useSelector((state) => state.decalimage.decal_image_Selected_right);
    const decalimage_back = useSelector((state) => state.decalimage.decal_image_Selected_back);
    const decalimage_left = useSelector((state) => state.decalimage.decal_image_Selected_left);
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




    


   


  const removeallitems=()=>{

    sessionStorage.clear();
    resetReduxState();
  }


    const handleTextTypeChange = (e) => {
        setTextType(e.target.value);
        setShowModal1(true);
    };

    const renderModal = () => {
        switch (textType) {
            case 'normal':
                return <NormalTextModal show={showModal1} onHide={() => setShowModal1(false)} />;
            case 'curved':
                return <CurveTextModal show={showModal1} onHide={() => setShowModal1(false)} />;
            case 'circle':
                return <CircleTextModal show={showModal1} onHide={() => setShowModal1(false)} />;
            default:
                return null;
        }
    };


    const dragPosition = useSelector((state) => state.decalimage.dragPosition);
    const dragPosition_right = useSelector((state) => state.decalimage.dragPosition_right);
    const dragPosition_back = useSelector((state) => state.decalimage.dragPosition_back);
    const dragPosition_left = useSelector((state) => state.decalimage.dragPosition_left);

    return (
        <div className={`${style.bg}`}>
            <NavBar1 />
            <Container fluid className={`${style.product_container} d-flex flex-column`} style={{backgroundColor:"#2B4136"}}>
              {error &&(
                <CustomAlert  message={error}type={"error"}  />)
            }
            {loading && <Loading />}
                {/* Image Section */}
                <Row className={`${style.product_img_box} justify-content-center align-items-center`}>
                    <div className="image-wrapper" style={{ position: 'relative', width: '100%', height: '410px' }}>
                        <img src={selectedImage} alt="" className={`${style.product}`} style={{ position: 'relative', width: '100%', height: '430px' }} />
                        {selectedSide === "F" && decalimage.map((image, index) => (
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
                top: 100,
                left: 680,
            }}
        />
    </Draggable>
))}
 {selectedSide === "R" && decalimage_right.map((image, index) => (
    <Draggable
        key={index}
        bounds=".image-wrapper"
        defaultPosition={dragPosition_right?.[index] || { x: 0, y: 0 }}
        onStop={(e, data) => handleStop(e, data, index)}
    >
        <img
            src={image}
            alt={`Processed ${index}`}
            style={{
                width: '60px',
                height: '45px',
               
                position: 'absolute',
                top: 100,
                left: 680,
            }}
        />
    </Draggable>
))}
           {selectedSide === "B" && decalimage_back.map((image, index) => (
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
                top: 100,
                left: 680,
            }}
        />
    </Draggable>
))}      

{selectedSide === "L" && decalimage_left.map((image, index) => (
    <Draggable
        key={index}
        bounds=".image-wrapper"
        defaultPosition={dragPosition_left[index] || { x: 0, y: 0 }}
        onStop={(e, data) => handleStop(e, data, index)}
    >
        <img
            src={image}
            alt={`Processed ${index}`}
            style={{
                width: '60px',
                height: '45px',
               
                position: 'absolute',
                top: 100,
                left: 680,
            }}
        />
    </Draggable>
))}




                    </div>
                </Row>



                <Row className='flex-grow-1'></Row>
                {/* Size Tab */}
                <Row className={` justify-content-center ${style.bg}`}>
                    <Row className={`px-3 align-items-baseline`}>
                        <Col lg={6} className='p-2 mb-0 my-auto '>
                            <Row className='h-100 mx-auto '>
                                <Col lg={3} className=' d-flex justify-content-center  my-2 my-lg-0 '>
                                    <button className={`${style.myButton}`}>MODEL</button>
                                </Col>
                                <Col >
                                    <Row >
                                        {sizes.map(size => (
                                            <Col key={size}>
                                                <button className={`${style.myButtonSmall}`}>{size}</button>
                                            </Col>
                                        ))}
                                    </Row>
                                </Col>
                            </Row>
                        </Col>
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
                    {/* Bottom Tab */}
                    <Row className={`${style.product_bottom_tab} py-3 px-5`}>
                        <Col lg={6} className='p-2 my-auto'>
                            <Row className='h-100'>
                                <Col xs={4}>
                                    <input type="file" accept="image/*"  ref={fileInputRef} onChange={handleImageUpload} className={`${style.myButton}`} />
                                </Col>
                                <Col>
                                    <Row>
                                    <Col>
            <select 
                value={textType} 
                onChange={handleTextTypeChange} 
                className={`${style.myButton}`}
            >
                <option value="" disabled>Choose Text Type</option> {/* Placeholder option */}
                <option value="normal">Normal</option>
                <option value="curved">Curved</option>
                <option value="circle">Circle</option>
            </select>
        </Col>
                                        <Col><button className={`${style.myButton} w-100`}>ADD FONT</button></Col>
                                    </Row>
                                    <Row>
                                        <Col className='mt-2'>
                                            <input className="form-control" type="text" placeholder="Type here..." />
                                        </Col>
                                    </Row>
                                </Col>
                            </Row>
                        </Col>
                        <Col lg={6} className='p-2 my-auto '>
                            <Row className=' d-flex justify-content-evenly'>
                                <Col xs={5}>
                                <Link to="/productscreen3" className={style.link}>        <button className={`${style.myButton} w-100 py-2`}>PREVIEW (3D)</button>
                                </Link>
                                </Col>
                                <Col xs={5}>
                                    <button className={`${style.myButton} w-100 py-2`}>NEXT 〉</button>
                                </Col>
                                <Col xs={5} onClick={removeallitems}>
                                    <button className={`${style.myButton} w-100 py-2`}>CLEAR</button>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </Row>
            </Container>
            {renderModal()}
            
            <ConfirmationModal
                show={showConfirmModal}
                handleClose={handleCancel}
                handleConfirm={handleConfirm}
            />
        </div>
    );
};

export default ProductScreen;
