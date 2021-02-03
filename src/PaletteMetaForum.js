import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import { Picker } from 'emoji-mart';
import 'emoji-mart/css/emoji-mart.css'

const PaletteMetaForum = props => {
  const [open, setOpen] = React.useState(true);


  const { newPaletteName, handleSubmit, handlePaletteChange, hideForm } = props;

  useEffect(() => {
    ValidatorForm.addValidationRule('isPaletteNameUnique', value =>
        props.palettes.every(
            ({ paletteName }) => paletteName.toLowerCase() !== value.toLowerCase()
        ));
  });

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(false);
  };

  return (
        <Dialog open={open} onClose={hideForm} aria-labelledby="form-dialog-title">
          <DialogTitle id="form-dialog-title">Choose a Palette Name</DialogTitle>
          <ValidatorForm onSubmit={handleSubmit}>
          <DialogContent>
            <DialogContentText>
              Please enter a unique name for your new palette.
            </DialogContentText>
              <Picker />
                <TextValidator
                    label="Palette Name"
                    value={newPaletteName}
                    name="newPaletteName"
                    onChange={handlePaletteChange}
                    fullWidth
                    margin="normal"
                    validators={["required","isPaletteNameUnique"]}
                    errorMessages={["Enter a Palette Name!", "Name already used."]}
                />
          </DialogContent>
          <DialogActions>
            <Button onClick={hideForm} color="primary">
              Cancel
            </Button>
            <Button
                variant="contained"
                color="primary"
                type="submit">
              Save Palette
            </Button>
          </DialogActions>
        </ValidatorForm>
        </Dialog>
  );
};

PaletteMetaForum.propTypes = {};

PaletteMetaForum.defaultProps = {};

export default PaletteMetaForum;