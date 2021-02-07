import React from 'react';
import { SortableElement } from "react-sortable-hoc";
import { withStyles } from "@material-ui/styles";
import DeleteOutlinedIcon from '@material-ui/icons/DeleteOutlined';
import styles from "./styles/DraggableColorBoxStyles";


const DraggableColorbox = SortableElement((props) => {
    const { classes, name, color, handleClick } = props;
    return(
        <div className={classes.root}
             style={{backgroundColor: color}}
        >
            <div className={classes.boxContent}>
                <span className={classes.colorText}>{name}</span>
                <DeleteOutlinedIcon className={classes.deleteIcon} onClick={handleClick}/>
            </div>
        </div>
    )
})

export default withStyles(styles)(DraggableColorbox);