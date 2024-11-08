import { useEffect, useState } from 'react';


const Area3D = (props : {fileurl: string}) => {
    const [sceneItems, setSceneItems] = useState<string[]>([]);

    // Use SideEffect to track file url change.
    useEffect(() => {
        if(props.fileurl.length >= 0)
          setSceneItems([...sceneItems, props.fileurl]);
    }, [props.fileurl]);

  return (
    <>
        {sceneItems.map((value)=> <h1 key={value + '-' + Math.random()}>{value}</h1>)}
    </>
  )
}

export default Area3D;