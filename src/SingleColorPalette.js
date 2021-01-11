import React, {useState} from "react";
import {Link} from "react-router-dom";
import Colorbox from "./Colorbox";
import Navbar from "./Navbar";
import PaletteFooter from "./PaletteFooter";
import { withStyles } from "@material-ui/styles";
import chroma from "chroma-js";

const styles = {
    palette: {
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
    },
    goBack: {
        width: "20%",
        height: "50%",
        margin: "0 auto",
        display: "inline-block",
        position: "relative",
        marginBottom: "-4px",
        opacity: "1",
        backgroundColor: "black",
        "& a": {
            color: "white",
            width: "100px",
            height: "30px",
            position: "absolute",
            display: "inline-block",
            top: "50%",
            left: "50%",
            marginLeft: "-50px",
            marginTop: "-15px",
            textAlign: "center",
            outline: "none",
            background: "rgba(255,255,255,0.3)",
            fontSize: "1rem",
            lineHeight: "30px",
            textTransform: "uppercase",
            border: "none",
            cursor: "pointer",
            textDecoration: "none",
        }
    }
};

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