import React, {useState} from 'react';
import Colorbox from "./Colorbox";
import "./Palette.css";
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';

function Palette(props) {
    const {colors} = props.palette.colors; // for easier use later
    // State of color level
    const [colorLevel, setColorLevel] = useState(500);
    // Used by slider to change the color brightness level
    function changeLevel(newLevel) {
        setColorLevel(newLevel);
    };
    // Sets the background color for each box
    const colorBoxes = colors[colorLevel].map(color => (
        <Colorbox background={color.hex} name={color.name} />))

    return (
        <div className="Palette">
            // Slider at top to change color brightness
            <Slider defaultValue={colorLevel} min={100} max={900} step={100} onAfterChange={changeLevel}/>
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