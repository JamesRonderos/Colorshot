import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Button from '@material-ui/core/Button';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';


export default function PaletteFormNav(props) {
    const { classes, open, setNewPaletteName, newPaletteName, handleSubmit, handleDrawerOpen } = props;


    useEffect(() => {
        ValidatorForm.addValidationRule('isPaletteNameUnique', value =>
            props.palettes.every(
                ({ paletteName }) => paletteName.toLowerCase() !== value.toLowerCase()
            ));
    });

    //handles custom palette name changes as you type
    const handlePaletteChange = e => {
        setNewPaletteName(e.target.value)
    };

    return (
        <div>
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
                    <ValidatorForm onSubmit={handleSubmit}>
                        <TextValidator
                            label="Palette Name"
                            value={newPaletteName}
                            name="newPaletteName"
                            onChange={handlePaletteChange}
                            validators={["required","isPaletteNameUnique"]}
                            errorMessages={["Enter a Palette Name!", "Name already used."]}
                        />
                        <Button variant="contained" color="primary" type="submit">Save Palette</Button>
                        <Link to='/'>
                            <Button variant="contained" color="secondary">Go Back</Button>
                        </Link>
                    </ValidatorForm>
                </Toolbar>
            </AppBar>
        </div>
    )
}

// withStyles(styles, { withTheme: true })(PaletteFormNav);