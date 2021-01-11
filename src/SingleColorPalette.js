import React, {useState} from "react";
import {Link} from "react-router-dom";
import Colorbox from "./Colorbox";
import Navbar from "./Navbar";
import PaletteFooter from "./PaletteFooter";
import styles from "./styles/PaletteStyles";
import { withStyles } from "@material-ui/styles";

function SingleColorPalette(props) {

    const { paletteName, emoji, id } = props.palette;
    const { classes } = props;
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
            key={color.name}
            name={color.name}
            background={color[format]}
            showingFullPalette={false}
        />
    ));
    return (
        <div className={classes.palette}>
            <Navbar handleFormatChange={changeColorFormat} showingAllColors={false}/>
            <div className={classes.paletteColors}>
                {colorBoxes}
                <div className={classes.goBack}>
                    <Link to={`/palette/${id}`}>Go Back</Link>
                </div>
            </div>
            <PaletteFooter paletteName={paletteName} emoji={emoji}/>
        </div>
    );
}
export default withStyles(styles)(SingleColorPalette);