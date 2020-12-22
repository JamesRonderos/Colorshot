import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Palette from './Palette';
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
            <Route exact path="/" render={() => <h1>PALETTE LIST HERE!</h1>} />
        <Route exact path="/palette/:id" render={routeProps => (
            <Palette palette={generatePalette(findPalette(routeProps.match.params.id)
            )} />
        )} />

        </Switch>

        // <div>
        //     <Palette palette={generatePalette(seedColors[1])} />
        // </div>
    );
}

export default App;