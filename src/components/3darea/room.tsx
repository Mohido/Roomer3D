import { useEffect, useRef} from 'react'
import * as THREE from 'three';

// dimensions must be 2 numbers defining the room size by meters
export const Room = (props: {dimensions: number[]}) => {
  // This reference will give us direct access to the mesh
  const meshRef = useRef<THREE.Mesh>(null!);
  const r_WallRef = useRef<THREE.Mesh>(null!);
  const l_WallRef = useRef<THREE.Mesh>(null!);

  useEffect(() => {
    r_WallRef.current.rotation.x = Math.PI / 2;
    l_WallRef.current.rotation.z = Math.PI / 2;
  }, []);
  
  return (
    <group position={[0,-0.5,0]}>
      <mesh
        {...props}
        scale={[props.dimensions[0], 1, props.dimensions[1]]}
        ref={meshRef}>
        <boxGeometry args={[1, 0.05, 1]} />
        <meshStandardMaterial color='gray' />
      </mesh>

      {/* Right Wall  */}
      <mesh 
        {...props}
        scale={[props.dimensions[0], 1, 1]}
        position={[0, 0.475, - props.dimensions[1] / 2]}
        ref={r_WallRef}>
        <boxGeometry args={[1, 0.05, 1]} />
        <meshStandardMaterial color='gray' />
      </mesh>

      {/* Left Wall */}
      <mesh
        {...props}
        scale={[1, 1, props.dimensions[1]]}
        position={[-props.dimensions[0] / 2, 0.475, 0]}
        ref={l_WallRef}>
        <boxGeometry args={[1, 0.05, 1]} />
        <meshStandardMaterial color='gray' />
      </mesh>
    </group>
  )
}