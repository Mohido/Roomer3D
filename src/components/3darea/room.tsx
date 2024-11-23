import { useContext, useEffect, useRef} from 'react'
import * as THREE from 'three';
import { SceneContext } from '../../App';
import { ThreeEvent } from '@react-three/fiber';
import { GlbMesh } from './item';



// Uses the AddObject Context to check for updates.
export const Items3D = () => {
  const {objects, active} = useContext(SceneContext);

  return <>
    {Object.keys(objects).map(item => {
        return <GlbMesh active={active === item} key={item} file_id={item}/>
      })
    }
  </>
}


export const Room = () => {
  // This reference will give us direct access to the mesh
  const meshRef = useRef<THREE.Mesh>(null!);
  const r_WallRef = useRef<THREE.Mesh>(null!);
  const l_WallRef = useRef<THREE.Mesh>(null!);
  const selectedObject = useRef<THREE.Group | null>(null);
  const {active, setActiveObject_cb, updateObject_cb, dimensions} = useContext(SceneContext);

  useEffect(() => {
    r_WallRef.current.rotation.x = Math.PI / 2;
    l_WallRef.current.rotation.z = Math.PI / 2;
  }, []);

  const onMouseDown = (ev: ThreeEvent<MouseEvent>)=>{
    if(ev.object.name != "FLOOR" && ev.button == 0){
      selectedObject.current = ev.intersections[0].eventObject as THREE.Group;
    }
  }

  const onMouseMove = (ev: ThreeEvent<MouseEvent>)=>{
    if(!selectedObject.current)
      return;
    const inter = ev.intersections[ev.intersections.length - 1]; // Last intersection point (Floor)
    selectedObject.current.position.x = inter.point.x;
    selectedObject.current.position.z = inter.point.z;
  }

  const onMouseUp = ()=>{
    if(!selectedObject.current)
      return;
    updateObject_cb(active, [selectedObject.current.position.x, selectedObject.current.position.z] );
    selectedObject.current = null;
  }

  return (
    <group position={[0,-1.5,0]} onPointerDown={()=> {
        if(!selectedObject.current)
          setActiveObject_cb(''); // Produces a behavior of un-activating object when rotating it.
      }}>
      <mesh 
        castShadow
        receiveShadow
        name='RIGHT_WALL'
        scale={[dimensions[0], 1, 3]}
        position={[0, 1.475, - dimensions[1] / 2]}
        ref={r_WallRef}>
        <boxGeometry args={[1, 0.05, 1]} />
        <meshStandardMaterial color='gray' />
      </mesh>

      <mesh
      receiveShadow
        castShadow
        name='LEFT_WALL'
        scale={[3, 1, dimensions[1]]}
        position={[-dimensions[0] / 2, 1.475, 0]}
        ref={l_WallRef}>
        <boxGeometry args={[1, 0.05, 1]} />
        <meshStandardMaterial color='gray' />
      </mesh>

      <group
        name='Floor&Objects'
      onPointerUp={onMouseUp} onPointerMove={onMouseMove} onPointerDown={onMouseDown}>
        <mesh
          receiveShadow
          name='FLOOR'
          onPointerOut={() => selectedObject.current=null}
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