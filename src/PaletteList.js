import React from "react";
import {Link} from "react-router-dom";
import MiniPalette from "./MiniPalette";
import { CSSTransition, TransitionGroup } from "react-transition-group";
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
                <TransitionGroup className={classes.palettes}>
                    {palettes.map(palette => (
                        <CSSTransition key={palette.id} classNames='fade' timeout={500}>
                            <MiniPalette
                            {...palette}
                            id={palette.id}
                            deletePalette={deletePalette}
                            key={palette.id}
                            handleClick={() => goToPalette(palette.id)}
                            />
                        </CSSTransition>
                    ))}
                </TransitionGroup>
            </div>
        </div>
    );
}

export default withStyles(styles)(PaletteList);
