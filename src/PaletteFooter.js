import React from "react";
import { withStyles } from "@material-ui/styles";

const styles = {
    PaletteFooter: {
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
}

function PaletteFooter(props) {
    const {paletteName, emoji, classes} = props;
return(
    <footer className={classes.paletteFooter}>
        { paletteName }
        <span className={classes.emoji}>{emoji}</span>
    </footer>
)
}

export default withStyles(styles)(PaletteFooter);