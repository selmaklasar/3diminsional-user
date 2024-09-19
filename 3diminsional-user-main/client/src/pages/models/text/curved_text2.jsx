import * as THREE from 'three';
import { useEffect, useState, useMemo } from 'react';
import { useLoader, useThree } from '@react-three/fiber';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry';
import { useDispatch, useSelector } from 'react-redux';
import { useControls } from 'leva';
import TextMesh from './test-mesh';
import { useGLTF } from '@react-three/drei';
import { degToRad } from "three/src/math/MathUtils.js";
const TshirtCurvedText2 = ({ modelUrl }) => {
  const [textMeshes, setTextMeshes] = useState([]);
  const [textMeshes_back, setTextMeshes_back] = useState([]);
  const dispatch = useDispatch();
  const { scene, nodes, materials } = useGLTF(modelUrl);
  const textObjects = useSelector((state) => state.text.texts);
  const textObjects_back = useSelector((state) => state.back_text.texts_back);
  const { camera } = useThree();
  const selectedMeshIndex = useSelector((state) => state.indexSelect.index_selected);
  const selectedPart = useSelector((state) => state.modelparts.selectedPart);
  const [textrotation, setTextRotation] = useState({});
  const { size, radius, letterSpace, rotation_angle } = useControls('Text Properties', {
    size: { value: 0.02, min: 0.01, max: 0.1, step: 0.01 },
    radius: { value: 0.0, min: 0.0, max: 0.1, step: 0.01 },
    letterSpace: { value: 0.02, min: 0.01, max: 0.1, step: 0.01 },
    rotation_angle: {
      min: 0,
      max: 360,
      value: 0,
      step: 1,
      onChange: (value) => {
        const rad = degToRad(value); 
        
        setTextRotation((prevRotations) => ({
          ...prevRotations,
          [selectedMeshIndex]: rad,
        }));
      },
    },
  });

console.log("rotation",textrotation)
  

  const createMeshes = (textObjects, fonts, isBack = false) => {
    return textObjects.map((textObj, index) => {
      const font = fonts[index];
      const textMaterial = new THREE.MeshBasicMaterial({ color: textObj.color });

      const textGeometry = new TextGeometry(textObj.text, {
        font: font,
        size: index === selectedMeshIndex ? size : 0.03,
        depth: 0.05,
      });
      textGeometry.center();

      textGeometry.computeBoundingBox();
      const boundingBox = textGeometry.boundingBox;
      const totalLength = boundingBox.max.x - boundingBox.min.x;

      const positions = textGeometry.attributes.position;
      const vertex = new THREE.Vector3();

      const adjustedRadius = index === selectedMeshIndex ? radius : 0;

      for (let i = 0; i < positions.count; i++) {
        vertex.fromBufferAttribute(positions, i);
        const normalizedPosition = (vertex.x - boundingBox.min.x) / totalLength;
        const adjustedLetterSpace = index === selectedMeshIndex ? letterSpace : 0.02;
        const spacedX = vertex.x + normalizedPosition * adjustedLetterSpace;
        const angle = normalizedPosition * Math.PI;
        const curvedX = spacedX;
        const curvedY = Math.sin(angle) * adjustedRadius;
        vertex.set(curvedX, vertex.y + curvedY, vertex.z);
        positions.setXYZ(i, vertex.x, vertex.y, vertex.z);
      }

      positions.needsUpdate = true;



      const mesh = new THREE.Mesh(textGeometry, textMaterial);
      mesh.position.set(
        (isBack ? textMeshes_back[index]?.position.x : textMeshes[index]?.position.x) ?? textObj.x,
        (isBack ? textMeshes_back[index]?.position.y : textMeshes[index]?.position.y) ?? textObj.y,
        isBack ? -0.115 : 0.115 
      );

      if (index === selectedMeshIndex) {
        const rotation = textrotation[selectedMeshIndex] || 0; 

        console.log("index",index)
        mesh.rotation.set(0, 0, rotation);
      } else if (isBack) {
        mesh.rotation.set(
          textMeshes_back[index]?.rotation?.x ?? textObj.rotationX ?? 0,
          textMeshes_back[index]?.rotation?.y ?? textObj.rotationY ?? Math.PI,
          textMeshes_back[index]?.rotation?.z ?? textObj.rotationZ ?? 0
        );
      } else {
        mesh.rotation.set(0, 0, 0); // No rotation for non-selected meshes
      }

      return mesh;
    });
  };

  // Load fonts
  const fonts = useMemo(() => {
    return textObjects.map((textObj) => useLoader(FontLoader, textObj.font));
  }, [textObjects]);

  const fonts_back = useMemo(() => {
    return textObjects_back.map((textObj) => useLoader(FontLoader, textObj.font));
  }, [textObjects_back]);

  useEffect(() => {
    if (textObjects && fonts.length === textObjects.length && selectedPart === 'front') {
      console.log("front")
      const meshes = createMeshes(textObjects, fonts);
      setTextMeshes(meshes);
    }
  }, [textObjects, fonts, size, radius, letterSpace, selectedMeshIndex, selectedPart,textrotation]);

  useEffect(() => {
    if (textObjects_back && fonts_back.length === textObjects_back.length && selectedPart === 'back') {
      console.log("back")
      const meshes_back = createMeshes(textObjects_back, fonts_back, true);
      setTextMeshes_back(meshes_back);
    }
  }, [textObjects_back, fonts_back, size, radius, letterSpace, selectedMeshIndex, selectedPart,textrotation]);

console.log("mesh front",textMeshes)
console.log("mesh back",textMeshes_back)

  return (
    <>
    <mesh geometry={nodes['TSHIRTREGULARSSTGM-FRONT_1'].geometry} material={materials['main_2677']}>
      {textMeshes.map((textMesh, index) => (
        <TextMesh
          key={index}
          mesh={textMesh}
          index={index}
          textObject={textObjects[index]}
          camera={camera}
          selectedPart={selectedPart}
        />
      ))}
    </mesh>

<mesh geometry={nodes['TSHIRTREGULARSSTGM-BACK_1'].geometry} material={materials['main_2677']}>
{textMeshes_back.map((mesh, index) => (
  <TextMesh
    key={index}
    mesh={mesh}
    index={index}
    textObject={textObjects_back[index]}
    camera={camera}
   selectedPart={selectedPart}
  />
))}
</mesh>


</>
  );
};

export default TshirtCurvedText2;
