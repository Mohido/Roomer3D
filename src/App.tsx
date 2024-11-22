import { createContext, useCallback, useEffect, useMemo , useState } from 'react';
import './App.css'
import Area3D from './components/3darea';
import { AreaItems } from './components/itemsarea';


// A list of the scene objects


export interface SceneObjectsTransforms {
  [mesh_id: string] : {position : number[], rotation: number};
}

export const SceneContext = createContext<{
  active: string;
  objects: SceneObjectsTransforms;
  dimensions: number[];
  updateObject_cb: (mesh_id: string, position?: number[], rotation?: number, force?: boolean) => boolean; // Adds/updates a mesh. Force would add it if it doesn't exist
  removeObject_cb: (mesh_id: string) => boolean;      // Removes a mesh
  clearObjects_cb : () => boolean;                    // clears the entire scene 
  setActiveObject_cb: (uuid: string) => boolean;           // Takes threejs mesh uuid.
  setDimensions_cb: (dim: number[]) => boolean;          // Takes threejs mesh uuid.
}>(null!);



export const App = () => {

  const [active, setActive] = useState<string>('');
  const [dimensions, setDimensions] = useState<number[]>([4,4]);
  const [objects, setTransforom] = useState<SceneObjectsTransforms>({});

  const setDimensions_cb = useCallback((dim:number[]) => {setDimensions(dim); return true;}, []);

  const updateObject_cb = useCallback((mesh_id: string, position?: number[], rotation?: number, force = true) => {
    if(!objects[mesh_id] && !force)
      return false;
    
    setTransforom( (prevState) => ({
      ...prevState, 
      [mesh_id] : {
        position: (position? position : (objects[mesh_id]?.position || [0,0]) ),
        rotation: (rotation? rotation : (objects[mesh_id]?.rotation || 0) ) 
      }
    }));
    return true;
  }, []);


  const removeObject_cb = useCallback((mesh_id: string) => {
      setActive('');  // Its always the selected active object gets deleted
      setTransforom(prevState => {
        delete prevState[mesh_id];
        return prevState;
      });
      return true;
  }, []); 

  // Will clear everything!
  const clearObjects_cb = useCallback(() => {setTransforom({}); return true;}, []);


  // Change objectpath (adds object)
  const setActiveObject_cb = useCallback((uuid: string) => {setActive(uuid); return true;}, []);



  // Value of the context
  const contextValue = useMemo(() => ({
    active, 
    dimensions,
    objects,
    updateObject_cb,
    removeObject_cb,
    clearObjects_cb,
    setActiveObject_cb,
    setDimensions_cb,
  }), [active, dimensions, objects, updateObject_cb, removeObject_cb, clearObjects_cb, setActiveObject_cb, setDimensions_cb]);



  return (
    <div className='app' >
      <SceneContext.Provider value={contextValue}>
          <Area3D />
          <AreaItems />
      </SceneContext.Provider>
    </div>
  )
}


