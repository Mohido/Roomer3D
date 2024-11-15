import { useContext } from 'react';
import { ActiveMeshContext, AddedObjectContext } from '../../App';
import {FaTrash} from 'react-icons/fa';


export const DeleteButton = ()=>{
    const {deleteObject} = useContext(AddedObjectContext);
    const {activeMesh} = useContext(ActiveMeshContext);
    const onClick = () => {
        if(activeMesh.length > 0){
        deleteObject(activeMesh);
        }
    }
    if(activeMesh.length > 0)
        return <FaTrash className='button-meta delete-button' onClick={onClick}></FaTrash>
    return <></> 
}
