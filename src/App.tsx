import { createContext, useCallback, useMemo , useState } from 'react';
import './App.css'
import Area3D from './components/3darea';
import { AreaItems } from './components/itemsarea';


export const AddedObjectContext = createContext<{
  sceneItems: string[];
  addObject: (object3d: string) => void;
  deleteObject: (url_key : string) => void;
}>(null!);

export const ActiveMeshContext = createContext<{
  activeMesh: string;
  setActiveMesh_cb: (uuid: string) => void;    // Takes threejs mesh uuid.
}>(null!);

export const RoomContext = createContext<{
  dims: number[];
  setDims_cb: (dim: number[]) => void;    // Takes threejs mesh uuid.
}>(null!);


export const App = () => {

  const [sceneItems, setSceneItems] = useState<string[]>([]);
  const [activeMesh, setActiveMesh] = useState<string>('');
  const [dims, setDims] = useState<number[]>([4,4]);

  const setDims_cb = useCallback((dim:number[]) => {setDims(dim)}, []);

  // Change objectpath (adds object)
  const setActiveMesh_cb = useCallback((uuid: string) => {setActiveMesh(uuid)}, []);
  const addObject = useCallback((object3d : string) => {
    setSceneItems((prev) => [...prev, object3d] );
  }, []);

  const deleteObject = useCallback((object3d : string) => {
    setActiveMesh('');
    setSceneItems((prev) => prev.filter((v) => v != object3d) );
  }, []);

  // Value of the context
  const contextValue = useMemo(() => ({
    sceneItems,
    addObject,
    deleteObject
  }), [sceneItems, addObject, deleteObject]);

  const ActivateMesh_ctxt = useMemo(() => ({
    activeMesh,
    setActiveMesh_cb
  }), [activeMesh, setActiveMesh_cb]);

  const RoomContext_ctxt = useMemo(()=>({ 
    dims,
    setDims_cb
  }), [dims, setDims_cb])

  return (
    <div className='app'>
      {/* Navigation Menu */}

      {/* 3D Area */}
      <AddedObjectContext.Provider value={contextValue}>
        <ActiveMeshContext.Provider value={ActivateMesh_ctxt}>
          <RoomContext.Provider value={RoomContext_ctxt}>
            <Area3D />
          </RoomContext.Provider>
        </ActiveMeshContext.Provider>
        {/* Items Area */}
        <AreaItems />
      </AddedObjectContext.Provider>
    </div>
  )
}


