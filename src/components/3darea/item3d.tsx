import { useEffect, useRef} from 'react'
import { useGLTF } from '@react-three/drei'
import * as THREE from 'three';
import { ThreeEvent } from '@react-three/fiber';


export const Item3D = (props: {fileurl : string}) => {
  // const groupRef = useRef<THREE.Group>(null!);
  const sceneRef = useRef<THREE.Scene>(null!);

  const { nodes, materials } = useGLTF(props.fileurl);

  useEffect(() => {
    console.log("Loaded GLB File: ", props.fileurl);
    console.log("GLB Data: ", nodes, materials);
    sceneRef.current.add(nodes['Scene'] as THREE.Scene)
    console.log(sceneRef.current);
    console.log("Attached Scene!");
  },[]);

  return <scene ref={sceneRef} ></scene>
}


// Preloading components
useGLTF.preload('/1x1box.glb');