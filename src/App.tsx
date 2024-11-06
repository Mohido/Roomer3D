import { useState } from 'react';
import './App.css'
import Area3D from './components/3darea';
import { AreaItems } from './components/itemsarea';


function App() {
  const [fileurl, setFileurl] = useState('');

  return (
    <>
      {/* Navigation Menu */}

      {/* 3D Area */}
      <Area3D fileurl={fileurl} />

      {/* Items Area */}
      <AreaItems onSelect={(item) => {console.log(item); setFileurl(item)}}/>
    </>
  )
}

export default App
