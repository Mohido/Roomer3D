import { useRef, useState } from 'react'
import { MeshProps, useFrame } from '@react-three/fiber'
import * as THREE from 'three';


export const Box = (props: MeshProps) => {
  // This reference will give us direct access to the mesh
  const meshRef = useRef<THREE.Mesh>(null!)
  // Set up state for the hovered and active state
  const [hovered, setHover] = useState(false)
  const [active, setActive] = useState(false)
  // Subscribe this component to the render-loop, rotate the mesh every frame
  
    useFrame((state, delta) => meshRef.current.rotation.x += delta)
  // Return view, these are regular three.js elements expressed in JSX
  return (
    <mesh
      {...props}
      ref={meshRef}
      scale={active ? 1.5 : 1}
      onClick={(event) => setActive(!active)}
      onPointerOver={(event) => setHover(true)}
      onPointerOut={(event) => setHover(false)}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={hovered ? 'hotpink' : 'orange'} />
    </mesh>
  )
}