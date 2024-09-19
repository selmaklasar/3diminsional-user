import React, { useRef, useState, useEffect } from 'react';
import { Decal, useGLTF } from '@react-three/drei';
import { TextureLoader, Vector3, Euler, Raycaster } from 'three';
import { useDispatch, useSelector } from 'react-redux';
import { useControls } from 'leva';
import { degToRad } from "three/src/math/MathUtils.js";
import {  useThree  } from '@react-three/fiber';
import { Vector2 } from 'three';
import * as THREE from 'three';
import { setSelectedPart_2d_image } from '../../../redux/slice/2d_image_partselect';
import TshirtText from '../text/text';
import { setIsorbital_control } from '../../../redux/slice/print_modal/orbital_control_stop';
import TshirtCurvedText from '../text/curved_text';
import TshirtCurvedText2 from '../text/curved_text2';

const Tshirt_decal = ({ modelUrl }) => {
    const dispatch = useDispatch();
    const [decalTextures, setDecalTextures] = useState([]);
    const decalTextureUrl = useSelector((state) => state.decalimage.decal_image_Selected);
    const decalsLoaded = useRef(false);
    const [selectedDecalIndex, setSelectedDecalIndex] = useState(null);
    const decalTextureUrl_back = useSelector((state) => state.decalimage.decal_image_Selected_back);
    const decalposition_back = useSelector((state) => state.decalposition.decal_image_position_back);
    const decalsLoaded_back = useRef(false);
    const [decalTextures_back, setDecalTextures_back] = useState([]);
    const [decalRotations, setDecalRotations] = useState({});
    const [decalSizes_back, setDecalSizes_back] = useState({});
    const [decalSizes, setDecalSizes] = useState({});
    const [selectedDecalIndex_back, setSelectedDecalIndex_back] = useState(null);
    const [decalRotations_back, setDecalRotations_back] = useState({});
    const selectedPart_2d_image = useSelector((state) => state.image_2d_part.selectedPart_2d_image);
    const selectedpart = useSelector((state) => state.modelparts.selectedPart);
    const [decalPositions, setDecalPositions] = useState({}); 
    const [decalPositions_back, setDecalPositions_back] = useState({});// State to store decal positions
    const raycaster = new Raycaster();
    const mouse = new Vector3();
    const { scene, nodes, materials } = useGLTF(modelUrl);
    const [isDragging, setIsDragging] = useState(false);
    const [dragStart, setDragStart] = useState(null);
    const [draggingObject, setDraggingObject] = useState(null);
    const { camera } = useThree();
    const loadedDecals = useRef(new Set()); 
    const loadedDecals_back = useRef(new Set()); 
    const { image_size, rotation_angle } = useControls(() => {
        if (selectedpart === "front" && selectedDecalIndex !== null) {
            return {
                image_size: {
                    min: 0.1,
                    max: 2,
                    value: 0.1,
                    step: 0.01,
                    onChange: (value) => {
                        setDecalSizes((prevSizes) => ({
                            ...prevSizes,
                            [selectedDecalIndex]: [value, value, 0.5],
                        }));
                    },
                },
                rotation_angle: {
                    min: 0,
                    max: 360,
                    value: 0,
                    step: 1,
                    onChange: (value) => {
                        const rad = degToRad(value);
                        setDecalRotations((prevRotations) => ({
                            ...prevRotations,
                            [selectedDecalIndex]: [0, 0, rad],
                        }));
                    },
                },
            };
        } else if (selectedpart === "back" && selectedDecalIndex_back !== null) {
            return {
                image_size: {
                    min: 0.1,
                    max: 2,
                    value: 0.1,
                    step: 0.01,
                    onChange: (value) => {
                        setDecalSizes_back((prevSizes) => ({
                            ...prevSizes,
                            [selectedDecalIndex_back]: [value, value, 0.3],
                        }));
                    },
                },
                rotation_angle: {
                    min: 0,
                    max: 360,
                    value: 0,
                    step: 1,
                    onChange: (value) => {
                        const rad = degToRad(value);
                        setDecalRotations_back((prevRotations) => ({
                            ...prevRotations,
                            [selectedDecalIndex_back]: [0, 0, rad],
                        }));
                    },
                },
            };
        } else {
            return {};
        }
    }, [selectedDecalIndex, selectedDecalIndex_back, selectedPart_2d_image]);


useEffect(() => {
    if (decalTextureUrl && decalTextureUrl.length > 0) {
      decalTextureUrl.forEach((url) => {
        // Check if this URL has already been loaded
        if (!loadedDecals.current.has(url)) {
          const loader = new TextureLoader();
          loader.load(url, (loadedDecalTexture) => {
            setDecalTextures(prevTextures => [...prevTextures, loadedDecalTexture]);
            loadedDecals.current.add(url); // Mark this decal as loaded
          });
        }
      });
    }
  }, [decalTextureUrl]);
    
    
      useEffect(() => {
        if (decalTextureUrl_back.length > 0 && decalTextureUrl_back) {
          decalTextureUrl_back.forEach((url) => {
            if (!loadedDecals_back.current.has(url)) {
                const loader = new TextureLoader();
                loader.load(url, (loadedDecalTexture) => {
                  setDecalTextures_back(prevTextures => [...prevTextures, loadedDecalTexture]);
                  loadedDecals_back.current.add(url); 
                });
              }
          });
          decalsLoaded_back.current = true;
        }
      }, [decalTextureUrl_back])


    const decal_click = (index) => {

        dispatch(setSelectedPart_2d_image("F"));
        if (!decalSizes[index]) {

            console.log("decal selected")
            setSelectedDecalIndex(index);
            setDecalSizes((prevSizes) => ({
                ...prevSizes,
                [index]: [0.4, 0.4, 0.4]
            }));
        }
        if (!decalRotations[index]) {
            setDecalRotations((prevRotations) => ({
                ...prevRotations,
                [index]: [0, 0, 0],
            }));
        }
    }


    const decal_click_back = (index) => {
        dispatch(setSelectedPart_2d_image("B"));
        setSelectedDecalIndex_back(index);
        if (!decalSizes_back[index]) {

            setDecalSizes_back((prevSizes) => ({
                ...prevSizes,
                [index]: [0.4, 0.4, 0.3]
            }));
        }
        if (!decalRotations_back[index]) {
            setDecalRotations_back((prevRotations) => ({
                ...prevRotations,
                [index]: [0, 0, 0],
            }));
        }
    };

    const handleMouseMove = (event) => {
        if (!isDragging ) return;

        if(selectedpart === "front" && selectedDecalIndex !== null ){
        const vector = new THREE.Vector3();
        vector.set((event.clientX / window.innerWidth) * 2 - 1, -(event.clientY / window.innerHeight) * 2 + 1, 0.5);
        vector.unproject(camera);
        vector.sub(camera.position).normalize();

        const distance = -camera.position.z / vector.z;
        const pos = camera.position.clone().add(vector.multiplyScalar(distance));

        const clampedY = Math.max(0.9, Math.min(1.4, pos.y));
        const clampedX = Math.max(-0.09, Math.min(0.09, pos.x));

        setDecalPositions((prevPositions) => ({
            ...prevPositions,
            [selectedDecalIndex]: {
                ...prevPositions[selectedDecalIndex],
                position: new Vector3(clampedX, clampedY, 0.1),
            },
        }));
    }


    if(selectedpart === "back" && selectedDecalIndex_back !== null){
        const vector = new THREE.Vector3();
        vector.set((event.clientX / window.innerWidth) * 2 - 1, -(event.clientY / window.innerHeight) * 2 + 1, 0.5);
        vector.unproject(camera);
        vector.sub(camera.position).normalize();

        const distance = -camera.position.z / vector.z;
        const pos = camera.position.clone().add(vector.multiplyScalar(distance));

        const clampedY = Math.max(0.9, Math.min(1.4, pos.y));
        const clampedX = Math.max(-0.09, Math.min(0.09, pos.x));

        setDecalPositions_back((prevPositions) => ({
            ...prevPositions,
            [selectedDecalIndex_back]: {
                ...prevPositions[selectedDecalIndex_back],
                position: new Vector3(clampedX, clampedY, -0.1),
            },
        }));
    }


    };

    const handleMouseDown = (event, index) => {
        setSelectedDecalIndex(index);
        setIsDragging(true);
        dispatch(setIsorbital_control(false));
    };

    const handleMouseUp = () => {
        setIsDragging(false);
        dispatch(setIsorbital_control(true));
    };

    useEffect(() => {
        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('mouseup', handleMouseUp);
        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseup', handleMouseUp);
        };
    }, [isDragging, selectedDecalIndex]);
