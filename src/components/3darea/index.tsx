import  { useEffect, useRef, useState } from 'react';
import { Canvas } from '@react-three/fiber'
import "./index.css";
import { Room } from './room';
import { OrbitControls, OrthographicCamera } from '@react-three/drei'


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