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

import { Mutation } from 'react-apollo';
import { gql } from 'apollo-boost';
import Error from '../Shared/Error';
import axios from 'axios';
import { GET_TRACKS_QUERY } from '../../pages/App';


const CreateTrack = ({ classes }) => {

  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [file, setFile] = useState("")
  const [submitting, setSubmitting] = useState(false)
  const [fileError, setFileError] = useState("")

  const handleAudioChange = event => {
    const selectedFile = event.target.files[0];
    const fileSizeLimit = 10000000;//10mb
    if (selectedFile && selectedFile.size > fileSizeLimit) {
      setFileError(`${selectedFile.name}: File size too large`);
    } else {
      setFile(selectedFile);
      setFileError("");
    }
  }

  const handleAudioUpload = async () => {
    try {
      const data = new FormData();
      data.append("file", file);
      data.append('resources_type', 'raw');
      data.append('upload_preset', 'react-tracks');
      data.append('cloud_name', 'dmem1806r');
      const res = await axios.post('http://api.cloudinary.com/v1_1/dmem1806r/upload', data);
      return res.data.url
    }
    catch (err) {
      console.error('error uploading file ', err);
      setSubmitting(false);
    }

  }

  const handleSubmit = async (event, createTrack) => {
    event.preventDefault();
    setSubmitting(true);
    // upload our audio file, get returned url from api
    const uploadedUrl = await handleAudioUpload();
    createTrack({ variables: { title, description, url: uploadedUrl } });
  }


  return <>
    {/* Create track button */}
    <Fab color="primary" className={classes.fab} aria-label="add"
      onClick={() => setOpen(true)}>
      {open ? <ClearIcon /> : <AddIcon />}
    </Fab>


    {/* create track dialog */}

    <Mutation mutation={CREATE_TRACK_MUTATION}
      onCompleted={data => {
        console.log({ data });
        setOpen(false);
        setSubmitting(false);
        setTitle("");
        setDescription("");
        setFile("");
      }}
      refetchQueries={() => [{ query: GET_TRACKS_QUERY }]}
    >
      {
        (createTrack, { loading, error }) => {
          if (error) return <Error error={error} />
          return (
            <Dialog open={open} className={classes.dialog}>
              <form onSubmit={event => handleSubmit(event, createTrack)}>
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
                    value={title}
                    onChange={event => setTitle(event.target.value)}
                  />
                  <TextField
                    fullWidth
                    label="Description"
                    multiline
                    placeholder="Add Description"
                    rows="4"
                    value={description}
                    onChange={event => setDescription(event.target.value)}
                  />
                  <FormControl error={Boolean(fileError)} >
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
                      <FormHelperText>{fileError}</FormHelperText>
                    </label>
                  </FormControl>
                </DialogContent>
                <DialogActions>
                  <Button disabled={submitting} className={classes.cancel}
                    onClick={() => setOpen(false)}>
                    Cancel
                  </Button>
                  <Button type="submit" className={classes.save}
                    disabled={Boolean(fileError) || submitting || !title.trim() || !description.trim() || !file}
                  >
                    {submitting ? (<CircularProgress className={classes.save} size={24} />) : ("Add Track")}
                  </Button>
                </DialogActions>
              </form>
            </Dialog>)
        }
      }
    </Mutation>
  </>;
};

const CREATE_TRACK_MUTATION = gql`
mutation ($title:String!,$description:String!,$url:String!){
  createTrack(title:$title,description:$description,url:$url)
  {
    track {
      id
      title
      description
      url
    }
  }
}
`;

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
