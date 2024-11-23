import { Gltf } from '@react-three/drei';
import { ThreeEvent } from '@react-three/fiber';
import { useContext, useEffect, useRef } from 'react'
import * as THREE from 'three';
import { SceneContext } from '../../App';

const hoverMat = new THREE.MeshLambertMaterial({color: new THREE.Color('green')});

export const GlbMesh = (props: {file_id: string, active : boolean}) => {
    const {setActiveObject_cb, objects, updateObject_cb} = useContext(SceneContext);
    const origMats = useRef<{ [uuid : string] : THREE.Material} >({});
    const groupRef = useRef<THREE.Group>(null!);

    const storeMats = () => {
        const g = groupRef.current;
        g && g.children.forEach((child) => {
            if(child instanceof THREE.Mesh){
                origMats.current[child.uuid] = child.material;
            }
        })
    }

    const loadMats = (original: boolean = true) => {
        const g = groupRef.current;
        g && g.children.forEach((child) => {
            if(child instanceof THREE.Mesh){
                child.material = original ? origMats.current[child.uuid] : hoverMat;
            }
        })
    }

    const rotate = () => {
        const g = groupRef.current;
        g && (g.rotation.y += Math.PI/4);
        updateObject_cb(props.file_id, undefined, g.rotation.y, false);
    }

    useEffect(() => {
        const g = groupRef.current;
        if(objects[props.file_id]){
            g.position.x = objects[props.file_id].position[0];
            g.position.z = objects[props.file_id].position[1];
            g.rotation.y = objects[props.file_id].rotation;
        }

        if(Object.keys(origMats.current).length === 0){
            storeMats();
        }else if(!props.active){
            loadMats(true);
        }
    } , [props.active, objects[props.file_id].rotation]);


    const onMouseDown =  (event: ThreeEvent<MouseEvent>) => {
        const g = groupRef.current;
        if(event.button == 0){
            setActiveObject_cb(props.file_id);
            loadMats(false);
        }else if(event.button == 2 || event.delta < 1) {
            rotate();
        }
    }

    const url = props.file_id.substring(0, props.file_id.lastIndexOf('-'));
  return (
    <Gltf castShadow
    receiveShadow
     ref={groupRef} src={url} 
    onPointerEnter={() => loadMats(false)} 
    onPointerOut={() => !props.active && loadMats(true)} 
    onPointerDown={onMouseDown} 
    />
  )
}



