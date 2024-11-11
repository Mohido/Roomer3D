import  { useEffect, useRef , memo, useState} from 'react';
import { Canvas } from '@react-three/fiber'
import "./index.css";
import { Room } from './room';
import { OrbitControls, OrthographicCamera } from '@react-three/drei'
import { Item3D } from './item3d';


const Area3D = () => {
  const areaDiv = useRef(null);

  const calcSize = () => (window.innerHeight > window.innerWidth)? document.body.clientWidth : document.body.clientHeight;

  // Use SideEffect to track fileurl change.
  useEffect(() => {
    if(!areaDiv.current)
      return;
    const size = calcSize();
    const element = (areaDiv.current as HTMLDivElement)
    element.style.minWidth = size + "px";
    element.style.height = size + "px";
  }, []);

  // Forcing a square shape DivElement
  window.addEventListener('resize', () => {
    if(!areaDiv.current)
      return;
    const size = calcSize();
    const element = (areaDiv.current as HTMLDivElement)
    element.style.minWidth = size + "px";
    element.style.height = size + "px";
  })

  return (
    <div className='area3d'
    style={{
        minWidth: calcSize(),
        height: calcSize()
      }} 
    ref={areaDiv}> 
       <Canvas>
          <OrthographicCamera makeDefault zoom={400} position={[2,2,2]}/>
          <ambientLight intensity={Math.PI / 2} />
          <directionalLight position={[-10, 10, -10]} intensity={Math.PI} />
          <Room dimensions={[1,1]}/>
          <OrbitControls enablePan={false} enableRotate={false} enableDamping={false} enableZoom={true}/>
        </Canvas>
    </div>
  )
}

export default Area3D;