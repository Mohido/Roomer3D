import { useEffect, useRef, useState } from 'react';
import "./index.css";

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
        // backgroundColor: 'green'  // For debuggin...
      }} 
      ref={areaDiv}>
        {sceneItems.map((value)=> <h1 key={value + '-' + Math.random()}>{value}</h1>)}
    </div>
  )
}

export default Area3D;