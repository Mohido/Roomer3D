import { useContext, useState } from 'react';
import { FaGear } from "react-icons/fa6";
import Modal from 'react-modal';
import './index.css';


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
                <h1 className='modal-title'>Settings</h1>
                <div className='subtitle-header'>
                    <h2 className='modal-subtitle'>Room Dimensions</h2>
                    <span className='line'></span>
                </div>

                <div className='subtitle-content'>
                    <div>
                        <label htmlFor="dimension">Width</label>
                        <input name='dimension' type='number'/>
                    </div>

                    <div>
                        <label htmlFor="dimension">Depth</label>
                        <input name='dimension' type='number'/>
                    </div>
                </div>
                    
                    


                <div className='subtitle-header'>
                    <h2 className='modal-subtitle'>Room Dimensions</h2>
                    <span className='line'></span>
                </div>
                <div className='subtitle-content'>
                    <button>Save</button>
                    <button>Load</button>
                </div>
                    
                <div className='subtitle-header'>
                    <span className='line'></span>
                </div>
                <div className='subtitle-content'>
                    <button onClick={() => setActiveMenu(false)}>Submit</button>
                    <button onClick={() => setActiveMenu(false)}>Cancel</button>
                </div>
            </Modal>
        </div>
        
    </>
}