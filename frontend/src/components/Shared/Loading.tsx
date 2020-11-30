import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core';

const LoadingStyles = makeStyles((theme) => ({
  root: {
    width: '100vw',
    textAlign: 'center',
  },
  progress: {
    margin: theme.spacing(1) * 2,
    color: theme.palette.secondary.dark,
  },
}));

export const Loading = () => {
  const classes = LoadingStyles();
  return (
    <div className={classes.root}>
      <CircularProgress className={classes.progress} />
    </div>
  );
};
