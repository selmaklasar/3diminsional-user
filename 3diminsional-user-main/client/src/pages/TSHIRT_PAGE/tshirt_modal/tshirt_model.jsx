{/*  
import React, { useEffect, useState, useRef, useCallback } from 'react';
import * as THREE from 'three';
import { useGLTF, Decal } from '@react-three/drei';
import { Canvas, useThree } from '@react-three/fiber';
import { throttle } from 'lodash'; // Import lodash throttle

const Tshirt = ({ uploadedImages, decalsLoaded_front }) => {
    const [decalData, setDecalData] = useState([]);
    const [decalTextures_front, setDecalTextures_front] = useState([]);
    const [draggingIndex, setDraggingIndex] = useState(null);
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    const { scene, nodes, materials } = useGLTF('https://3dimensionaldilu.s3.ap-south-1.amazonaws.com/compressed.gltf', true);
    const { camera } = useThree(); // Access camera from Three.js

    useEffect(() => {
        if (!decalsLoaded_front.current && uploadedImages && uploadedImages.length > 0) {
            uploadedImages.forEach((url) => {
                const loader = new THREE.TextureLoader();
                loader.load(url, (loadedDecalTexture) => {
                    setDecalTextures_front((prevTextures) => [...prevTextures, loadedDecalTexture]);
                    setDecalData((prevData) => [...prevData, { position: [0, 1.3, 0.3], rotation: [0, 0, 0], scale: [0.1, 0.1, 0.6] }]);
                });
            });
            decalsLoaded_front.current = true;
        }
    }, [uploadedImages]);

    const handlePointerDown = (event, index) => {
        setDraggingIndex(index); // Set the index of the decal being dragged
    };

    const handlePointerMove = useCallback(
        throttle((event) => {
            if (draggingIndex !== null) {
                const decal = decalData[draggingIndex];

                mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
                mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

                raycaster.setFromCamera(mouse, camera);
                const intersects = raycaster.intersectObject(nodes['TSHIRTREGULARSSTGM-FRONT_1'], true);

                if (intersects.length > 0) {
                    const intersect = intersects[0];
                    const newPosition = intersect.point;

                    // Smooth transition using lerp
                    const smoothPosition = new THREE.Vector3().lerpVectors(
                        new THREE.Vector3(...decal.position),
                        newPosition,
                        0.1 // Controls the speed of the interpolation
                    );

                    setDecalData((prevData) => {
                        const newData = [...prevData];
                        newData[draggingIndex] = {
                            ...decal,
                            position: [smoothPosition.x, 1.3, smoothPosition.z], // Adjust position for the drag event
                        };
                        return newData;
                    });
                }
            }
        }, 16), // Throttle to run every 16ms (~60fps)
        [draggingIndex, decalData]
    );

    const handlePointerUp = () => {
        setDraggingIndex(null); // Stop dragging the decal
    };

    if (!nodes || !materials) return null;

    return (
        <primitive object={scene} scale={[3, 3, 3]} position={[0, -3.5, 0]}>
            {decalTextures_front.map((texture, index) => (
                <mesh
                    key={`mesh-${index}`}
                    geometry={nodes['TSHIRTREGULARSSTGM-FRONT_1'].geometry}
                    material={materials['main_2677']}
                    position={[0, 0, 0]}
                    scale={[1, 1, 1]}
                >
                    <Decal
                        position={decalData[index]?.position || [0, 0.75, 0.3]}
                        rotation={decalData[index]?.rotation || [0, 0, 0]}
                        scale={decalData[index]?.scale || [0.3, 0.3, 0.6]}
                        map={texture}
                        depthTest={false}
                        polygonOffset={true}
                        polygonOffsetFactor={-1}
                        onPointerMove={handlePointerMove}
                        onPointerUp={handlePointerUp}
                        onPointerDown={(event) => handlePointerDown(event, index)}
                    />
                </mesh>
            ))}
        </primitive>
    );
};

export default Tshirt;
 */}