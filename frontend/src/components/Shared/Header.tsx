import React from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import RadioIcon from '@material-ui/icons/RadioTwoTone';
import FaceIcon from '@material-ui/icons/FaceTwoTone';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core';
import { Signout } from '../Auth/Signout';
import { useMeQuery } from '../../api/graphql/api';
import { Loading } from './Loading';
import Error from './Error';
import MainContext from '../../MainContext';

export const headerStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    margin: 0,
    padding: 0,
  },
  typography: {
    color: 'white',
  },
  grow: {
    flexGrow: 1,
    display: 'flex',
    alignItems: 'center',
    textDecoration: 'none',
  },
  logo: {
    marginRight: theme.spacing(1),
    fontSize: 45,
    color: 'white',
  },
  faceIcon: {
    marginRight: theme.spacing(1),
    fontSize: 30,
    color: 'white',
  },
  username: {
    color: 'white',
    fontSize: 30,
  },
}));

export const Header = () => {
  const classes = headerStyles();
  const { state } = React.useContext(MainContext);
  console.log('MY STATE ', state);
  const { currentUser } = state;

  return (
    <AppBar position="static" className={classes.root}>
      <Toolbar>
        {/* title / logo */}
        <Link to="/" className={classes.grow}>
          <RadioIcon className={classes.logo} />
          <Typography variant="h6" className={classes.typography} noWrap>
            ReactTracks
          </Typography>
        </Link>
        {/* Auth User info */}
        {currentUser && (
          <>
            <Link to={`/profile/${currentUser.id}`} className={classes.grow}>
              <FaceIcon className={classes.faceIcon} />
              <Typography variant="h6" className={classes.username} noWrap>
                {currentUser.username}
              </Typography>
            </Link>
            {/* signout button */}
            <Signout />
          </>
        )}
      </Toolbar>
    </AppBar>
  );
};