console.log("decal texture",decalTextures)

    return (
        <>

  <TshirtCurvedText2 modelUrl={modelUrl}/>
            {decalTextures.length > 0 &&  (
                <mesh geometry={nodes['TSHIRTREGULARSSTGM-FRONT_1'].geometry} material={materials['main_2677']}
              
                >
                  
                    {decalTextures.map((decalTexture, index) => {
                       
                       
                        return (
                            <Decal
                          
                                key={index}
                                position={decalPositions[index]?.position || new Vector3(-0.1, 1.4, 0.1)}
                                scale={new Vector3(...(decalSizes[index] || [0.10, 0.10, 0.3]))}
                                rotation={new Euler(...(decalRotations[index] || [0, 0, 0]))}
                                map={decalTexture}
                                onClick={() => {
                                    console.log(`Decal ${index} clicked`);
                                    decal_click(index);
                                }}
                                onPointerDown={(event) => handleMouseDown(event, index)}
                                onPointerMove={handleMouseMove}
                                onPointerUp={handleMouseUp}
                            />

                        );
                    })}

                </mesh>
            )}


            {decalTextures_back.length > 0 &&  (
                <mesh geometry={nodes['TSHIRTREGULARSSTGM-BACK_1'].geometry} material={materials['main_2677']}>
                    {decalTextures_back.map((decalTexture, index) => {
                       
                        return(
                        <Decal
                            key={index}
                            position={decalPositions_back[index]?.position || new Vector3(0.1, 0.9, -0.1)}
                            scale={new Vector3(...(decalSizes_back[index] || [0.1, 0.1, 0.3]))}
                            rotation={new Euler(...(decalRotations_back[index] || [0, 0, 0]))}
                            map={decalTexture}
                            onClick={() => { decal_click_back(index) }}
                            onPointerDown={(event) => handleMouseDown(event, index)}
                                onPointerMove={handleMouseMove}
                                onPointerUp={handleMouseUp}
                            
                        />
                    )})}
                </mesh>)}



        </>
    );
};

export default Tshirt_decal;
