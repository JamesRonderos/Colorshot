import React, {useState} from 'react';
import Colorbox from "./Colorbox";
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
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
            <div className="slider">
            <Slider defaultValue={colorLevel} min={100} max={900} step={100} onAfterChange={changeLevel}/>
            </div>
            {/*navbar here*/}
            <div className="Palette-colors">
            {/*color boxes*/}
                {colorBoxes}
            </div>
        {/*    footer*/}
        </div>
    );
}

export default Palette;