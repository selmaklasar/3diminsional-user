import React, { useRef, useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF } from '@react-three/drei';
import { MeshStandardMaterial, TextureLoader } from 'three';
import Button1 from '../../common/button';

import { useDispatch, useSelector } from 'react-redux';
import Lighting from '../../common/modals_common/lighting';

const Jump_suit = ({ url }) => {
  const dispatch=useDispatch()
  const textureUrl=useSelector((state)=>state.modelparts.selectedimage)
  const [modelUrl, setModelUrl] = useState(url);
  const selectedpart=useSelector((state)=>state.modelparts.selectedPart) 
  useEffect(() => {
  
    if (url) {
   
      fetch(url)
        .then(response => response.blob())
        .then(blob => {
          const newUrl = URL.createObjectURL(blob);
    
          setModelUrl(newUrl);
        })
        .catch(err => {
          console.error('Error fetching model:', err);
          setError('Failed to load model.');
        });
    }
  }, [url]);




  const { scene, nodes, materials } = useGLTF(modelUrl);
  const [texture, setTexture] = useState(null);

  // Load the texture whenever textureUrl changes
  useEffect(() => {
    if (textureUrl) {
      const loader = new TextureLoader();
      loader.load(textureUrl, (loadedTexture) => {
        setTexture(loadedTexture);
        dispatch(setSelectedimage(null))
      });
    }
  }, [textureUrl]);

  // Apply the texture to the specific mesh
  useEffect(() => {
    if (scene && texture) {
      scene.traverse((child) => {
        if (child.isMesh) {
        
        


const shouldUpdateMaterial3 = (
  selectedpart === "full" &&
  (
    child.geometry === nodes.Cloth_mesh.geometry ||
    child.geometry === nodes.Cloth_mesh_1.geometry ||
    child.geometry === nodes.Cloth_mesh_2.geometry ||
    child.geometry === nodes.Cloth_mesh_3.geometry ||
    child.geometry === nodes.Cloth_mesh_4.geometry ||
    child.geometry === nodes.Cloth_mesh_5.geometry ||
    child.geometry === nodes.Cloth_mesh_6.geometry ||
    child.geometry === nodes.Cloth_mesh_7.geometry ||
    child.geometry === nodes.Cloth_mesh_8.geometry ||
    child.geometry === nodes.Cloth_mesh_9.geometry ||
    child.geometry === nodes.Cloth_mesh_10.geometry ||
    child.geometry === nodes.Cloth_mesh_11.geometry ||
    child.geometry === nodes.Cloth_mesh_12.geometry ||
    child.geometry === nodes.Cloth_mesh_13.geometry ||
    child.geometry === nodes.Cloth_mesh_14.geometry ||
    child.geometry === nodes.Cloth_mesh_15.geometry ||
    child.geometry === nodes.Cloth_mesh_16.geometry ||
    child.geometry === nodes.Cloth_mesh_17.geometry ||
    child.geometry === nodes.Cloth_mesh_18.geometry ||
    child.geometry === nodes.Cloth_mesh_19.geometry ||
    child.geometry === nodes.Cloth_mesh_20.geometry ||
    child.geometry === nodes.Cloth_mesh_21.geometry ||
    child.geometry === nodes.Cloth_mesh_22.geometry ||
    child.geometry === nodes.Cloth_mesh_23.geometry

  )
);

             
    

          if (shouldUpdateMaterial3) {
            child.material = new MeshStandardMaterial({
              map: texture,
            });
            child.material.needsUpdate = true;

            setTexture(null)
          }
        



        }
      });
    }
  }, [scene, texture, nodes, materials, selectedpart]);

  const ref = useRef();

  return (
    <>
    <Canvas
     style={{ width: '100vw', height: '380px' }} 
    >
   
      <Lighting/>
      <primitive object={scene} ref={ref} scale={[6, 6, 6]} position={[0, -5, 0]} />
  
     
    </Canvas>
      <Button1 scene={scene} />
      </>
  );
};

export default Jump_suit;
