import React, {useState} from 'react';
import Colorbox from "./Colorbox";
import Navbar from "./Navbar";
import "./Palette.css";

function Palette(props) {
    // State of color level
    const [colorLevel, setColorLevel] = useState(500);
    const [format, setFormat] = useState("hex");

    // Used by slider to change the color brightness level
    function changeLevel(newLevel) {
        setColorLevel(newLevel);
    };

    // Change the color display format, HEX, RGB, RGBA
    function changeColorFormat(val) {
        setFormat(val)
    }

    // Sets the background color for each box
    const colorBoxes = props.palette.colors[colorLevel].map(color => (
        <Colorbox background={color[format]} name={color.name} />))

    return (
        <div className="Palette">
            {/*navbar here*/}
            <Navbar colorLevel={colorLevel} changeLevel={changeLevel} handleFormatChange={changeColorFormat}/>
            <div className="Palette-colors">
            {/*color boxes*/}
                {colorBoxes}
            </div>
        {/*    footer*/}
        </div>
    );
}

export default Palette;