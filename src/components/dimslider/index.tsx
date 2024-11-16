import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import { useState } from 'react';
import './index.css';

export interface DimInputProps{
  label: string;
  onComplete: (v: number | number[]) => void;
  desc: string;
}


export const DimInput = (props: DimInputProps) => {
  const [dim, setDim] = useState<number>(4);
  return (
    <div className='dim-container'>
        <div className='dim-label'>
          <p>{props.label}</p>
          <span>{dim}</span>
        </div>
        <Slider 
          min={0} max={8} defaultValue={4} 
          onChangeComplete={props.onComplete} 
          onChange={(v) => setDim(v as number)}/>

        <p className='dim-desc'>{props.desc}</p>
    </div>
  )
}
