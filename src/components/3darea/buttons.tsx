import { useContext } from 'react';
import { ActiveMeshContext, AddedObjectContext, ObjectsPositionsContext } from '../../App';
import {FaTrash} from 'react-icons/fa';


export const DeleteButton = ()=>{
    const {deleteObject} = useContext(AddedObjectContext);
    const {removePosition_cb} = useContext(ObjectsPositionsContext);
    const {activeMesh} = useContext(ActiveMeshContext);
    const onClick = () => {
        if(activeMesh.length > 0){
            deleteObject(activeMesh);
            removePosition_cb(activeMesh);
        }
    }
    if(activeMesh.length > 0)
        return <FaTrash className='button-meta delete-button' onClick={onClick}></FaTrash>
    return <></> 
}
