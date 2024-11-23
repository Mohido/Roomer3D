import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import {App} from './App.tsx'
import { useGLTF } from '@react-three/drei';

useGLTF.preload('/plant_1/plant.glb');
useGLTF.preload('/chair_1/chair.glb');
useGLTF.preload('/chair_2/chair.glb');
useGLTF.preload('/bed_1/bed.glb');
useGLTF.preload('/bed_2/bed.glb');
useGLTF.preload('/table/table.glb');

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
