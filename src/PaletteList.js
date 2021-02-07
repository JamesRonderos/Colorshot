import React, { useState } from "react";
import { Link } from "react-router-dom";
import MiniPalette from "./MiniPalette";
import Dialog from '@material-ui/core/Dialog';
import Avatar from '@material-ui/core/Avatar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import DialogTitle from '@material-ui/core/DialogTitle';
import CheckIcon from '@material-ui/icons/Check';
import CloseIcon from '@material-ui/icons/Close';
import blue from '@material-ui/core/colors/blue'
import red from '@material-ui/core/colors/red'
import { CSSTransition, TransitionGroup } from "react-transition-group";
import styles from "./styles/PaletteListStyles";
import { withStyles } from "@material-ui/core/styles";


function PaletteList(props) {

    const { palettes, classes, deletePalette, history } = props;
    const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
    const [idToDelete, setIdToDelete] = useState("");

    const goToPalette = (id) => {
        history.push(`/palette/${id}`);
    };

    const openDialog = (id) => {
        setOpenDeleteDialog(true);
        setIdToDelete(id);
    };

    const closeDialog = () => {
        setOpenDeleteDialog(false);
        setIdToDelete("");
    };

    const handleDelete = () => {
        deletePalette(idToDelete);
        closeDialog();
    }

    return (
        <div className={classes.root}>
            <div className={classes.container}>
                <nav className={classes.nav}>
                    <h1 className={classes.heading}>Colorshot</h1>
                    <Link to="/palette/new">Create Palette</Link>
                </nav>
                <TransitionGroup className={classes.palettes}>
                    {palettes.map(palette => (
                        <CSSTransition key={palette.id} classNames='fade' timeout={500}>
                            <MiniPalette
                                {...palette}
                                id={palette.id}
                                openDialog={openDialog}
                                key={palette.id}
                                goToPalette={goToPalette}
                            />
                        </CSSTransition>
                    ))}
                </TransitionGroup>
            </div>
            {/*Pop-up delete confirmation dialog*/}
            <Dialog open={openDeleteDialog} aria-labelledby="delete-dialog-title" onClose={closeDialog}>
                <DialogTitle id="delete-dialog-title"> Are you sure you want to delete?</DialogTitle>
                <List>
                    {/*Confirm palette deletion button*/}
                    <ListItem button onClick={handleDelete}>
                        <ListItemAvatar>
                            <Avatar style={{ backgroundColor: red[100], color: red[600] }}>
                                <CheckIcon/>
                            </Avatar>
                        </ListItemAvatar>
                        <ListItemText>Delete</ListItemText>
                    </ListItem>
                    {/*Cancel palette deletion button*/}
                    <ListItem button onClick={closeDialog}>
                        <ListItemAvatar>
                            <Avatar style={{ backgroundColor: blue[100], color: blue[600] }}>
                                <CloseIcon/>
                            </Avatar>
                        </ListItemAvatar>
                        <ListItemText>Cancel</ListItemText>
                    </ListItem>
                </List>
            </Dialog>
        </div>
    );
}

export default withStyles(styles)(PaletteList);
