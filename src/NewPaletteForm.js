import React, { useState, useEffect } from 'react';
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
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import DraggableColorList from './DraggableColorList';
import arrayMove from 'array-move';

const drawerWidth = 400;

const styles = theme => ({
    root: {
        display: 'flex',
    },

    hide: {
        display: 'none',
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
    },
    drawerPaper: {
        width: drawerWidth,
    },
    drawerHeader: {
        display: 'flex',
        alignItems: 'center',
        padding: '0 8px',
        ...theme.mixins.toolbar,
        justifyContent: 'flex-end',
    },
    content: {
        height: 'calc(100vh - 64px)',
        flexGrow: 1,
        padding: theme.spacing.unit * 3,
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        marginLeft: -drawerWidth,
    },
    contentShift: {
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
        marginLeft: 0,
    },
});

NewPaletteForm.defaultProps = {
    maxColors: 20
};

function NewPaletteForm(props) {

    const { classes, maxColors, palettes } = props;
    const [ open, setOpen ] = useState( true );


    // Array of custom color: color-name pairs
    const [ selectedCustomColors, setSelectedCustomColor ] = useState(palettes[0].colors);

    // For saving custom palette names
    const [newPaletteName, setNewPaletteName] = useState("");

    const paletteIsFull = selectedCustomColors.length >= maxColors

    useEffect(() => {
        ValidatorForm.addValidationRule('isColorNameUnique', value =>
            selectedCustomColors.every(
                ({ name }) => name.toLowerCase() !== value.toLowerCase()
            ));
    });

    // Change state for sliding menu drawer
    const handleDrawerOpen = () => {
        setOpen(true);
    };

    // Change state for sliding menu drawer
    const handleDrawerClose = () => {
        setOpen(false);
    };

    // Save palette button function
    const handleSubmit = () => {
        const newPalette={
            paletteName: newPaletteName,
            id: newPaletteName.toLowerCase().replace(/ /g, "-"),
            colors: selectedCustomColors
        };
        props.savePalette(newPalette);
        props.history.push("/");
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
                <Typography variant="h4">Design Your Palette</Typography>
                <div>
                    <Button variant="contained" color="secondary" onClick={() => setSelectedCustomColor([])} >Clear Palette</Button>
                    <Button variant="contained" color="primary" onClick={addRandomColor} disabled={paletteIsFull}>
                        {paletteIsFull ? "Palette Full" : "Random Color"}
                    </Button>
                </div>

                {/*The Color Picker box*/}
                <ColorPickerForm
                    maxColors={maxColors}
                    selectedCustomColors={selectedCustomColors}
                    setSelectedCustomColor={setSelectedCustomColor}/>

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