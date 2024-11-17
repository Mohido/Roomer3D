import { createContext, useCallback, useMemo , useState } from 'react';
import './App.css'
import Area3D from './components/3darea';
import { AreaItems } from './components/itemsarea';


// A list of the scene objects
export const AddedObjectContext = createContext<{
  sceneItems: string[];
  addObject: (object3d: string) => void;
  deleteObject: (url_key : string) => void;
}>(null!);

// Handles the positions of the scene objects
export const ObjectsPositionsContext = createContext<{
  positions: {[mesh_id: string] : number[]};        // meshname_123451 -> [0,1]
  updatePosition_cb: (mesh_id: string, newPos : number[]) => void; // Adds or updates position
  removePosition_cb: (mesh_id: string) => void;  // Removes a mesh
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
  const [positions, setPos] = useState<{[mesh_id: string] : number[]}>({});

  const setDims_cb = useCallback((dim:number[]) => {setDims(dim)}, []);

  const updatePosition_cb = (mesh_id: string, newPos : number[]) => {
    const t = positions;
    t[mesh_id] = newPos;
    setPos({...t})
    console.log('Adding mesh position: ', positions)
  };
  const removePosition_cb = (mesh_id: string) => {
      const n = positions;
      delete n[mesh_id];
      console.log('Removed mesh_id ', mesh_id, ' from positions: ', n);
      setPos(n);
  }; 




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

  const positionCtxtValue = useMemo(() => ({
    positions,
    removePosition_cb,
    updatePosition_cb
  }), [positions, removePosition_cb, updatePosition_cb]);



  return (
    <div className='app'>
      {/* Navigation Menu */}

      {/* 3D Area */}
      <AddedObjectContext.Provider value={contextValue}>
        <ActiveMeshContext.Provider value={ActivateMesh_ctxt}>
          <RoomContext.Provider value={RoomContext_ctxt}>
           <ObjectsPositionsContext.Provider value={positionCtxtValue}>
            <Area3D />
           </ObjectsPositionsContext.Provider>
          </RoomContext.Provider>
        </ActiveMeshContext.Provider>
        {/* Items Area */}
        <AreaItems />
      </AddedObjectContext.Provider>
    </div>
  )
}


