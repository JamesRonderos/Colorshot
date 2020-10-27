import React from 'react';
import Colorbox from "./Colorbox";
import "./Palette.css";

function Palette(props) {

    const colorBoxes = props.palette.colors.map(color => (<Colorbox background={color.color} name={color.name} />))

    return (
        <div className="Palette">
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