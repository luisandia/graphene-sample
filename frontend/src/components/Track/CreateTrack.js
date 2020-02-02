import React, { useState } from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import FormControl from "@material-ui/core/FormControl";
import FormHelperText from "@material-ui/core/FormHelperText";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";
import AddIcon from "@material-ui/icons/Add";
import ClearIcon from "@material-ui/icons/Clear";
import LibraryMusicIcon from "@material-ui/icons/LibraryMusic";
import Fab from '@material-ui/core/Fab';

const CreateTrack = ({ classes }) => {

  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [file, setFile] = useState("")

  const handleAudioChange = event => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);
  }


  return <>
    {/* Create track button */}
    <Fab color="primary" className={classes.fab} aria-label="add"
      onClick={() => setOpen(true)}>
      {open ? <ClearIcon /> : <AddIcon />}
    </Fab>


    {/* create track dialog */}

    <Dialog open={open} className={classes.dialog}>
      <form>
        <DialogTitle>
          Create Track
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Add a Title, descripcion & Audio Files
          </DialogContentText>
          <TextField
            required
            fullWidth
            label="Title"
            type="text"
            className={classes.textField}
            onChange={event => setTitle(event.target.value)}
          />
          <TextField
            fullWidth
            label="Description"
            multiline
            placeholder="Add Description"
            rows="4"
            onChange={event => setDescription(event.target.value)}
          />
          <FormControl>
            <input id="audio" required type="file" className={classes.input}
              accept="audio/mp3,audio/wav"
              onChange={handleAudioChange}
            />
            <label htmlFor="audio">
              <Button variant="outlined" color={file ? "secondary" : "inherit"}
                component="span"
                className={classes.button}
              >
                Audio File
              <LibraryMusicIcon className={classes.icon} />
              </Button>
              {file && file.name}
            </label>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button className={classes.cancel}
            onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button type="submit" className={classes.save}
            disabled={!title.trim() || !description.trim() || !file}
          >
            Add Track
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  </>;
};

const styles = theme => ({
  container: {
    display: "flex",
    flexWrap: "wrap"
  },
  dialog: {
    margin: "0 auto",
    maxWidth: 550
  },
  textField: {
    margin: theme.spacing(1)
  },
  cancel: {
    color: "red"
  },
  save: {
    color: "green"
  },
  button: {
    margin: theme.spacing(1) * 2
  },
  icon: {
    marginLeft: theme.spacing(1)
  },
  input: {
    display: "none"
  },
  fab: {
    position: "fixed",
    bottom: theme.spacing(1) * 2,
    right: theme.spacing(1) * 2,
    zIndex: "200"
  }
});

export default withStyles(styles)(CreateTrack);
