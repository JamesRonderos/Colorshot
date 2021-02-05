import React from "react";
import {Link} from "react-router-dom";
import MiniPalette from "./MiniPalette";
import styles from "./styles/PaletteListStyles";
import { withStyles } from "@material-ui/styles";


function PaletteList(props) {

    const { palettes, classes, deletePalette } = props;

    function goToPalette(id) {
        props.history.push(`/palette/${id}`)
    };

    return (
        <div className={classes.root}>
            <div className={classes.container}>
                <nav className={classes.nav}>
                    <h1 className={classes.heading}>Colorshot</h1>
                    <Link to="/palette/new">Create Palette</Link>
                </nav>
                <div className={classes.palettes}>{palettes.map(palette => (
                    <MiniPalette
                        {...palette}
                        id={palette.id}
                        deletePalette={deletePalette}
                        key={palette.id}
                        handleClick={() => goToPalette(palette.id)}
                    />
                ))}
                </div>
            </div>
        </div>
    );
}

export default withStyles(styles)(PaletteList);
