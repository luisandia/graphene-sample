import { makeStyles, Theme } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import IconButton from '@material-ui/core/IconButton';
import TextField from '@material-ui/core/TextField';
import EditIcon from '@material-ui/icons/Edit';
import LibraryMusicIcon from '@material-ui/icons/LibraryMusic';
import axios from 'axios';
import React, { useState } from 'react';
import { ValuesType } from 'utility-types';
import {
  GetTracksDocument,
  SearchTracksQuery,
  useUpdateTrackMutation,
} from '../../api/graphql/api';
import MainContext from '../../MainContext';
import Error from '../Shared/Error';

const styles = makeStyles((theme: Theme) => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  dialog: {
    margin: '0 auto',
    maxWidth: 550,
  },
  textField: {
    margin: theme.spacing(1),
  },
  cancel: {
    color: 'red',
  },
  save: {
    color: 'green',
  },
  button: {
    margin: theme.spacing(1) * 2,
  },
  icon: {
    marginLeft: theme.spacing(1),
  },
  input: {
    display: 'none',
  },
}));

interface Props {
  track: ValuesType<NonNullable<SearchTracksQuery['tracks']>>;
}

const UpdateTrack: React.FC<Props> = ({ track }) => {
  const [updateTrackMutation, { loading, error }] = useUpdateTrackMutation();
  const classes = styles();
  const { state } = React.useContext(MainContext);
  const { currentUser } = state;

  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState(track.title);
  const [description, setDescription] = useState(track.description);
  const [file, setFile] = useState<File | null | undefined>();
  const [submitting, setSubmitting] = useState(false);
  const [fileError, setFileError] = useState('');
  const isCurrentUser = currentUser!.id === track.postedBy!.id;

  const handleAudioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.item(0);
    const fileSizeLimit = 10000000; // 10mb
    if (selectedFile && selectedFile.size > fileSizeLimit) {
      setFileError(`${selectedFile.name}: File size too large`);
    } else {
      setFile(selectedFile);
      setFileError('');
    }
  };

  const handleAudioUpload = async () => {
    try {
      const data = new FormData();
      data.append('file', file ?? '');
      data.append('resources_type', 'raw');
      data.append('upload_preset', 'react-tracks');
      data.append('cloud_name', 'zafiron');
      const res = await axios.post('http://api.cloudinary.com/v1_1/zafiron/upload', data);
      return res.data.url;
    } catch (err) {
      console.error('error uploading file ', err);
      setSubmitting(false);
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitting(true);
    // upload our audio file, get returned url from api
    const uploadedUrl = await handleAudioUpload();
    console.log(uploadedUrl);
    await updateTrackMutation({
      variables: {
        trackId: track.id,
        title,
        description,
        url: uploadedUrl,
      },
      refetchQueries: [{ query: GetTracksDocument }],
    });
    setOpen(false);
    setSubmitting(false);
    setTitle('');
    setDescription('');
    setFile(null);
  };

  if (error) return <Error error={error} />;

  return isCurrentUser ? (
    <>
      {/* update track button */}
      <IconButton onClick={() => setOpen(true)}>
        <EditIcon />
      </IconButton>

      {/* update track dialog */}

      <Dialog open={open} className={classes.dialog}>
        <form onSubmit={(event) => handleSubmit(event)}>
          <DialogTitle>Update Track</DialogTitle>
          <DialogContent>
            <DialogContentText>Add a Title, descripcion & Audio Files</DialogContentText>
            <TextField
              required
              fullWidth
              label="Title"
              type="text"
              className={classes.textField}
              value={title}
              onChange={(event) => setTitle(event.target.value)}
            />
            <TextField
              fullWidth
              label="Description"
              multiline
              placeholder="Add Description"
              rows="4"
              value={description}
              onChange={(event) => setDescription(event.target.value)}
            />
            <FormControl error={Boolean(fileError)}>
              <input
                id="audio"
                required
                type="file"
                className={classes.input}
                accept="audio/mp3,audio/wav"
                onChange={handleAudioChange}
              />
              <label htmlFor="audio">
                <Button
                  variant="outlined"
                  color={file ? 'secondary' : 'inherit'}
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
            <Button disabled={submitting} className={classes.cancel} onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button
              type="submit"
              className={classes.save}
              disabled={
                Boolean(fileError) || submitting || !title.trim() || !description.trim() || !file
              }
            >
              {submitting ? <CircularProgress className={classes.save} size={24} /> : 'Add Track'}
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </>
  ) : (
    <div />
  );
};

export default UpdateTrack;
