import React, { useState } from "react";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Snackbar from "@material-ui/core/Snackbar";
import CloseIcon from "@material-ui/icons/Close";
import IconButton from "@material-ui/core/IconButton";
import Slider from "rc-slider";
import 'rc-slider/assets/index.css';
import "./Navbar.css"

function Navbar(props) {
    const {colorLevel, changeLevel, handleFormatChange} = props
    const [colorFormat, setColorFormat] = useState("hex");
    const [isOpen, setIsOpen] = useState( false );

    function closeSnackbar(){
        setIsOpen( false );
    }

    function handleChange(e) {
        setColorFormat(e.target.value)
        setIsOpen(true)
        handleFormatChange(e.target.value)
    }

    return(
        <header className="Navbar">
            <div className="logo">
                <a href="#">ColorShot</a>
            </div>
            <div className="sliderContainer">
                <span>Level: {colorLevel}</span>
                <div className="slider">
                    <Slider defaultValue={colorLevel} min={100} max={900} step={100} onAfterChange={changeLevel}/>
                </div>
            </div>
            <div className="select-container">
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

export default Navbar;