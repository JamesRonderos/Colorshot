import React, { Component } from 'react';
import Slider from "rc-slider";
import 'rc-slider/assets/index.css';
import "./Navbar.css"

function Navbar(props) {
    const {colorLevel, changeLevel} = props
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
        </header>
    )
}

export default Navbar;