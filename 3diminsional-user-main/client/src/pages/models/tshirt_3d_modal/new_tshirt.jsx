import React, { useRef, useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import { MeshStandardMaterial, TextureLoader, } from 'three';
import Button1 from '../../../common/button';
import { useDispatch, useSelector } from 'react-redux';
import gsap from 'gsap';
import { setSelectedimage } from '../../../redux/slice/model_parts';
import Lighting from '../../../common/modals_common/lighting';
import Tshirt_decal from '../decal/decal';
import { Leva} from 'leva';

const New_tshirt = ({ url }) => {
  const dispatch = useDispatch();
  const textureUrl = useSelector((state) => state.modelparts.selectedimage);
  const selectedpart = useSelector((state) => state.modelparts.selectedPart);
  const [modelUrl, setModelUrl] = useState(url);
  const [texture, setTexture] = useState(null);
  const [error, setError] = useState(null);

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




  useEffect(() => {
    if (textureUrl) {
      const loader = new TextureLoader();
      loader.load(
        textureUrl,
        (loadedTexture) => {
          setTexture(loadedTexture);
          dispatch(setSelectedimage(null));
        },
        undefined,
        (err) => {
          console.error('Error loading texture:', err);
          setError('Failed to load texture.');
        }
      );
    }
  }, [textureUrl]);

  useEffect(() => {
    if (scene && texture) {
      scene.traverse((child) => {
        if (child.isMesh) {
          const shouldUpdateMaterial =
            (selectedpart === "front" &&
              (child.geometry === nodes['TSHIRTREGULARSSTGM-FRONT_1'].geometry ||
                child.geometry === nodes['TSHIRTREGULARSSTGM-FRONT_2'].geometry ||
                child.geometry === nodes['TSHIRTREGULARSSTGM-FRONT_3'].geometry
              ));

          const shouldUpdateMaterial2 = (selectedpart === "back" &&
            (
              child.geometry === nodes['TSHIRTREGULARSSTGM-BACK_1'].geometry ||
              child.geometry === nodes['TSHIRTREGULARSSTGM-BACK_2'].geometry ||
              child.geometry === nodes['TSHIRTREGULARSSTGM-BACK_3']
            ));

          const shouldUpdateMaterial3 = (
            selectedpart === "right" &&
            (
              child.geometry === nodes['TSHIRTREGULARSSTGM-SLEEVE_RISGHT_1'].geometry ||
              child.geometry === nodes['TSHIRTREGULARSSTGM-SLEEVE_RISGHT_2'].geometry ||
              child.geometry === nodes['TSHIRTREGULARSSTGM-SLEEVE_RISGHT_3'].geometry
            ));

          const shouldUpdateMaterial4 = (
            selectedpart === "left" &&
            (
              child.geometry === nodes['TSHIRTREGULARSSTGM-SLEEVE_LEFT_1'].geometry ||
              child.geometry === nodes['TSHIRTREGULARSSTGM-SLEEVE_LEFT_1'].geometry ||
              child.geometry === nodes['TSHIRTREGULARSSTGM-SLEEVE_LEFT_3'].geometry
            ));

          if (shouldUpdateMaterial || shouldUpdateMaterial2 || shouldUpdateMaterial3 || shouldUpdateMaterial4) {
            child.material = new MeshStandardMaterial({
              map: texture,
            });
            child.material.needsUpdate = true;
          }
        }
      });
      setTexture(null);
    }
  }, [scene, texture, nodes, selectedpart]);


  const animateCamera = (position) => {
    if (cameraRef.current) {
      gsap.to(cameraRef.current.position, {
        x: position[0],
        y: position[1],
        z: position[2],
        duration: 2,
        ease: 'linear',
        onUpdate: () => {
          cameraRef.current.updateProjectionMatrix();
        },
      });
    }
  };

  const ref = useRef();

  useEffect(() => {
    if (selectedpart === "front") {
      animateCamera([0, 0, 2]);
    } else if (selectedpart === "back") {
      animateCamera([0.1, 0, -2]);
    } else if (selectedpart === "right") {
      animateCamera([-20, 0, 2]);
    } else if (selectedpart === "left") {
      animateCamera([20, 0, 2]);
    }
  }, [selectedpart]);

  const cameraRef = useRef();

  if (error) {
    return <div>Error: {error}</div>;
  }


  return (
    <>
      <Canvas
        style={{ width: '100vw', height: '440px', position: "fixed", top: "65px" }}
        camera={{ position: [0, 0, 0], zoom: 2 }}

        onCreated={({ camera }) => {
          cameraRef.current = camera; 
        }}

      >
        <Lighting />
        <primitive object={scene} ref={ref} scale={[6.8, 6.8, 6.8]} position={[0, -8, 0]}>

          <Tshirt_decal modelUrl={modelUrl} />
        </primitive>
      </Canvas>
      <Button1 scene={scene} />
      <Leva />
    </>
  );
};

export default New_tshirt;
