import React, { useState } from "react";
import { Mutation } from 'react-apollo';
import { gql } from 'apollo-boost';
import withStyles from "@material-ui/core/styles/withStyles";
import Typography from "@material-ui/core/Typography";
import Avatar from "@material-ui/core/Avatar";
import FormControl from "@material-ui/core/FormControl";
import Paper from "@material-ui/core/Paper";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import Button from "@material-ui/core/Button";
import Lock from "@material-ui/icons/Lock";
import Error from '../Shared/Error';
import TextField from '@material-ui/core/TextField';

const Login = ({ classes, setNewUser }) => {

  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [open, setOpen] = useState(false);

  const handleSubmit = async (event, tokenAuth, client) => {
    event.preventDefault();
    const res = await tokenAuth()
    localStorage.setItem("authToken", res.data.tokenAuth.token)
    client.writeData({ data: { isLoggedIn: true } });
  }


  return <div className={classes.root}>
    <Paper className={classes.paper}>
      <Avatar className={classes.avatar}>
        <Lock />
      </Avatar>
      <Typography variant="h5">
        Login
    </Typography>

      <Mutation mutation={LOGIN_MUTATION}
        variables={{ username, password }}
      >
        {
          (tokenAuth, { loading, error, called, client }) => (
            <form onSubmit={(event) => handleSubmit(event, tokenAuth, client)} className={classes.form} noValidate>
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
                onChange={event => setUsername(event.target.value)}
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
                onChange={event => setPassword(event.target.value)}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                disabled={loading || !username.trim() || !password.trim()}
              >
                {loading ? "Logging in..." : "Login"}
              </Button>
              <Button
                onClick={() => setNewUser(true)}
                type="submit"
                fullWidth
                color="secondary"
                variant="outlined"

              >
                New User? Register here
          </Button>

              {/* Error handling */}
              {error && <Error error={error} />}
            </form>
          )
        }
      </Mutation>
    </Paper>
  </div>;
};

const LOGIN_MUTATION = gql`
mutation ($username:String!,$password:String!){
  tokenAuth(username:$username,password:$password){
    token
  }
}
`

const styles = theme => ({
  root: {
    width: "auto",
    display: "block",
    marginLeft: theme.spacing(1) * 3,
    marginRight: theme.spacing(1) * 3,
    [theme.breakpoints.up("md")]: {
      width: 400,
      marginLeft: "auto",
      marginRight: "auto"
    }
  },
  paper: {
    marginTop: theme.spacing(1) * 8,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: theme.spacing(1) * 2
  },
  title: {
    marginTop: theme.spacing(1) * 2,
    color: theme.palette.secondary.main
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.primary.main
  },
  form: {
    width: "100%",
    marginTop: theme.spacing(1)
  },
  submit: {
    marginTop: theme.spacing(1) * 2,
    marginBottom: theme.spacing(1) * 2
  }
});

export default withStyles(styles)(Login);
