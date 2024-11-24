import { useContext } from 'react';
import { SceneContext } from '../../App';
import {FaTrash} from 'react-icons/fa';
import { FaRotateLeft } from "react-icons/fa6";


export const DeleteButton = ()=>{
    const {active, removeObject_cb} = useContext(SceneContext);
    const onClick = () => {
        if(active.length > 0){
            removeObject_cb(active);
        }
    }
    if(active.length > 0)
        return <FaTrash className='button-meta delete-button' onClick={onClick}></FaTrash>
    return <></> 
}


export const RotateButton = () => {
    const {active, objects, updateObject_cb} = useContext(SceneContext);
    const onClick = () => {
        if(active.length > 0){
            updateObject_cb(active, undefined, objects[active].rotation + Math.PI/4, false);
        }
    }
    if(active.length > 0)
        return <FaRotateLeft className='button-meta rotate-button' onClick={onClick}></FaRotateLeft>
    return <></> 

}

