import { createContext, useCallback, useMemo , useState } from 'react';
import './App.css'
import Area3D from './components/3darea';
import { AreaItems } from './components/itemsarea';


const AddedObjectContext = createContext<any>(null);


const App = () => {
  const [objectPath, setObjectPath] = useState<string>('');

  // Change objectpath (adds object)
  const setObject = useCallback((object3d : string) => {
    setObjectPath(object3d)
  }, []);

  // Value of the context
  const contextValue = useMemo(() => ({
    objectPath,
    setObject
  }), [objectPath, setObject]);


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


export default App;

