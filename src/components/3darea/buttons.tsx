import { useContext } from 'react';
import { SceneContext } from '../../App';
import {FaTrash} from 'react-icons/fa';


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
