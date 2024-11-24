import { useContext, useRef, useState } from 'react';
import { FaGear } from "react-icons/fa6";
import { MdOutlineFileDownload, MdOutlineFileUpload  } from "react-icons/md";

import Modal from 'react-modal';
import './index.css';
import { DimInput } from '../dimslider';
import { SceneContext } from '../../App';
import { saveAs } from 'file-saver';


interface SaveFileStruct {
    objects:  {[mesh_id: string]: {position: number[], rotation: number}};
    dimensions : number[];
}


// TODO: Uploading and Downloading data...
// NOTE: Every time the menu opens, the entire component gets re-rendered!
export const SettingsButton = ()=>{
    const [activeMenu, setActiveMenu] = useState<boolean>(false);
    const {dimensions, setDimensions_cb,  objects, updateObject_cb, clearObjects_cb} = useContext(SceneContext);
    const m_dimensions = [dimensions[0], dimensions[1]]; // local demensions
    const fileRef = useRef<HTMLInputElement>(null!);
    const [file, setFile] = useState<File | undefined | null>();


    const updateWidth_x = (v:number | number[]) => {
        if(typeof v == "number")
            m_dimensions[0] = v;
    }

    const updateWidth_y = (v:number | number[]) => {
        if(typeof v == "number")
            m_dimensions[1] = v;
    }

    const onSubmit = () => {
        if(file){
            // Remove old scene
            clearObjects_cb(); 

            // Refill scene
            file.arrayBuffer().then((a) => {
                // Decode arraybuffer.
                const data : SaveFileStruct = JSON.parse(new TextDecoder().decode(a));

                // Add Objects to scene
                Object.entries(data.objects).forEach(([name, transform])=> {
                    updateObject_cb(name, transform.position, transform.rotation, true);
                })

                // Set Room Dimensions
                setDimensions_cb(data.dimensions); 
                setFile(null);
            })
        }else{
            setDimensions_cb(m_dimensions);
        }

        setActiveMenu(false);
    }

    const onCancel = () => {
        setActiveMenu(false);
        setFile(null);
    }

    const onSave = () => {
        const data : SaveFileStruct = {objects , dimensions};
        const fileToSave = new Blob([JSON.stringify(data)], {
            type: 'application/json'
        });
        saveAs(fileToSave, 'scene.json');
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
                    <h2 className='modal-subtitle'>Scene</h2>
                    <span className='line'></span>
                </div>

                <div className='subtitle-content'>
                    <button onClick={onSave} className='load-button'>
                        <MdOutlineFileDownload className='button-icon'/>
                        <span>Save</span>
                    </button>
                    <button onClick={()=> fileRef.current.click()} className='load-button'>
                        <MdOutlineFileUpload className='button-icon' />
                        <span>Load <h6>{file && file.name}</h6></span>
                    </button>
                </div>
                    
                <div className='subtitle-header'>
                    <span className='line'></span>
                </div>

                <div className='footer'>
                    <button className='load-button submit' onClick={onSubmit}>Submit</button>
                    <button className='load-button cancel' onClick={onCancel}>Cancel</button>
                </div>
                <input 
                    onChange={()=> setFile(fileRef.current.files?.item(0))} 
                    ref={fileRef} type='file' hidden/>
            </Modal>
        </div>
        
    </>
}