import React, {useState} from 'react';
import Colorbox from "./Colorbox";
import Navbar from "./Navbar";
import "./Palette.css";

function Palette(props) {
    // State of color level
    const [colorLevel, setColorLevel] = useState(500);
    // Used by slider to change the color brightness level
    function changeLevel(newLevel) {
        setColorLevel(newLevel);
    };
    // Sets the background color for each box
    const colorBoxes = props.palette.colors[colorLevel].map(color => (
        <Colorbox background={color.hex} name={color.name} />))

    return (
        <div className="Palette">
            {/*navbar here*/}
            <Navbar colorLevel={colorLevel} changeLevel={changeLevel}/>
            <div className="Palette-colors">
            {/*color boxes*/}
                {colorBoxes}
            </div>
        {/*    footer*/}
        </div>
    );
}

export default Palette;