import React, { useState, useEffect } from 'react';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import DraggableColorList from "./DraggableColorList";
import {ChromePicker} from 'react-color';
import Button from '@material-ui/core/Button';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import arrayMove from "array-move";



const drawerWidth = 400;

const styles = theme => ({
    root: {
        display: 'flex',
    },
    appBar: {
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarShift: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: drawerWidth,
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    menuButton: {
        marginLeft: 12,
        marginRight: 20,
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

    const { classes, maxColors } = props;
    const [ open, setOpen ] = useState( true );
    const [ selectedColor, setColor ] = useState( '#30BFD6' );

    // Array of custom color: color-name pairs
    const [ selectedCustomColors, setSelectedCustomColor ] = useState(props.palettes[0].colors);
    // Custom name for a new selected color
    const [ newName, setNewName ] = useState("")
    // For saving custom palette names
    const [newPaletteName, setNewPaletteName] = useState("");

    const paletteIsFull = selectedCustomColors.length >= maxColors

    useEffect(() => {
        ValidatorForm.addValidationRule('isColorNameUnique', value =>
            selectedCustomColors.every(
                ({ name }) => name.toLowerCase() !== value.toLowerCase()
            ));

        ValidatorForm.addValidationRule('isColorUnique', () =>
            selectedCustomColors.every(
                ({ color }) => color !== selectedColor
            ));

        ValidatorForm.addValidationRule('isPaletteNameUnique', value =>
            props.palettes.every(
                ({ paletteName }) => paletteName.toLowerCase() !== value.toLowerCase()
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

    // Change state for current color selected in colorpicker
    const handleColorChange = (newColor) => {
        setColor(newColor.hex)
    };

    // Change state for array of custom colors in palette
    const addNewColor = () => {
        const newColor = {color: selectedColor, name: newName}
        setSelectedCustomColor([...selectedCustomColors, newColor]);
        setNewName("");
    };

    const handleTextChange = (evt) => {
        setNewName(evt.target.value);
    };

    //handles custom palette name changes as you type
    const handlePaletteChange = e => {
        setNewPaletteName(e.target.value)
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
        const allColors = props.palettes.map(p=>p.colors).flat()
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
            <CssBaseline />
            <AppBar
                position="fixed"
                color="default"
                className={classNames(classes.appBar, {
                    [classes.appBarShift]: open,
                })}
            >
                <Toolbar disableGutters={!open}>
                    <IconButton
                        color="inherit"
                        aria-label="Open drawer"
                        onClick={handleDrawerOpen}
                        className={classNames(classes.menuButton, open && classes.hide)}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" color="inherit" noWrap>
                        Persistent drawer
                    </Typography>
                    <ValidatorForm onSubmit={handleSubmit} instantValidate={false}>
                        <TextValidator
                            label="Palette Name"
                            value={newPaletteName}
                            name="newPaletteName"
                            onChange={handlePaletteChange}
                            validators={["required","isPaletteNameUnique"]}
                            errorMessages={["Enter a Palette Name!", "Name already used."]}
                        />
                        <Button variant="contained" color="primary" type="submit">Save Palette</Button>
                    </ValidatorForm>
                </Toolbar>
            </AppBar>
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

                {/*The colorpicker widget*/}
                <ChromePicker color={selectedColor} onChange={handleColorChange}/>

                {/* Color name form with validation*/}
                <ValidatorForm onSubmit={addNewColor} instantValidate={false}>
                    <TextValidator
                        value={newName}
                        onChange={handleTextChange}
                        validators={["required", "isColorNameUnique", "isColorUnique"]}
                        errorMessages={["You can't leave that poor color nameless!", "You already used that name chief. Try another one.", "Hey! That color's already in here!"]}
                    />

                    {/*Add-color-to-palette button*/}
                    <Button
                        variant='contained'
                        type='submit'
                        color='primary'
                        disabled={paletteIsFull}
                        style={{backgroundColor: paletteIsFull? "grey" : selectedColor}}
                    >
                        {paletteIsFull ? "Palette Full" : "Add Color"}
                    </Button>
                </ValidatorForm>


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