import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import { useState } from 'react';
import './index.css';

export interface DimInputProps{
  label: string;
  onComplete: (v: number | number[]) => void;
  defaultState : number;
  desc: string;
}


export const DimInput = (props: DimInputProps) => {
  const [dim, setDim] = useState<number>(props.defaultState);
  return (
    <div className='dim-container'>
        <div className='dim-label'>
          <p>{props.label}</p>
          <span>{dim}</span>
        </div>
        <Slider 
          min={0} max={8} defaultValue={dim} 
          onChangeComplete={props.onComplete} 
          onChange={(v) => setDim(v as number)}/>

        <p className='dim-desc'>{props.desc}</p>
    </div>
  )
}
