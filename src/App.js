import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Palette from './Palette';
import PaletteList from "./PaletteList";
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
            <Route exact path="/" render={(routeProps) => <PaletteList palettes={seedColors} {...routeProps}/> } />
        <Route exact path="/palette/:id" render={routeProps => (
            <Palette palette={generatePalette(findPalette(routeProps.match.params.id)
            )} />
        )} />
            <Route
                exact
                path="/palette/:palleteId/:colorId"
                render={() => <h1>SINGLE COLOR PAGE</h1>}
            />
        </Switch>

        // <div>
        //     <Palette palette={generatePalette(seedColors[1])} />
        // </div>
    );
}

export default App;