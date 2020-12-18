import React from 'react';
import CopytoClipboard from 'react-copy-to-clipboard'
import "./Colorbox.css";

function Colorbox(props) {
    const { name, background } = props
    return (
        <CopytoClipboard text={ background }>
        <div style={{ background }} className="ColorBox" >
            <div className="copy-container">
                <div className="box-content">
                    <span>{ name }</span>
                </div>
                <button className="copy-button">Copy</button>
            </div>
            <span className='see-more'>More</span>
        </div>
        </CopytoClipboard>
    );
}

export default Colorbox;
