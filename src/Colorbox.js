import React, {useState} from 'react';
import CopytoClipboard from 'react-copy-to-clipboard'
import { Link } from "react-router-dom";
import chroma from "chroma-js";
import "./Colorbox.css";

function Colorbox(props) {
    const { name, background, paletteId, id, showLink, moreUrl } = props
    const [copied, setCopied] = useState(false);
    const isDarkColor = chroma(background).luminance() <= 0.116;
    const isLightColor = chroma(background).luminance() >= 0.59;

    function changeCopyState() {
        setCopied(true)
        setTimeout(() => setCopied(false), 1000);
    };

    return (
        <CopytoClipboard text={ background } onCopy={changeCopyState}>
            <div style={{ background }} className="ColorBox" >
                <div style={{ background }} className={`copy-overlay ${copied && "show"}`} />
                <div className="copy-msg" className={`copy-msg ${copied && "show"}`}>
                    <h1>Copied!</h1>
                    <p className={isLightColor && "dark-text"}>{ background }</p>
                </div>
                <div className="copy-container">
                    <div className="box-content">
                        <span className={isDarkColor && "light-text"}>
                            { name }
                        </span>
                    </div>
                    <button className={`copy-button ${isLightColor && "dark-text"}`}>Copy</button>
                </div>
                {showLink && (
                <Link to={moreUrl} onClick={e => e.stopPropagation()}>
                <span className={`see-more ${isLightColor && "dark-text"}`}>MORE</span>
                </Link>
                )}
            </div>
        </CopytoClipboard>
    );
}

export default Colorbox;
