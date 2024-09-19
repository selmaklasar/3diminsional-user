import * as THREE from 'three';
import { useEffect, useRef, useState } from 'react';
import { useLoader, useFrame, useThree  } from '@react-three/fiber';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry';
import { useDispatch, useSelector } from 'react-redux';
import { setIsorbital_control } from '../../../redux/slice/print_modal/orbital_control_stop';
import {  useGLTF } from '@react-three/drei';

const TshirtText = ({modelUrl}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState(null);
  const [draggingObject, setDraggingObject] = useState(null);
  const textRef = useRef();
  const { camera } = useThree();
  const font = useLoader(FontLoader, '/font2.json');
  const textMaterial = new THREE.MeshBasicMaterial({ color: 'red' });
const dispatch=useDispatch()
  const [textMesh, setTextMesh] = useState(null);
  const { scene, nodes, materials } = useGLTF(modelUrl);

  const text = useSelector((state) => state.text.text_3d);

  useEffect(() => {
    if (font ) {
      const textGeometry = new TextGeometry(text, {
        font: font,
        size: 0.02,
        depth: 0.05,
      });
      textGeometry.center(); // Center the text
      const mesh = new THREE.Mesh(textGeometry, textMaterial);
      mesh.position.set(0, 1.1, 0.105); // Adjust position of text
      setTextMesh(mesh);
    }
  }, [font,text]);

  const handleMouseDown = (event) => {
    event.stopPropagation();
    setIsDragging(true);
    setDragStart({ x: event.clientX, y: event.clientY });
    setDraggingObject(textMesh); 
    dispatch( setIsorbital_control(false))
  };

  const handleMouseMove = (event) => {
    if (isDragging && draggingObject) {
      // Calculate movement delta
      const deltaX = event.clientX - dragStart.x;
      const deltaY = event.clientY - dragStart.y;

      // Convert delta to 3D space
      const vector = new THREE.Vector3();
      vector.set((event.clientX / window.innerWidth) * 2 - 1, 
                 -(event.clientY / window.innerHeight) * 2 + 1, 
                 0.5);
      vector.unproject(camera);
      vector.sub(camera.position).normalize();

      const distance = -camera.position.z / vector.z;
console.log("distance",distance)

      const pos = camera.position.clone().add(vector.multiplyScalar(distance));
      console.log("pos",pos)
      const clampedY = Math.max(0.9, Math.min(1.4, pos.y + 0.3));
      const clampedX = Math.max(-0.09, Math.min(0.09, pos.x - 0.1));

      let zPosition = draggingObject.position.z;

      
      if (clampedY >= 0.9 && clampedY <= 1.1 ) {
        zPosition = 0.12;
      }
      else{
        zPosition = 0.1;
      }

      draggingObject.position.set(clampedX ,clampedY , zPosition);

console.log("drag",draggingObject)

      // Update drag start for continuous dragging
      setDragStart({ x: event.clientX, y: event.clientY });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    setDraggingObject(null);
    dispatch( setIsorbital_control(true))
  };

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, draggingObject]);

  return (
    textMesh && (
      <>
      <mesh geometry={nodes['TSHIRTREGULARSSTGM-FRONT_1'].geometry} material={materials['main_2677']}
       onPointerDown={handleMouseDown}
       onPointerUp={handleMouseUp}
      
      >
      <primitive
        object={textMesh}
       
      />
      </mesh>
      </>
    )
  );
};

export default TshirtText;
