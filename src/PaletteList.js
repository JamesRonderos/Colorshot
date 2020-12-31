import React from "react";
import MiniPalette from "./MiniPalette";
import { Link } from "react-router-dom";

function PaletteList(props) {

    const { palettes } = props;

    return (
        <div>
            <MiniPalette />
            <h1>React Colors</h1>
            {palettes.map(palette => (
            <MiniPalette {...palette}/>
                ))}
        </div>
    );
}

export default PaletteList;

// <p>
//     <Link to={`/palette/${palette.id}`}>{palette.paletteName}</Link>
// </p>