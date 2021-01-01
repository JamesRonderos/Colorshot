import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Palette from './Palette';
import PaletteList from "./PaletteList";
import SingleColorPalette from "./SingleColorPalette";
import seedColors from './seedColors';
import { generatePalette } from './colorHelpers';

function App() {
    function findPalette (id) {
        return seedColors.find(function(palette){
            return palette.id === id;
        })
    }
    return (
        <Switch>
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
                    <PaletteList palettes={seedColors} {...routeProps}/> }
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