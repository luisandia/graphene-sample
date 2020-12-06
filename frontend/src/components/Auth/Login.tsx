import { useApolloClient } from '@apollo/client';
import {
  Avatar, Button, makeStyles, TextField, Theme, Typography,
} from '@material-ui/core';
import LockIcon from '@material-ui/icons/Lock';
import React, { useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import {
  MeDocument, MeQuery, MeQueryVariables, useTokenAuthMutation,
} from '../../api/graphql/api';
import MainContext from '../../MainContext';
import Error from '../Shared/Error';

export const loginStyles = makeStyles((theme: Theme) => ({
  root: {
    width: 'auto',
    display: 'block',
    marginLeft: theme.spacing(1) * 3,
    marginRight: theme.spacing(1) * 3,
    [theme.breakpoints.up('md')]: {
      width: 400,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  paper: {
    marginTop: theme.spacing(1) * 8,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: theme.spacing(1) * 2,
  },
  title: {
    marginTop: theme.spacing(1) * 2,
    color: theme.palette.secondary.main,
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.primary.main,
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(1),
  },
  submit: {
    marginTop: theme.spacing(1) * 2,
    marginBottom: theme.spacing(1) * 2,
  },
}));

interface Props {}

const Login = (props: Props) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { dispatch } = useContext(MainContext);
  const [tokenAuthMutation, { loading, error }] = useTokenAuthMutation();

  const history = useHistory();
  const client = useApolloClient();

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    console.log(username, password);
    try {
      const { data } = await tokenAuthMutation({ variables: { username, password } });
      const prom = client.query<MeQuery, MeQueryVariables>({
        query: MeDocument,
      });

      localStorage.setItem('token', data?.tokenAuth?.token ?? '');

      prom
        .then((user) => {
          dispatch({ type: 'LOGIN_USER', payload: { currentUser: user.data.me } });
        })
        .catch((e) => {
          console.log('ERROR LOGIN ', e);
        });
      dispatch({ type: 'IS_LOGGED_IN', payload: { isAuth: true } });

      history.push('/');
    } catch (e) {
      console.log(e);
      dispatch({ type: 'IS_LOGGED_IN', payload: { isAuth: false } });
    }
  };
  // if(currentUser){}
  // console.log(data)
  const classes = loginStyles();

  return (
    <div className={classes.root}>
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockIcon />
        </Avatar>
        <Typography variant="h5">Login</Typography>

        <form onSubmit={(event) => handleSubmit(event)} className={classes.form} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="username"
            label="Username"
            name="username"
            autoComplete="username"
            autoFocus
            onChange={(event) => setUsername(event.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            onChange={(event) => setPassword(event.target.value)}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            disabled={loading || !username.trim() || !password.trim()}
          >
            {loading ? 'Logging in...' : 'Login'}
          </Button>
          <Button type="submit" fullWidth color="secondary" variant="outlined">
            New User? Register here
          </Button>

          {/* Error handling */}
          {error && <Error error={error} />}
        </form>
      </div>
    </div>
  );
};
export default Login;
