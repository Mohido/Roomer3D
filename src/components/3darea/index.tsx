import  { useEffect, useRef , memo, useContext} from 'react';
import {FaTrash} from 'react-icons/fa';
import { Canvas } from '@react-three/fiber'
import "./index.css";
import { Room } from './room';
import { OrbitControls, OrthographicCamera } from '@react-three/drei'
import { ActiveMeshContext, AddedObjectContext } from '../../App';


const DeleteButton = ()=>{

  const {deleteObject} = useContext(AddedObjectContext);
  const {activeMesh} = useContext(ActiveMeshContext);

  const onClick = () => {
    if(activeMesh.length > 0){
      deleteObject(activeMesh);
    }
  }

  return <FaTrash className='delete-button' onClick={onClick}></FaTrash>
}

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
       <Canvas>
          <OrthographicCamera makeDefault zoom={100} position={[2,2,2]}/>
          <ambientLight intensity={Math.PI / 2} />
          <directionalLight position={[-10, 10, -10]} intensity={Math.PI} />
          <Room/>
          <OrbitControls enablePan={false} enableRotate={false} enableDamping={false} enableZoom={true}/>
          {/* <OrbitControls /> */}
        </Canvas>

        <DeleteButton />
    </div>
  )
})

export default Area3D;