import React from "react";
import withStyles from "@material-ui/core/styles/withStyles";

const App = ({ classes }) => {
  return <div>App</div>;
};

const styles = theme => ({
  container: {
    margin: "0 auto",
    maxWidth: 960,
    padding: theme.spacing(1) * 2
  }
});

export default withStyles(styles)(App);
