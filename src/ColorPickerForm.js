import React, { useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import {ChromePicker} from 'react-color';

export default function ColorPickerForm(props) {

    const { setSelectedCustomColor, selectedCustomColors, maxColors } = props;

    // STATES

    // Currently selected color in picker
    const [ selectedColor, setColor ] = useState( '#30BFD6' );
    // Custom name for a new selected color
    const [ newName, setNewName ] = useState("")

    // Check if there are already 20 colors and palette is full
    const paletteIsFull = selectedCustomColors.length >= maxColors

    useEffect(() => {
        ValidatorForm.addValidationRule('isColorUnique', () =>
            selectedCustomColors.every(
                ({ color }) => color !== selectedColor
            ));
    });

    // Change state for current color selected in colorpicker
    const handleColorChange = (newColor) => {
        setColor(newColor.hex)
    };

    // Change state for array of custom colors in palette
    const addNewColor = () => {
        const newColor = {color: selectedColor, name: newName}
        setSelectedCustomColor([...selectedCustomColors, newColor]);
        setNewName("");
    };

    // For User Custom Color Name Changes
    const handleTextChange = (evt) => {
        setNewName(evt.target.value);
    };

    return(
        <div>
            {/*The colorpicker widget*/}
            <ChromePicker color={selectedColor} onChange={handleColorChange}/>

            {/* Color name form with validation*/}
            <ValidatorForm onSubmit={addNewColor} instantValidate={false}>
                <TextValidator
                    value={newName}
                    onChange={handleTextChange}
                    validators={["required", "isColorNameUnique", "isColorUnique"]}
                    errorMessages={["You can't leave that poor color nameless!", "You already used that name chief. Try another one.", "Hey! That color's already in here!"]}
                />

                {/*Add-color-to-palette button*/}
                <Button
                    variant='contained'
                    type='submit'
                    color='primary'
                    disabled={paletteIsFull}
                    style={{backgroundColor: paletteIsFull? "grey" : selectedColor}}
                >
                    {paletteIsFull ? "Palette Full" : "Add Color"}
                </Button>
            </ValidatorForm>
        </div>
    )
}