import { useContext, useEffect, useRef} from 'react'
import * as THREE from 'three';
import { AddedObjectContext } from '../../App';
import { Item3D } from './item3d';
import { ThreeEvent } from '@react-three/fiber';



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
export const Room = () => {
  const dimensions = [4,4];
  // This reference will give us direct access to the mesh
  const meshRef = useRef<THREE.Mesh>(null!);
  const r_WallRef = useRef<THREE.Mesh>(null!);
  const l_WallRef = useRef<THREE.Mesh>(null!);
  // const dragging = useRef<boolean>(false);
  const selectedObject = useRef<THREE.Mesh | null>(null);

  useEffect(() => {
    r_WallRef.current.rotation.x = Math.PI / 2;
    l_WallRef.current.rotation.z = Math.PI / 2;
  }, []);

  const onMouseDown = (ev: ThreeEvent<MouseEvent>)=>{
    if(ev.object.name != "FLOOR"){
      // dragging.current = true;
      console.log(ev);
      selectedObject.current = ev.object as THREE.Mesh;
    }
  }
  const onMouseMove = (ev: ThreeEvent<MouseEvent>)=>{
    if(!selectedObject.current)
      return;
    const inter = ev.intersections[ev.intersections.length - 1];

    
      selectedObject.current.position.x = inter.point.x;
      selectedObject.current.position.z = inter.point.z;
          
  }
  const onMouseUp = (ev: ThreeEvent<MouseEvent>)=>{
    selectedObject.current = null;
  }

  return (
    <group position={[0,-1,0]}>
      <mesh 
        name='RIGHT_WALL'
        scale={[dimensions[0], 1, 3]}
        position={[0, 1.475, - dimensions[1] / 2]}
        ref={r_WallRef}>
        <boxGeometry args={[1, 0.05, 1]} />
        <meshStandardMaterial color='gray' />
      </mesh>

      <mesh
        name='LEFT_WALL'
        scale={[3, 1, dimensions[1]]}
        position={[-dimensions[0] / 2, 1.475, 0]}
        ref={l_WallRef}>
        <boxGeometry args={[1, 0.05, 1]} />
        <meshStandardMaterial color='gray' />
      </mesh>

      <group
      onPointerOut={() => selectedObject.current=null}
      onPointerUp={onMouseUp} onPointerMove={onMouseMove} onPointerDown={onMouseDown}>
        <mesh
          name='FLOOR'
          scale={[dimensions[0], 1, dimensions[1]]}
          ref={meshRef}>
          <boxGeometry args={[1, 0.05, 1]} />
          <meshStandardMaterial color='gray' />
        </mesh>
        <Items3D />
      </group>
    </group>
  )
}