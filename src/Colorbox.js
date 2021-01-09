import React, {useState} from 'react';
import CopytoClipboard from 'react-copy-to-clipboard'
import { Link } from "react-router-dom";
import { withStyles } from "@material-ui/styles";
import chroma from "chroma-js";

import "./Colorbox.css";

const styles = {
    ColorBox: {
        width: "20%",
        height: props => props.showingFullPalette ? "25%": "50%",
        margin: "0 auto",
        display: "inline-block",
        position: "relative",
        marginBottom: "-4px",
        "&:hover button": {
            opacity: "1"
        }
    },
    copyText: {
        color: props =>
            chroma(props.background).luminance() >= 0.59 ? "black": "white"
    },
    colorName: {
        color: props =>
            chroma(props.background).luminance() <= 0.116 ? "white": "black"
    },
    seeMore: {
        color: props =>
            chroma(props.background).luminance() >= 0.59 ? "black": "white",
        background: "rgba(255,255,255,0.3)",
        position: "absolute",
        border: "none",
        right: "0px",
        bottom: "0px",
        width: "60px",
        height: "30px",
        textAlign: "center",
        lineHeight: "30px",
        textTransform: "uppercase"
    },
    copyButton: {
        color: props =>
            chroma(props.background).luminance() >= 0.59 ? "black": "white",
        width: "100px",
        height: "30px",
        position: "absolute",
        display: "inline-block",
        top: "50%",
        left: "50%",
        marginLeft: "-50px",
        marginTop: "-15px",
        textAlign: "center",
        outline: "none",
        background: "rgba(255,255,255,0.3)",
        fontSize: "1rem",
        lineHeight: "30px",
        textTransform: "uppercase",
        border: "none",
        cursor: "pointer",
        textDecoration: "none",
        opacity: "0"
    }
}

function Colorbox(props) {
    const { name, background, paletteId, id, showingFullPalette, moreUrl, classes } = props
    const [copied, setCopied] = useState(false);

    function changeCopyState() {
        setCopied(true)
        setTimeout(() => setCopied(false), 1000);
    };

    return (
        <CopytoClipboard text={ background } onCopy={changeCopyState}>
            <div style={{ background }} className={classes.ColorBox} >
                <div style={{ background }} className={`copy-overlay ${copied && "show"}`} />
                <div className="copy-msg" className={`copy-msg ${copied && "show"}`}>
                    <h1>Copied!</h1>
                    <p className={classes.copyText}>{ background }</p>
                </div>
                <div className="copy-container">
                    <div className="box-content">
                        <span className={classes.colorName}>
                            { name }
                        </span>
                    </div>
                    <button className={classes.copyButton}>Copy</button>
                </div>
                {showingFullPalette && (
                <Link to={moreUrl} onClick={e => e.stopPropagation()}>
                <span className={classes.seeMore}>MORE</span>
                </Link>
                )}
            </div>
        </CopytoClipboard>
    );
}

export default withStyles(styles)(Colorbox);
