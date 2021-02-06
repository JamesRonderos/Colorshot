import React, { memo } from "react";
import { withStyles } from "@material-ui/styles";
import styles from "./styles/MiniPaletteStyles";
import DeleteOutlinedIcon from "@material-ui/icons/DeleteOutlined";

const MiniPalette = memo(({classes, paletteName, emoji, colors, openDialog, goToPalette, id}) => {

    const miniColorBoxes = (colors.map(color => (
        <div
            className={classes.miniColor}
            style={{ backgroundColor: color.color }}
            key={color.name}
        />
    )));

    const removePalette = (e) => {
        e.stopPropagation();
        openDialog(id)
    }

    const handleClick = () => {
        goToPalette(id)
    }


    return (
        <div className={classes.root} onClick={handleClick}>
            <DeleteOutlinedIcon
                className={classes.deleteIcon}
                style={{ transition: "all 0.3s ease-in-out" }}
                onClick={removePalette}
            />
            <div className={classes.colors}>{miniColorBoxes}</div>
            <h5 className={classes.title}>
                {paletteName} <span className={classes.emoji}>{emoji}</span>
            </h5>
        </div>
    );
}, (prevProps, nextProps) => {
    return prevProps.openDialog !== nextProps.openDialog;
});

export default withStyles(styles)(MiniPalette);