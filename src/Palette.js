import React, {useState} from 'react';
import Colorbox from "./Colorbox";
import Navbar from "./Navbar";
import "./Palette.css";
import PaletteFooter from "./PaletteFooter";
import { withStyles } from "@material-ui/styles";

const styles = {
    Palette: {
        height: "100vh",
        display: "flex",
        flexDirection: "column"
    },
    paletteColors: {
    height: "90%"
    },
    paletteFooter: {
        backgroundColor: "white",
        height: "5vh",
        display: "flex",
        justifyContent: "flex-end",
        alignItems: "center;font-weight: bold"
    },
    emoji: {
        fontSize: "1.5rem",
        margin: "0 1rem"
    }
};

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
        <div className={classes.Palette}>
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