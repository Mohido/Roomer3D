import { useState } from 'react';
import {FaQuestion} from 'react-icons/fa';
import Modal from 'react-modal';
import './index.css';


export const HelpButton = ()=>{
    const [active, setActive] = useState(false);

    return <>
        <FaQuestion className='button-meta help-button' onClick={() => setActive(true)}></FaQuestion>

        <div className='settings'>
            <Modal
            isOpen={active}
            onRequestClose={() => setActive(false)}
            // style={customStyles}
            ariaHideApp={false}
            className="modal-menu"
            contentLabel="Main Menu">
                <h1 className='modal-title'>Help</h1>


                <div className='subtitle-header'>
                    <h2 className='modal-subtitle'>Mouse Events</h2>
                    <span className='line'></span>
                </div>

                <div className='subtitle-content'>
                    <div className="help-box"><h4>Rotate Object</h4><p>Right Mouse Click</p><p>Left Mouse Double Click</p></div>
                    <div className="help-box"><h4>Activate Object</h4>Left Mouse Click</div>
                    <div className="help-box"><h4>Move Object</h4>Left Mouse Drag</div>
                    <div className="help-box"><h4>Zooming</h4>Middle-Mouse Roll</div>
                </div>


                <div className='subtitle-header'>
                    <h2 className='modal-subtitle'>General</h2>
                    <span className='line'></span>
                </div>

                <div className='subtitle-content'>
                    <div className="help-box"><h4>Change Room Size</h4>From Settings Icon</div>
                    <div className="help-box"><h4>Save or Load Scene</h4>From Settings Icon</div>
                    <div className="help-box"><h4>Add Object</h4>Click Object From Menu</div>
                </div>


                <div className='footer'>
                    <button className='load-button cancel' onClick={()=> setActive(false)}>Cancel</button>
                </div>
            </Modal>
        </div>
    </>
}