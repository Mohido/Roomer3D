import { useContext, useEffect, useRef} from 'react'
import * as THREE from 'three';
import { AddedObjectContext } from '../../App';
import { ThreeEvent } from '@react-three/fiber';
import { useGLTF, Gltf } from '@react-three/drei'

useGLTF.preload('/1x1box.glb');

// Uses the AddObject Context to check for updates.
export const Items3D = () => {
  const {sceneItems} = useContext(AddedObjectContext);
  let origMat = useRef<THREE.Material | null>(null);
  const hoverMat = new THREE.MeshLambertMaterial({color: new THREE.Color('green')});

  const onEnter = (event: ThreeEvent<PointerEvent>) => {
    const obj = event.object;
    if(obj instanceof THREE.Mesh){
      origMat.current = obj.material;
      obj.material = hoverMat;
    }
  }

  const onLeave = (event: ThreeEvent<PointerEvent>) => {
    const obj = event.object;
    if(obj instanceof THREE.Mesh){
      obj.material = origMat.current;
      origMat.current = null;
    }
  }

  return <>
    {sceneItems.map(item => {
        const url = item.substring(0, item.lastIndexOf('-'));
        return <Gltf key={item} src={url} onPointerEnter={onEnter} onPointerOut={onLeave}/>
      })
    }
  </>
}


// dimensions must be 2 numbers defining the room size by meters
export const Room = () => {
  const dimensions = [4,4];
  // This reference will give us direct access to the mesh
  const meshRef = useRef<THREE.Mesh>(null!);
  const r_WallRef = useRef<THREE.Mesh>(null!);
  const l_WallRef = useRef<THREE.Mesh>(null!);
  const selectedObject = useRef<THREE.Mesh | null>(null);

  useEffect(() => {
    r_WallRef.current.rotation.x = Math.PI / 2;
    l_WallRef.current.rotation.z = Math.PI / 2;
  }, []);

  const onMouseDown = (ev: ThreeEvent<MouseEvent>)=>{
    if(ev.object.name != "FLOOR"){
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
        name='Floor&Objects'
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