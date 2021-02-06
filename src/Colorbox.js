import React, { useState } from 'react';
import CopytoClipboard from 'react-copy-to-clipboard';
import { Link } from "react-router-dom";
import styles from "./styles/ColorBoxStyles"
import { withStyles } from "@material-ui/styles";
import classNames from "classnames";


function Colorbox(props) {
    const { name, background, paletteId, id, showingFullPalette, moreUrl, classes } = props
    const [copied, setCopied] = useState(false);

    function changeCopyState() {
        setCopied(true)
        setTimeout(() => setCopied(false), 1000);
    };

    return (
        <CopytoClipboard text={background} onCopy={changeCopyState}>
            <div style={{ background }} className={classes.ColorBox}>
                <div style={{ background }}
                     className={classNames(classes.copyOverlay, { [classes.showOverlay]: copied })}/>
                <div className={classNames(classes.copyMsg, { [classes.showMessage]: copied })}>
                    <h1>Copied!</h1>
                    <p className={classes.copyText}>{background}</p>
                </div>
                <div>
                    <div className={classes.boxContent}>
                        <span className={classes.colorName}>
                            {name}
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
