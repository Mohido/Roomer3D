import { useContext, useState } from 'react';
import { FaGear } from "react-icons/fa6";
import { MdOutlineFileDownload, MdOutlineFileUpload  } from "react-icons/md";

import Modal from 'react-modal';
import './index.css';
import { DimInput } from '../dimslider';


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
                    <DimInput label='Width' desc="Changes room width" onComplete={(v) => console.log(v)} />
                    <DimInput label='Length' desc="Changes room length" onComplete={(v) => console.log(v)} />
                </div>

                <div className='subtitle-header'>
                    <h2 className='modal-subtitle'>Room Dimensions</h2>
                    <span className='line'></span>
                </div>

                <div className='subtitle-content'>
                    <button className='load-button'>
                        <MdOutlineFileDownload className='button-icon'/>
                        <span>Save</span>
                    </button>
                    <button className='load-button'>
                        <MdOutlineFileUpload className='button-icon' />
                        <span>Load</span>
                    </button>
                </div>
                    
                <div className='subtitle-header'>
                    <span className='line'></span>
                </div>

                <div className='footer'>
                    <button className='load-button submit' onClick={() => setActiveMenu(false)}>Submit</button>
                    <button className='load-button cancel' onClick={() => setActiveMenu(false)}>Cancel</button>
                </div>
            </Modal>
        </div>
        
    </>
}