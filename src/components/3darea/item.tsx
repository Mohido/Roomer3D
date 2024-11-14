import { Gltf, useGLTF } from '@react-three/drei';
import { ThreeEvent } from '@react-three/fiber';
import React, { useContext, useRef } from 'react'
import * as THREE from 'three';
import { ActiveMeshContext } from '../../App';


export const GlbMesh = (props: {file_id: string}) => {
    const {setActiveMesh_cb} = useContext(ActiveMeshContext);
    
    const origMat = useRef<THREE.Material | null>(null);
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

    const url = props.file_id.substring(0, props.file_id.lastIndexOf('-'));
  return (
    <Gltf src={url} onPointerEnter={onEnter} onPointerOut={onLeave} onClick={()=>setActiveMesh_cb(props.file_id)}/>
  )
}



useGLTF.preload('/1x1box.glb');