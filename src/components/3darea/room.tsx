import { useContext, useEffect, useRef} from 'react'
import * as THREE from 'three';
import { AddedObjectContext } from '../../App';
import { Item3D } from './item3d';



// Uses the AddObject Context to check for updates.
export const Items3D = () => {
  const {sceneItems} = useContext(AddedObjectContext);
  return <group>
    {sceneItems.map(item => {
      const url = item.substring(0, item.lastIndexOf('-'));
      return <Item3D key={item} fileurl={url} />
      })
    }
  </group>
}


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

      <mesh 
        {...props}
        scale={[props.dimensions[0], 1, 1]}
        position={[0, 0.475, - props.dimensions[1] / 2]}
        ref={r_WallRef}>
        <boxGeometry args={[1, 0.05, 1]} />
        <meshStandardMaterial color='gray' />
      </mesh>

      <mesh
        {...props}
        scale={[1, 1, props.dimensions[1]]}
        position={[-props.dimensions[0] / 2, 0.475, 0]}
        ref={l_WallRef}>
        <boxGeometry args={[1, 0.05, 1]} />
        <meshStandardMaterial color='gray' />
      </mesh>

      <Items3D />
    </group>
  )
}