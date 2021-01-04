import React, {useState} from "react";
import Colorbox from "./Colorbox";
import Navbar from "./Navbar";
import PaletteFooter from "./PaletteFooter";

function SingleColorPalette(props) {

    const { paletteName, emoji } = props.palette;
    const [_shades, setShades] = useState(gatherShades(props.palette, props.colorId))
    const [format, setFormat] = useState("hex");

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

    // Change the color display format, HEX, RGB, RGBA
    function changeColorFormat(val) {
        setFormat(val)
    }
    const colorBoxes = _shades.map(color => (
        <Colorbox
            key={color.id}
            name={color.name}
            background={color[format]}
            showLink={false}
        />
    ));
    return (
        <div className="Palette">
            <Navbar handleFormatChange={changeColorFormat} showingAllColors={false}/>
            <div className="Palette-colors">{colorBoxes}</div>
            <PaletteFooter paletteName={paletteName} emoji={emoji}/>
        </div>
    );
}
export default SingleColorPalette;