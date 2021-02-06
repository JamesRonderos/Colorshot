import React, { useState, useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';
import Palette from './Palette';
import PaletteList from "./PaletteList";
import SingleColorPalette from "./SingleColorPalette";
import seedColors from './seedColors';
import { generatePalette } from './colorHelpers';
import NewPaletteForm from "./NewPaletteForm";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import "./App.css";

function App() {
    const savedPalettes = JSON.parse(window.localStorage.getItem("palettes"))
    const [palettes, setPalettes] = useState(savedPalettes || seedColors)

    useEffect(() => {
        // Save palettes to local storage when palettes updates
        window.localStorage.setItem("palettes", JSON.stringify(palettes));
    }, [palettes])

    const findPalette = (id) => {
        return palettes.find(function (palette) {
            return palette.id === id;
        })
    }

    const deletePalette = (id) => {
        setPalettes(palettes.filter(palette => palette.id !== id))
    }

    const savePalette = (newPalette) => {
        setPalettes([...palettes, newPalette])
    }

    return (
        <Route render={({location}) => (
            <TransitionGroup>
                <CSSTransition timeout={300} classNames='fade' key={location.key}>
                    <Switch location={location}>
                        {/*keep new palette route before ID route to prevent errors*/}
                        <Route path="/palette/new" render={(routeProps) => (
                            <div className="page">
                            <NewPaletteForm
                            savePalette={savePalette}
                            palettes={palettes}
                            {...routeProps}
                            />
                            </div>
                        )}
                        />
                        <Route
                            exact
                            path="/palette/:paletteId/:colorId"
                            render={routeProps => (
                                <div className="page">
                                <SingleColorPalette
                                    colorId={routeProps.match.params.colorId}
                                    palette={generatePalette(
                                        findPalette(routeProps.match.params.paletteId))}
                                />
                                </div>
                            )}
                        />
                        <Route
                            exact
                            path="/"
                            render={(routeProps) => (
                                <div className="page">
                                <PaletteList palettes={palettes} deletePalette={deletePalette} {...routeProps} />
                                </div>
                                )}
                        />
                        <Route exact
                               path="/palette/:id"
                               render={routeProps => (
                                   <div className="page">
                                   <Palette palette={generatePalette(findPalette(routeProps.match.params.id))}
                                   />
                                   </div>
                               )}
                        />
                    </Switch>
                </CSSTransition>
            </TransitionGroup>
        )} />
    );
}

export default App;