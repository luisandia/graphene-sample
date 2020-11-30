import { useApolloClient } from '@apollo/client';
import { makeStyles } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import ExitToApp from '@material-ui/icons/ExitToApp';
import React from 'react';
import MainContext from '../../MainContext';

const signoutStyles = makeStyles({
  root: {
    cursor: 'pointer',
    display: 'flex',
    color: 'white',
  },
  buttonIcon: {
    marginLeft: '5px',
    color: 'white',
  },
});

export const Signout = () => {
  const client = useApolloClient();
  const classes = signoutStyles();
  const { dispatch } = React.useContext(MainContext);

  const handleSignout = () => {
    localStorage.removeItem('token');
    client.resetStore();
    dispatch({ type: 'SIGNOUT_USER' });

    // client.writeData({ data: { isLoggedIn: false } });
  };

  return (
    <Button onClick={() => handleSignout()} className={classes.root}>
      <Typography variant="body1">Signout</Typography>
      <ExitToApp className={classes.buttonIcon} />
    </Button>
  );
};
