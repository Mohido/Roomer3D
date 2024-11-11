import React, { useEffect, useRef , memo} from 'react'
import { useGLTF } from '@react-three/drei'
import * as THREE from 'three';


export const Item3D = memo((props: {fileurl : string}) => {
//   const groupRef = useRef<THREE.Group>(null!);
//   const { nodes, materials } = useGLTF(props.fileurl);
  useEffect(() => {
    console.log("Loaded item3d");
  },[]);

  return (
    <group>
        {/* {Object.entries(nodes).map(([name, value]) => {

            return <mesh castShadow receiveShadow geometry={} material={materials['Material.001']} />
        })} */}
    </group>
  )
})

// useGLTF.preload('/Poimandres.gltf')