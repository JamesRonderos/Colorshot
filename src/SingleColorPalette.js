import React, {useState} from "react";
import Colorbox from "./Colorbox";

function SingleColorPalette(props) {

    const [_shades, setShades] = useState(gatherShades(props.palette, props.colorId))

    function gatherShades(palette, colorToFilterBy) {
        let shades = [];
        let allColors = palette.colors;
        //return all shades of color

        for(let key in allColors){
            shades = shades.concat(
                allColors[key].filter( color => color.id === colorToFilterBy)
            )
        }

        return shades.slice(1);
    }
    const colorBoxes = _shades.map(color => (
        <Colorbox
            key={color.id}
            name={color.name}
            background={color.hex}
            showLink={false}
        />
    ));
    return (
        <div className="Palette">
            <h1>Single Color Palette</h1>
            <div className="Palette-colors">{colorBoxes}</div>
        </div>
    );
}
export default SingleColorPalette;