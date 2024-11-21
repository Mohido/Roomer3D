import { createContext, useContext, useEffect, useRef} from 'react'
import * as THREE from 'three';
import { ActiveMeshContext, AddedObjectContext, ObjectsPositionsContext, RoomContext } from '../../App';
import { ThreeEvent } from '@react-three/fiber';
import { GlbMesh } from './item';



// Uses the AddObject Context to check for updates.
export const Items3D = () => {
  const {sceneItems} = useContext(AddedObjectContext);

  return <>
    {sceneItems.map(item => {
        return <GlbMesh key={item} file_id={item}/>
      })
    }
  </>
}




// dims must be 2 numbers defining the room size by meters
export const Room = () => {
  // This reference will give us direct access to the mesh
  const meshRef = useRef<THREE.Mesh>(null!);
  const r_WallRef = useRef<THREE.Mesh>(null!);
  const l_WallRef = useRef<THREE.Mesh>(null!);
  const selectedObject = useRef<THREE.Mesh | null>(null);
  const {activeMesh, setActiveMesh_cb} = useContext(ActiveMeshContext);
  const { updatePosition_cb} = useContext(ObjectsPositionsContext);
  const {dims} = useContext(RoomContext);

  useEffect(() => {
    r_WallRef.current.rotation.x = Math.PI / 2;
    l_WallRef.current.rotation.z = Math.PI / 2;
  }, []);

  const onMouseDown = (ev: ThreeEvent<MouseEvent>)=>{
    if(ev.object.name != "FLOOR" && ev.button == 0){
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
  const onMouseUp = ()=>{
    if(!selectedObject.current)
      return;
    updatePosition_cb(activeMesh, [selectedObject.current.position.x, selectedObject.current.position.z] );
    selectedObject.current = null;
  }

  return (
    <group position={[0,-1,0]} onPointerDown={()=> {
        if(!selectedObject.current)
          setActiveMesh_cb('');
      }}>
      <mesh 
        castShadow
        receiveShadow
        name='RIGHT_WALL'
        scale={[dims[0], 1, 3]}
        position={[0, 1.475, - dims[1] / 2]}
        ref={r_WallRef}>
        <boxGeometry args={[1, 0.05, 1]} />
        <meshStandardMaterial color='gray' />
      </mesh>

      <mesh
      receiveShadow
        castShadow
        name='LEFT_WALL'
        scale={[3, 1, dims[1]]}
        position={[-dims[0] / 2, 1.475, 0]}
        ref={l_WallRef}>
        <boxGeometry args={[1, 0.05, 1]} />
        <meshStandardMaterial color='gray' />
      </mesh>

      <group
        name='Floor&Objects'
      onPointerOut={() => selectedObject.current=null}
      onPointerUp={onMouseUp} onPointerMove={onMouseMove} onPointerDown={onMouseDown}>
        <mesh
          receiveShadow
          name='FLOOR'
          scale={[dims[0], 1, dims[1]]}
          ref={meshRef}>
          <boxGeometry args={[1, 0.05, 1]} />
          <meshStandardMaterial color='gray' />
        </mesh>
        <Items3D />
      </group>
    </group>
  )
}