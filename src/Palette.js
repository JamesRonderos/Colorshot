import React, {useState} from 'react';
import Colorbox from "./Colorbox";
import Navbar from "./Navbar";
import PaletteFooter from "./PaletteFooter";
import styles from "./styles/PaletteStyles"
import { withStyles } from "@material-ui/styles";

function Palette(props) {

    const { paletteName, emoji, colors, id } = props.palette;
    const { classes } = props;

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
    const colorBoxes = colors[colorLevel].map(color => (
        <Colorbox
            key={color.id}
            background={color[format]}
            name={color.name}
            id={color.id}
            paletteId={id}
            moreUrl={`/palette/${id}/${color.id}`}
            showingFullPalette="{true}"
        />
        )
    );

    return (
        <div className={classes.palette}>
            {/*navbar*/}
            <Navbar colorLevel={colorLevel}
                    changeLevel={changeLevel}
                    handleFormatChange={changeColorFormat}
                    showingAllColors
            />
            <div className={classes.paletteColors}>
            {/*color boxes*/}
                { colorBoxes }
            </div>
        {/*    footer */}
            <PaletteFooter paletteName={paletteName} emoji={emoji}/>
        </div>
    );
};

export default withStyles(styles)(Palette);