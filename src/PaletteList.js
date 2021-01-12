import React from "react";
import {Link} from "react-router-dom";
import MiniPalette from "./MiniPalette";
import styles from "./styles/PaletteListStyles";
import { withStyles } from "@material-ui/styles";


function PaletteList(props) {

    const { palettes, classes } = props;

    function goToPalette(id) {
        props.history.push(`/palette/${id}`)
    };

    return (
        <div className={classes.root}>
            <div className={classes.container}>
                <nav className={classes.nav}>
                    <h1>React Colors</h1>
                    <Link to="/palette/new">Create Palette</Link>
                </nav>
                <div className={classes.palettes}>{palettes.map(palette => (
                    <MiniPalette {...palette} handleClick={() => goToPalette(palette.id)}/>
                ))}
                </div>
            </div>
        </div>
    );
}

export default withStyles(styles)(PaletteList);
