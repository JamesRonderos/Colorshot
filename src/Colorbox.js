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
    },
    boxContent: {
        position: "absolute",
        width: "100%",
        left: "0px",
        bottom: "0px",
        padding: "10px",
        color: "black",
        letterSpacing: "1px",
        textTransform: "uppercase",
        fontSize: "12px"
    },
    copyOverlay: {
        opacity: "0",
        zIndex: "0",
        width: "100%",
        height: "100%",
        transition: "transform 0.5s ease-in-out",
        transform: "scale(0.1)"
    },
    showOverlay: {
        opacity: "1",
        transform: "scale(50)",
        zIndex: "10",
        position: "absolute",
    },
    copyMsg: {
        position: "fixed",
        left: "0",
        right: "0",
        top: "0",
        bottom: "0",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        fontSize: "3rem",
        transform: "scale(0.1)",
        opacity: "0",
        color: "white",
        "& h1": {
            fontWeight: "400",
            background: "rgba(255,255,255,0.2)",
            width: "100%",
            textAlign: "center",
            marginBottom: "0",
            padding: "1rem",
            textTransform: "uppercase",
        },
        "& p": {
            fontSize: "2rem",
            fontWeight: "100"
        }
    },
    showMessage: {
        opacity: "1",
        transform: "scale(1)",
        zIndex: "25",
        transition: "all 0.4s ease-in-out"
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
                <div style={{ background }} className={`${classes.copyOverlay} ${copied && classes.showOverlay}`} />
                <div className={`${classes.copyMsg} ${copied && classes.showMessage}`}>
                    <h1>Copied!</h1>
                    <p className={classes.copyText}>{ background }</p>
                </div>
                <div>
                    <div className={classes.boxContent}>
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
