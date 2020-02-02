import React from "react";
import { ApolloConsumer } from 'react-apollo';
import withStyles from "@material-ui/core/styles/withStyles";
import ExitToApp from "@material-ui/icons/ExitToApp";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

const Signout = ({ classes }) => {


  const handleSignout = client => {
    localStorage.removeItem('authtoken');
    client.writeData({ data: { isLoggedIn: false } });
  }

  return (
    <ApolloConsumer>
      {client => (
        <Button onClick={() => handleSignout(client)} className={classes.root}>
          <Typography
            variant="body1"
            className={classes.buttonText}
          >
            Signout
          </Typography>
          <ExitToApp className={classes.buttonIcon} />
        </Button>
      )}
    </ApolloConsumer>
  );
};

const styles = {
  root: {
    cursor: "pointer",
    display: "flex",
    color: "white"
  },
  buttonIcon: {
    marginLeft: "5px",
    color: "white"
  }
};

export default withStyles(styles)(Signout);
