import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Palette from './Palette';
import seedColors from './seedColors';
import { generatePalette } from './colorHelpers';

function App() {
    return (
        <Switch>
            <Route exact path="/" render={() => <h1>PALETTE LIST HERE!</h1>} />
        <Route exact path="/palette/:id" render={() => <h1>Individual palette</h1>} />
        </Switch>

        // <div>
        //     <Palette palette={generatePalette(seedColors[1])} />
        // </div>
    );
}

export default App;