import { useEffect } from 'react';


const Area3D = (props : {fileurl: string}) => {

        
    // Use SideEffect to track file url change.
    useEffect(() => {
        console.log("File URL has changed, Adding new item 2 the scene...");
    }, [props.fileurl]);

  return (
    <>
        <h1>Some Scene</h1>
    </>
  )
}

export default Area3D;