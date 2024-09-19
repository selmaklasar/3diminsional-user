import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { setIsorbital_control } from '../../../redux/slice/print_modal/orbital_control_stop';
import * as THREE from 'three';
import indexSelect, { setSelected_index } from '../../../redux/slice/text_slice/index-select';

const TextMesh = ({ mesh, camera,index ,selected_part}) => {
  
  const dispatch = useDispatch();
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState(null);
  const [draggingObject, setDraggingObject] = useState(null);



  const handleMouseDown = (event, index) => {
    event.stopPropagation();
    setIsDragging(true);
    setDragStart({ x: event.clientX, y: event.clientY });
    setDraggingObject(mesh);
    dispatch(setIsorbital_control(false));
    dispatch(setSelected_index(index)); // Set the index here
  };


  const handleMouseMove = (event) => {
    if (isDragging && draggingObject) {
 
      const deltaX = event.clientX - dragStart.x;
      const deltaY = event.clientY - dragStart.y;

 
      const vector = new THREE.Vector3();
      vector.set(
        (event.clientX / window.innerWidth) * 2 - 1,
        -(event.clientY / window.innerHeight) * 2 + 1,
        0.5
      );
      vector.unproject(camera);
      vector.sub(camera.position).normalize();

      const distance = -camera.position.z / vector.z;
      const pos = camera.position.clone().add(vector.multiplyScalar(distance));

 
      const clampedY = Math.max(0.9, Math.min(1.4, pos.y + 0.3));
      const clampedX = Math.max(-0.09, Math.min(0.09, pos.x - 0.1));

      let zPosition = draggingObject.position.z;
      if(selected_part === "front"){
     
      if (clampedY >= 0.9 && clampedY <= 1.1) {
        zPosition = 0.12;
      } else {
        zPosition = 0.1;
      }
    }

      draggingObject.position.set(clampedX, clampedY, zPosition);

 
      setDragStart({ x: event.clientX, y: event.clientY });
    }
  };


  const handleMouseUp = () => {
    setIsDragging(false);
    setDraggingObject(null);
    dispatch(setIsorbital_control(true));
  };


  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, draggingObject]);

  return (
   
      <primitive
        object={mesh}
        onPointerDown={(event) => {
          event.stopPropagation();
          handleMouseDown(event, index); // Pass the correct index here
        }}
      />
    );

};

export default TextMesh;
