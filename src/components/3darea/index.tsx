import  { useEffect, useRef , memo} from 'react';
import { Canvas } from '@react-three/fiber'
import "./index.css";
import { Room } from './room';
import { OrbitControls, OrthographicCamera } from '@react-three/drei'
import { DeleteButton } from './buttons';
import { SettingsButton } from '../settings';




const Area3D = memo(() => {
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
       <Canvas shadows>
          <OrthographicCamera makeDefault zoom={100} position={[2,2,2]}/>
          <ambientLight intensity={Math.PI / 2} />
          <directionalLight castShadow shadow-mapSize={2048} shadow-bias={-0.001} position={[-10, 10, -10]} intensity={Math.PI} > 
            {/* <orthographicCamera attach="shadow-camera" args={[-8.5, 8.5, 8.5, -8.5, 0.1, 20]} /> */}
          </directionalLight>
          <Room />
          <OrbitControls enablePan={false} enableRotate={false} enableDamping={false} enableZoom={true}/>
          {/* <OrbitControls /> */}
        </Canvas>

        <DeleteButton />
        <SettingsButton />
    </div>
  )
})

export default Area3D;