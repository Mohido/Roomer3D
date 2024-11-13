import { createContext, useCallback, useMemo , useState } from 'react';
import './App.css'
import Area3D from './components/3darea';
import { AreaItems } from './components/itemsarea';


export const AddedObjectContext = createContext<{
  sceneItems: string[];
  addObject: (object3d: string) => void;
}>(null!);


export const App = () => {

  const [sceneItems, setSceneItems] = useState<string[]>([]);

  // Change objectpath (adds object)
  const addObject = useCallback((object3d : string) => {
    setSceneItems((prev) => [...prev, object3d] );
  }, []);

  // Value of the context
  const contextValue = useMemo(() => ({
    sceneItems,
    addObject
  }), [sceneItems, addObject]);


  return (
    <div className='app'>
      {/* Navigation Menu */}

      {/* 3D Area */}
      <AddedObjectContext.Provider value={contextValue}>
        <Area3D />

        {/* Items Area */}
        <AreaItems />
      </AddedObjectContext.Provider>


    </div>
  )
}


