import { ApolloError } from '@apollo/client/core';
import { makeStyles, Theme } from '@material-ui/core';
import Snackbar from '@material-ui/core/Snackbar';
// import MuiAlert from '@material-ui/lab/Alert';
import { Alert as MuiAlert } from '@material-ui/lab';
import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';

interface Props {
  error: ApolloError | undefined;
}

export const errorStyles = makeStyles((theme: Theme) => ({
  snackbar: {
    margin: theme.spacing(1),
  },
}));

function Alert(props: any) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const Error: React.FC<Props> = ({ error }) => {
  const [open, setOpen] = useState(true);
  const classes = errorStyles();

  return (
    <Snackbar
      className={classes.snackbar}
      open={open}
      autoHideDuration={6000}
      onClose={() => setOpen(false)}
    >
      <Alert onClose={() => setOpen(false)} severity="error">
        {error?.message}
      </Alert>
    </Snackbar>
  );
};

export default Error;
