import { useState } from 'react';
import './App.css'
import Area3D from './components/3darea';
import { AreaItems } from './components/itemsarea';


function App() {
  const [fileurl, setFileurl] = useState('');

  return (
    <div className='app'>
      {/* Navigation Menu */}

      {/* 3D Area */}
      <Area3D fileurl={fileurl} />

      {/* Items Area */}
      <AreaItems onSelect={(fileurl) => {setFileurl(fileurl); setTimeout(()=> setFileurl(''), 1000)}}/>
    </div>
  )
}

export default App
