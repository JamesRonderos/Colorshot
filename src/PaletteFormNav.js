import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import PaletteMetaForum from "./PaletteMetaForum";
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import AddToPhotosIcon from '@material-ui/icons/AddToPhotos';
import Button from '@material-ui/core/Button';
import styles from './styles/PaletteFormNavStyles'

function PaletteFormNav(props) {
    const { classes, open, setNewPaletteName, newPaletteName, handleSubmit, handleDrawerOpen, palettes } = props;

    const [formShowing, setFormShowing] = useState(false);

    //handles custom palette name changes as you type
    const handlePaletteChange = e => {
        setNewPaletteName(e.target.value)
    };

    const showForm = () => {
        setFormShowing(true)
    };

    const hideForm = () => {
        setFormShowing(false)
    };

    return (
        <div className={classes.root}>
            <CssBaseline/>
            <AppBar
                position="fixed"
                color="default"
                className={classNames(classes.appBar, {
                    [classes.appBarShift]: open
                })}
            >
                <Toolbar disableGutters={!open}>
                    <IconButton
                        color="inherit"
                        aria-label="Open drawer"
                        onClick={handleDrawerOpen}
                        className={classNames(classes.menuButton, {
                            [classes.hide]: open
                        })}
                    >
                        <AddToPhotosIcon/>
                    </IconButton>
                    <Typography variant="h6" color="inherit" noWrap>
                        Create A Custom Palette
                    </Typography>
                </Toolbar>
                <div className={classes.navBtns}>
                    <Link to='/'>
                        <Button variant="contained" color="secondary" className={classes.button}>
                            Go Back
                        </Button>
                    </Link>
                    <Button variant="contained" color="primary" onClick={showForm} className={classes.button}>
                        Save
                    </Button>
                </div>
            </AppBar>
            {formShowing && (
                <PaletteMetaForum handleSubmit={handleSubmit} hideForm={hideForm} newPaletteName={newPaletteName}
                                  handlePaletteChange={handlePaletteChange} palettes={palettes}/>
            )}
        </div>
    )
}

export default withStyles(styles, { withTheme: true })(PaletteFormNav);