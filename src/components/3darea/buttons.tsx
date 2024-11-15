import { useContext, useState } from 'react';
import { ActiveMeshContext, AddedObjectContext } from '../../App';
import {FaTrash} from 'react-icons/fa';
import { FaGear } from "react-icons/fa6";
import Modal from 'react-modal';

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

// TODO: Move to its own module
// TODO: Make it pretty
// TODO: Make it functional
export const SettingsButton = ()=>{
    const [activeMenu, setActiveMenu] = useState<boolean>(false);
    
    return <>
        {/* Settings Button */}
        <FaGear onClick={()=> setActiveMenu(true)}  className='button-meta gear-button'/>

        {/* Pop Up Modal */}
        <div className='settings'>
            <Modal
            isOpen={activeMenu}
            onRequestClose={() => setActiveMenu(false)}
            // style={customStyles}
            ariaHideApp={false}
            className="modal-menu"
            contentLabel="Main Menu">
                <h2>Room Settings</h2>
                <hr />
                <h3>Room Dimensions</h3>
                    <div>
                        <label htmlFor="dimension">Width</label>
                        <input name='dimension' type='number'/>
                    </div>

                    <div>
                        <label htmlFor="dimension">Depth</label>
                        <input name='dimension' type='number'/>
                    </div>
                    <hr />
                    <h3>Import/Export Options</h3>
                    <input type='file' placeholder='Click To Import' />
                    <button>Export</button>
                    <hr />
                    <button onClick={() => setActiveMenu(false)}>close</button>
            </Modal>
        </div>
        
    </>
}