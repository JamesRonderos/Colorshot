import React, { useState } from "react";
import { Component } from "react";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Slider from "rc-slider";
import 'rc-slider/assets/index.css';
import "./Navbar.css"

function Navbar(props) {
    const {colorLevel, changeLevel, handleFormatChange} = props
    const [colorFormat, setColorFormat] = useState("hex");

    function handleChange(e) {
        setColorFormat(e.target.value)
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
        </header>
    )
}

export default Navbar;