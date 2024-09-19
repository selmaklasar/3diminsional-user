
import React, { useEffect } from 'react';
import { useGLTF ,useAnimations} from '@react-three/drei';


function Model({ url }) {
    const { scene, animations } = useGLTF(url);
    const { actions } = useAnimations(animations, scene);
  
    useEffect(() => {
  
      if (animations.length > 0) {
        actions[animations[0].name].play();
      }
    }, [actions, animations]);
  
    return <primitive object={scene} />;
  }
export default function GLTFViewer({ modelUrl }) {
  return <Model url={modelUrl} />;
}
