import React, { useRef, useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF } from '@react-three/drei';
import { MeshStandardMaterial, Color } from 'three';
import Button1 from '../../common/button';

import { useDispatch, useSelector } from 'react-redux';
import gsap from 'gsap';
import { setSelectedimage } from '../../redux/slice/model_parts';
import Lighting from '../../common/modals_common/lighting';

const CropTop = ({ url  }) => {
  const dispatch = useDispatch();
  const [modelUrl, setModelUrl] = useState(url);
  const [error, setError] = useState(null);
  const { scene, nodes } = useGLTF(modelUrl); // Load the GLTF model
  const cameraRef = useRef();
  const selectedpart = useSelector((state) => state.modelparts.selectedPart);  
  const [cameraposition, setCameraposition] = useState([0, 10, 2]);

  useEffect(() => {
    if (url) {
      fetch(url)
        .then((response) => response.blob())
        .then((blob) => {
          const newUrl = URL.createObjectURL(blob);
          setModelUrl(newUrl);
        })
        .catch((err) => {
          console.error('Error fetching model:', err);
          setError('Failed to load model.');
        });
    }
  }, [url]);

  // Apply color to the specific mesh
  useEffect(() => {
    if (scene) {
      scene.traverse((child) => {
        if (child.isMesh) {
          const shouldUpdateMaterial =
            (selectedpart === 'front' &&
              (child.geometry === nodes.Pattern_24855.geometry ||
                child.geometry === nodes.Pattern_24855_1.geometry));

          const shouldUpdateMaterial2 =
            selectedpart === 'back' &&
            (child.geometry === nodes.Pattern_24856.geometry ||
              child.geometry === nodes.Pattern_24856_1.geometry);

          const shouldUpdateMaterial3 =
            selectedpart === 'right' &&
            (child.geometry === nodes.Pattern_36841.geometry ||
              child.geometry === nodes.Pattern_36841_1.geometry ||
              child.geometry === nodes.Pattern_36841_2.geometry ||
              child.geometry === nodes.Pattern_117295.geometry ||
              child.geometry === nodes.Pattern_117295_1.geometry ||
              child.geometry === nodes.Pattern_117295_2.geometry ||
              child.geometry === nodes.Pattern_200678.geometry ||
              child.geometry === nodes.Pattern_200678_1.geometry ||
              child.geometry === nodes.Pattern_200678_2.geometry);

          const shouldUpdateMaterial4 =
            selectedpart === 'left' &&
            (child.geometry === nodes.Pattern_36842.geometry ||
              child.geometry === nodes.Pattern_36842_1.geometry ||
              child.geometry === nodes.Pattern_36842_2.geometry ||
              child.geometry === nodes.Pattern_117296.geometry ||
              child.geometry === nodes.Pattern_117296_1.geometry ||
              child.geometry === nodes.Pattern_117296_2.geometry ||
              child.geometry === nodes.Pattern_200679.geometry ||
              child.geometry === nodes.Pattern_200679_1.geometry ||
              child.geometry === nodes.Pattern_200679_2.geometry);

          if (
            shouldUpdateMaterial ||
            shouldUpdateMaterial2 ||
            shouldUpdateMaterial3 ||
            shouldUpdateMaterial4
          ) {
            child.material = new MeshStandardMaterial({
              color: new Color('#2B4136'), // Apply the color red
            });
            child.material.needsUpdate = true;
          }
        }
      });
    }
  }, [scene, nodes, selectedpart]);

  const animateCamera = (position) => {
    if (cameraRef.current) {
      gsap.to(cameraRef.current.position, {
        x: position[0],
        y: position[1],
        z: position[2],
        duration: 3,
        ease: 'linear',
        onUpdate: () => {
          cameraRef.current.updateProjectionMatrix();
        },
      });
    }
  };

  useEffect(() => {
    if (selectedpart === "front") {
      animateCamera([0, 8, 2]);
    } else if (selectedpart === "back") {
      animateCamera([0.1, 10, -2]);
    } else if (selectedpart === "right") {
      animateCamera([-20, 10, 2]);
    } else if (selectedpart === "left") {
      animateCamera([20, 10, 2]);
    }
  }, [selectedpart]);

  const ref = useRef();

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <>
      <Canvas shadows camera={{position:[10, 10, 10], fov: 50 }} 
        style={{ width: '100vw', height: '380px' }} 
        onCreated={({ camera }) => {
          cameraRef.current = camera; // Store the camera reference
        }}
      >
        <Lighting />
        <primitive object={scene} ref={ref} scale={[10, 10, 10]} position={[0, -13, 0]} />
      </Canvas>
      <Button1 scene={scene} />
    </>
  );
};

export default CropTop;
