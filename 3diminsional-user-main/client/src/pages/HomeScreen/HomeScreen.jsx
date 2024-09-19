import React, { useEffect, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import style from './HomeScreen.module.css';
import NavBar from '../../common/NavBar';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import GLTFViewer from '../../common/gltfviewer';


const modelSource1 = "https://3dimensionaldilu.s3.ap-south-1.amazonaws.com/falling.gltf";
const modelSource2 = "https://3dimensionaldilu.s3.ap-south-1.amazonaws.com/naruto.gltf";
const modelSource3 = "https://3dimensionaldilu.s3.ap-south-1.amazonaws.com/globin.gltf";

const HomeScreen = ({ onClick }) => {
  const [hoveredModel, setHoveredModel] = useState(null);
 
  const handleMouseEnter = (index) => {
    setHoveredModel(index);
  };

  const handleMouseLeave = () => {
    setHoveredModel(null);
  };




  return (
    <div>
      <NavBar />
      <div className={`${style.home_bg}`}>
        <Container fluid className='d-none d-lg-block'>
          <Row className={`d-flex justify-content-center align-items-center px-5 ${style.home_hero}`}>
            {[modelSource1, modelSource2, modelSource3].map((src, index) => (
              <Col lg={3} key={index} className={`mx-5 ${style.home_cards}`} >
                <div
                  onClick={() => onClick(index)}
                  className={`${style.videoContainer} ${hoveredModel !== null && hoveredModel !== index ? style.blur : ''}`}
                  onMouseEnter={() => handleMouseEnter(index)}
                  onMouseLeave={handleMouseLeave}
                  style={{
                    transition: 'filter 0.3s, opacity 0.3s', // Add transition effect
                  }}
                >
                  <Canvas> {/* Adjust height as needed */}
                    <ambientLight />
                    <pointLight position={[10, 10, 10]} />
                    <GLTFViewer modelUrl={src} />
                    <OrbitControls />
                  </Canvas>
                  <div className={`${style.overlayText}`}>
                    <h3>{index === 0 ? 'Men' : index === 1 ? 'CUSTOMIZE' : 'Women'}</h3>
                  </div>
                </div>
              </Col>
            ))}
          </Row>
        </Container>
      
      </div>
    </div>
  );
};

export default HomeScreen;
