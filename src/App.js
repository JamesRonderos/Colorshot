import React, { useState } from 'react';
import { Route, Switch } from 'react-router-dom';
import Palette from './Palette';
import PaletteList from "./PaletteList";
import SingleColorPalette from "./SingleColorPalette";
import seedColors from './seedColors';
import { generatePalette } from './colorHelpers';
import NewPaletteForm from "./NewPaletteForm";

function App() {

    const [palettes, setPalettes] = useState(seedColors)

    function findPalette (id) {
        return palettes.find(function(palette){
            return palette.id === id;
        })
    }

    const savePalette = (newPalette) => {
        setPalettes([...palettes, newPalette])
    }

    return (
        <Switch>
            {/*keep new palette route before ID route to prevent errors*/}
            <Route path="/palette/new" render={(routeProps) => <NewPaletteForm savePalette={savePalette} {...routeProps}/>} />
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
                    <PaletteList palettes={palettes} {...routeProps}/> }
            />
            <Route exact
                path="/palette/:id"
                render={routeProps => (
                    <Palette palette={generatePalette(findPalette(routeProps.match.params.id))}
                    />
                )}
            />
        </Switch>

        // <div>
        //     <Palette palette={generatePalette(seedColors[1])} />
        // </div>
    );
};

export default App;