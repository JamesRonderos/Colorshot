import React, { useState } from "react";
import { Link } from "react-router-dom";
import { withStyles } from "@material-ui/styles";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Snackbar from "@material-ui/core/Snackbar";
import CloseIcon from "@material-ui/icons/Close";
import IconButton from "@material-ui/core/IconButton";
import Slider from "rc-slider";

import styles from "./styles/NavbarStyles";
import 'rc-slider/assets/index.css';


function Navbar(props) {
    const {colorLevel, changeLevel, handleFormatChange, showingAllColors, classes} = props
    const [colorFormat, setColorFormat] = useState("hex");
    const [isOpen, setIsOpen] = useState( false );

    // close format change popup notification
    function closeSnackbar(){
        setIsOpen( false );
    }

    // Handle selection changes from hex, rgb, rgba
    function handleChange(e) {
        setColorFormat(e.target.value)
        setIsOpen(true)
        handleFormatChange(e.target.value)
    }

    return(
        <header className={classes.Navbar}>
            <div className={classes.logo}>
                <Link to='/'>ColorShot</Link>
            </div>

            {/* Dont show brightness slider if on single color page */}
            {showingAllColors && (
            <div>
                <span>Level: {colorLevel}</span>
                <div className={classes.slider}>
                    <Slider defaultValue={colorLevel} min={100} max={900} step={100} onAfterChange={changeLevel}/>
                </div>
            </div>
            )}

            <div className={classes.selectContainer}>
                <Select value={colorFormat} onChange={handleChange}>
                    <MenuItem value="hex">HEX - #ffffff</MenuItem>
                    <MenuItem value="rgb">RGB - rgb(255,255,255)</MenuItem>
                    <MenuItem value="rgba">RGBA - rgba(255,255,255, 1.0)</MenuItem>
                </Select>
            </div>

            <Snackbar anchorOrigin={{vertical: "bottom", horizontal: "center"}}
                      open={isOpen}
                      autoHideDuration={3000}
                      message={<span id='message-id'>Format changed to {colorFormat.toUpperCase()}.</span>}
                      ContentProps={{"aria-describedby": "message-id"}}
                      onClose={closeSnackbar}
                      action={[
                          <IconButton onClick={closeSnackbar} color="inherit" key="close" aria-label="close">
                              <CloseIcon />
                          </IconButton>
                      ]}
            />
        </header>
    )
}

export default withStyles(styles)(Navbar);