import React, { useState, useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';
import Palette from './Palette';
import PaletteList from "./PaletteList";
import SingleColorPalette from "./SingleColorPalette";
import seedColors from './seedColors';
import { generatePalette } from './colorHelpers';
import NewPaletteForm from "./NewPaletteForm";

function App() {
    const savedPalettes = JSON.parse(window.localStorage.getItem("palettes"))
    const [palettes, setPalettes] = useState(savedPalettes || seedColors)

    useEffect(() => {
        // Save palettes to local storage when palettes updates
        window.localStorage.setItem("palettes", JSON.stringify(palettes));
    }, [palettes])

    function findPalette(id) {
        return palettes.find(function (palette) {
            return palette.id === id;
        })
    }

    const savePalette = (newPalette) => {
        setPalettes([...palettes, newPalette])
    }

    return (
        <Switch>
            {/*keep new palette route before ID route to prevent errors*/}
            <Route path="/palette/new" render={(routeProps) => <NewPaletteForm
                savePalette={savePalette}
                palettes={palettes}
                {...routeProps}/>}
            />
            <Route
                exact
                path="/palette/:paletteId/:colorId"
                render={routeProps => (
                    <SingleColorPalette
                        colorId={routeProps.match.params.colorId}
                        palette={generatePalette(
                            findPalette(routeProps.match.params.paletteId))}
                    />
                )}
            />
            <Route
                exact
                path="/"
                render={(routeProps) =>
                    <PaletteList palettes={palettes} {...routeProps}/>}
            />
            <Route exact
                   path="/palette/:id"
                   render={routeProps => (
                       <Palette palette={generatePalette(findPalette(routeProps.match.params.id))}
                       />
                   )}
            />
        </Switch>
    );
}

export default App;