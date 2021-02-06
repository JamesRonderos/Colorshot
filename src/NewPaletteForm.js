import React, { useState } from 'react';
import PaletteFormNav from './PaletteFormNav';
import ColorPickerForm from './ColorPickerForm';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import Button from '@material-ui/core/Button';
import DraggableColorList from './DraggableColorList';
import arrayMove from 'array-move';
import styles from './styles/NewPaletteFormStyles'

NewPaletteForm.defaultProps = {
    maxColors: 20
};

function NewPaletteForm(props) {

    const { classes, maxColors, palettes, savePalette, history } = props;
    const [ open, setOpen ] = useState( true );

    // Array of custom color: color-name pairs
    const [ selectedCustomColors, setSelectedCustomColor ] = useState(palettes[0].colors);

    // For saving custom palette names
    const [newPaletteName, setNewPaletteName] = useState("");

    const paletteIsFull = selectedCustomColors.length >= maxColors

    // Change state for sliding menu drawer
    const handleDrawerOpen = () => {
        setOpen(true);
    };

    // Change state for sliding menu drawer
    const handleDrawerClose = () => {
        setOpen(false);
    };

    // Save palette button function
    const handleSubmit = (newPalette) => {
        newPalette.id = newPaletteName.toLowerCase().replace(/ /g, "-");
        newPalette.colors = selectedCustomColors;
        savePalette(newPalette);
        history.push("/");
    };

    // Remove a color from a custom color palette
    const removeColor = colorName => {
        setSelectedCustomColor(selectedCustomColors.filter(color => color.name !== colorName))
    };

    // Add a random existing color to the custom palette
    const addRandomColor = () => {
        const allColors = palettes.map(p=>p.colors).flat()
        var rand = Math.floor(Math.random() * allColors.length);
        const newRandColor = {color: allColors[rand].color, name: allColors[rand].name}
        setSelectedCustomColor([...selectedCustomColors, newRandColor])
    };

    // Rearrange color boxes after dragging one to a new position
    const onSortEnd = ({oldIndex, newIndex}) => {
        setSelectedCustomColor(arrayMove(selectedCustomColors, oldIndex, newIndex))
    };

    return (
        <div className={classes.root}>

            {/*Top nav bar*/}
            <PaletteFormNav
                setOpen={setOpen}
                palettes={palettes}
                handleSubmit={handleSubmit}
                newPaletteName={newPaletteName}
                setNewPaletteName={setNewPaletteName}
                handleDrawerOpen={handleDrawerOpen}
            />

            <Drawer
                className={classes.drawer}
                variant="persistent"
                anchor="left"
                open={open}
                classes={{
                    paper: classes.drawerPaper,
                }}
            >
                <div className={classes.drawerHeader}>
                    <IconButton onClick={handleDrawerClose}>
                        <ChevronLeftIcon />
                    </IconButton>
                </div>
                <Divider />
                <div className={classes.container}>
                <Typography variant="h4" gutterBottom>Design Your Palette</Typography>
                <div className={classes.buttons}>
                    <Button variant="contained" className={classes.button} color="secondary" onClick={() => setSelectedCustomColor([])} >Clear Palette</Button>
                    <Button variant="contained" className={classes.button} color="primary" onClick={addRandomColor} disabled={paletteIsFull}>
                        {paletteIsFull ? "Palette Full" : "Random Color"}
                    </Button>
                </div>

                {/*The Color Picker box*/}
                <ColorPickerForm
                    maxColors={maxColors}
                    selectedCustomColors={selectedCustomColors}
                    setSelectedCustomColor={setSelectedCustomColor}
                />
                </div>
            </Drawer>
            <main
                className={classNames(classes.content, {
                    [classes.contentShift]: open,
                })}
            >
                <div className={classes.drawerHeader} />
                {/* Render draggable color boxes from DraggableColorList */}
                <DraggableColorList colors={selectedCustomColors} removeColor={removeColor} axis="xy" onSortEnd={onSortEnd} distance={1} />
            </main>
        </div>
    );
}

export default withStyles(styles, { withTheme: true })(NewPaletteForm);