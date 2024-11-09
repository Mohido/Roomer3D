import  { useEffect, useRef, useState } from 'react';
import { Canvas } from '@react-three/fiber'
import "./index.css";
import { Box } from './box';

const Area3D = (props : {fileurl: string}) => {
  const [sceneItems, setSceneItems] = useState<string[]>([]);
  const areaDiv = useRef(null);
  
  const calcSize = () => (window.innerHeight > window.innerWidth)? document.body.clientWidth : document.body.clientHeight;

  // Use SideEffect to track fileurl change.
  useEffect(() => {
      if(props.fileurl.length >= 0)
        setSceneItems([...sceneItems, props.fileurl]);
  }, [props.fileurl]);
  
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
        height: calcSize(),
      }} 
    ref={areaDiv}> 
       <Canvas>
          <ambientLight intensity={Math.PI / 2} />
          <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} decay={0} intensity={Math.PI} />
          <pointLight position={[-10, -10, -10]} decay={0} intensity={Math.PI} />
          <Box position={[-1.2, 0, 0]} />
          <Box position={[1.2, 0, 0]} />
        </Canvas>
    </div>
  )
}

export default Area3D;