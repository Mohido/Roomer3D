import { Gltf, useGLTF } from '@react-three/drei';
import { ThreeEvent } from '@react-three/fiber';
import { memo, useContext, useEffect, useRef } from 'react'
import * as THREE from 'three';
import { SceneContext } from '../../App';

const hoverMat = new THREE.MeshLambertMaterial({color: new THREE.Color('green')});


useGLTF.preload('/plant_1/plant.glb');
useGLTF.preload('/chair_1/chair.glb');
useGLTF.preload('/chair_2/chair.glb');
useGLTF.preload('/bed_1/bed.glb');
useGLTF.preload('/bed_2/bed.glb');
useGLTF.preload('/table/table.glb');


export const GlbMesh = (props: {file_id: string, active : boolean}) => {
    const {setActiveObject_cb, objects, updateObject_cb} = useContext(SceneContext);
    const origMat = useRef<THREE.Material | null>(null);
    const groupRef = useRef(null!);

    useEffect(() => {
        const g = (groupRef.current as THREE.Group);
        // Update group position
        if(objects[props.file_id]){
            g.traverse((child) => {
                if(child instanceof THREE.Mesh){
                    child.position.x = objects[props.file_id].position[0];
                    child.position.z = objects[props.file_id].position[1];
                    child.rotation.y = objects[props.file_id].rotation;
                }
            })
        }

        if(origMat.current === null){
            g.children.forEach((child) => {
                if(child instanceof THREE.Mesh){
                    origMat.current = child.material;
                }
            })
        }else if(!props.active){
            g.children.forEach((child) => {
                if(child instanceof THREE.Mesh){
                    child.material = origMat.current;
                }
            })
        }
    } , [props.active]);

    const onEnter = (event: ThreeEvent<PointerEvent>) => {
        const obj = event.object;
        if(obj instanceof THREE.Mesh){
            obj.material = hoverMat;
        }
    }

    const onLeave = (event: ThreeEvent<PointerEvent>) => {
        const obj = event.object;
        if(obj instanceof THREE.Mesh && !props.active){
            obj.material = origMat.current;
        }
    }


    const onMouseDown =  (event: ThreeEvent<MouseEvent>) => {
        const obj = event.object;
        if(event.button == 0 && obj instanceof THREE.Mesh){
            setActiveObject_cb(props.file_id);
            obj.material = hoverMat;
        }else if(event.button == 2) {
            obj.rotation.y += Math.PI/4;
            updateObject_cb(props.file_id, undefined ,obj.rotation.y, false);
        }
    }

    const url = props.file_id.substring(0, props.file_id.lastIndexOf('-'));
  return (
    <Gltf castShadow
    receiveShadow
     ref={groupRef} src={url} 
    onPointerEnter={onEnter} 
    onPointerOut={onLeave} 
    onPointerDown={onMouseDown} 
    />
  )
}



