import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import {App} from './App.tsx'
import { useGLTF } from '@react-three/drei';

if(window.location.href.toLowerCase().includes('github')){
  useGLTF.preload('/roomer3d-demo/plant_1/plant.glb');
  useGLTF.preload('/roomer3d-demo/chair_1/chair.glb');
  useGLTF.preload('/roomer3d-demo/chair_2/chair.glb');
  useGLTF.preload('/roomer3d-demo/bed_1/bed.glb');
  useGLTF.preload('/roomer3d-demo/bed_2/bed.glb');
  useGLTF.preload('/roomer3d-demo/table/table.glb');
  useGLTF.preload('/roomer3d-demo/window/window.glb');
}



createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
