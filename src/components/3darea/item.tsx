import { Gltf, useGLTF } from '@react-three/drei';
import { ThreeEvent } from '@react-three/fiber';
import React, { useContext, useEffect, useMemo, useRef } from 'react'
import * as THREE from 'three';
import { ActiveMeshContext } from '../../App';


export const GlbMesh = (props: {file_id: string}) => {
    const {activeMesh, setActiveMesh_cb} = useContext(ActiveMeshContext);
    // const origMat = useMemo(() => useRef<THREE.Material | null>(null), []);
    const origMat = useRef<THREE.Material | null>(null);
    const hoverMat = new THREE.MeshLambertMaterial({color: new THREE.Color('green')});
    const groupRef = useRef(null!);


    useEffect(() => {
        const g = (groupRef.current as THREE.Group);
        if(origMat.current === null){
            g.children.forEach((child) => {
                if(child instanceof THREE.Mesh){
                    origMat.current = child.material;
                }
            })
        }else if(activeMesh != props.file_id){
            g.children.forEach((child) => {
                if(child instanceof THREE.Mesh){
                    child.material = origMat.current;
                }
            })
        }
    } , [activeMesh]);

    const onEnter = (event: ThreeEvent<PointerEvent>) => {
        const obj = event.object;
        if(obj instanceof THREE.Mesh){
            obj.material = hoverMat;
        }
    }

    const onLeave = (event: ThreeEvent<PointerEvent>) => {
        const obj = event.object;
        if(obj instanceof THREE.Mesh && props.file_id !== activeMesh){
            obj.material = origMat.current;
        }
    }

    const onClick =  (event: ThreeEvent<MouseEvent>) => {
        const obj = event.object;
        if(obj instanceof THREE.Mesh){
            obj.material = hoverMat;
        }
        setActiveMesh_cb(props.file_id);
        console.log('Clicked Mesh')
        event.stopPropagation();
    }

    const url = props.file_id.substring(0, props.file_id.lastIndexOf('-'));
  return (
    <Gltf ref={groupRef} src={url} onPointerEnter={onEnter} onPointerOut={onLeave} onClick={onClick}/>
  )
}



useGLTF.preload('/1x1box.glb');