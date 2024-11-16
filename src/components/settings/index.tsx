import { useContext, useEffect, useRef, useState } from 'react';
import { FaGear } from "react-icons/fa6";
import { MdOutlineFileDownload, MdOutlineFileUpload  } from "react-icons/md";

import Modal from 'react-modal';
import './index.css';
import { DimInput } from '../dimslider';
import { RoomContext } from '../../App';



// TODO: Uploading and Downloading data...
// NOTE: Every time the menu opens, the entire component gets re-rendered!
export const SettingsButton = ()=>{
    const [activeMenu, setActiveMenu] = useState<boolean>(false);
    const {dims, setDims_cb} = useContext(RoomContext);
    const dimensions = [dims[0], dims[1]];

    const updateWidth_x = (v:number | number[]) => {
        if(typeof v == "number")
            dimensions[0] = v;
    }

    const updateWidth_y = (v:number | number[]) => {
        if(typeof v == "number")
            dimensions[1] = v;
    }

    const onSubmit = () => {
        setDims_cb(dimensions);
        setActiveMenu(false);
    }

    const onCancel = () => {
        setActiveMenu(false);
    }

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
                    <DimInput defaultState={dimensions[0]} label='Width' desc="Changes room width" onComplete={updateWidth_x} />
                    <DimInput defaultState={dimensions[1]} label='Length' desc="Changes room length" onComplete={updateWidth_y} />
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
                    <button className='load-button submit' onClick={onSubmit}>Submit</button>
                    <button className='load-button cancel' onClick={onCancel}>Cancel</button>
                </div>
            </Modal>
        </div>
        
    </>
}