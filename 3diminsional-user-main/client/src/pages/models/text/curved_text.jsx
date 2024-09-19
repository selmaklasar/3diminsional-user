import * as THREE from 'three';
import { useEffect, useState } from 'react';
import { useLoader, useThree } from '@react-three/fiber';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry';
import { useSelector } from 'react-redux';
import { useControls, folder } from 'leva';
import { MeshStandardMaterial, Color } from 'three';
import { useGLTF } from '@react-three/drei';

const TshirtCurvedText = ({ modelUrl }) => {
  const { nodes, materials } = useGLTF(modelUrl);
  const textObjects = useSelector((state) => state.text.texts);
  const [selectedMeshIndex, setSelectedMeshIndex] = useState(null);
  const [meshPositions, setMeshPositions] = useState([]);
  const [textMeshes, setTextMeshes] = useState([]);
  const [meshProperties, setMeshProperties] = useState([]);





 

  const { size, radius, letterSpace} = useControls('Selected Mesh Properties', {
    size: { value: controlPanel.size, min: 0.01, max: 0.1, step: 0.01 },
    radius: { value: controlPanel.radius, min: 0.0, max: 0.1, step: 0.01 },
    letterSpace: { value: controlPanel.letterSpace, min: 0.01, max: 0.1, step: 0.01 },

  });

  const { x, y } = useControls(
    `Mesh Position`,
    selectedMeshIndex !== null
      ? {
          x: { value: positionControls.x, min: -0.1, max: 0.1, step: 0.01 },
          y: { value: positionControls.y, min: 0.9, max: 1.4, step: 0.01 },
        }
      : defaultMeshControls
  );
  useEffect(() => {
    const loadFont = async () => {
      const newMeshes = [];
      try {
        const fontUrl = textObjects[0]?.font || 'https://font-bucket-3dimisional.s3.ap-south-1.amazonaws.com/Roboto%20Black_Regular.json';
      
        const font = useLoader(FontLoader, fontUrl);
        textObjects.forEach((textData, index) => {
          const position = meshPositions[index];
          if (!position) return;

          const properties = meshProperties[index];
          const textMaterial = new MeshStandardMaterial({ color: new Color(textData.color) });
          console.log("font",font)
          const textGeometry = new TextGeometry(textData.text, {
            font: font,
            size: properties.size,
            depth: 0.05,
          });

          textGeometry.center();
          textGeometry.computeBoundingBox();
          const boundingBox = textGeometry.boundingBox;
          const totalLength = boundingBox.max.x - boundingBox.min.x;

          const positions = textGeometry.attributes.position;
          const vertex = new THREE.Vector3();

          for (let i = 0; i < positions.count; i++) {
            vertex.fromBufferAttribute(positions, i);
            const normalizedPosition = (vertex.x - boundingBox.min.x) / totalLength;
            const spacedX = vertex.x + normalizedPosition * properties.letterSpace;
            const angle = normalizedPosition * Math.PI;
            const curvedX = spacedX;
            const curvedY = Math.sin(angle) * properties.radius;
            vertex.set(curvedX, vertex.y + curvedY, vertex.z);
            positions.setXYZ(i, vertex.x, vertex.y, vertex.z);
          }

          positions.needsUpdate = true;

          const mesh = new THREE.Mesh(textGeometry, textMaterial);
          const { x, y, z } = position;
          mesh.position.set(x, y, z);
          mesh.userData.id = index;
          newMeshes.push(mesh);
        });

        setTextMeshes(newMeshes);
      } catch (error) {
        console.error('Error loading font', error);
      }
    };

    loadFont();

    return () => {
      textMeshes.forEach((mesh) => {
        mesh.geometry.dispose();
        mesh.material.dispose();
      });
    };
  }, [textObjects, meshProperties, meshPositions]);

  const handleMeshClick = (index, event) => {
    event.stopPropagation();  
    const selectedPosition = meshPositions[index];
    setSelectedMeshIndex(index);
  
    if (selectedPosition) {
      setControlPanel({
        size: meshProperties[index].size,
        radius: meshProperties[index].radius,
        letterSpace: meshProperties[index].letterSpace,
        x: selectedPosition.x,
        y: selectedPosition.y,
      });
    }
  };

  useEffect(() => {
    if (selectedMeshIndex !== null && textMeshes[selectedMeshIndex]) {
      const updatedPositions = [...meshPositions];
      updatedPositions[selectedMeshIndex] = { x, y, z: 0.12 };
      setMeshPositions(updatedPositions);

      const updatedProperties = [...meshProperties];
      updatedProperties[selectedMeshIndex] = { size, radius, letterSpace };
      setMeshProperties(updatedProperties);

      const selectedMesh = textMeshes[selectedMeshIndex];
      selectedMesh.position.set(x, y, 0.12);
    }
  }, [x, y, size, radius, letterSpace, selectedMeshIndex]);

  return (
    <>
      {textMeshes.map((mesh, index) => (
        <mesh
          key={index}
          geometry={nodes['TSHIRTREGULARSSTGM-FRONT_1'].geometry}
          material={materials['main_2677']}
          onPointerDown={(event) => handleMeshClick(index, event)}
        >
          <primitive object={mesh} />
        </mesh>
      ))}
    </>
  );
};

export default TshirtCurvedText;
