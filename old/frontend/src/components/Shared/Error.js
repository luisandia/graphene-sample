import React, { useState } from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from '@material-ui/lab/Alert';

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const Error = ({ classes, error }) => {

  const [open, setOpen] = useState(true)
  return <Snackbar className={classes.snackbar}
    open={open}
    autoHideDuration={6000}
    onClose={() => setOpen(false)}
  >
    <Alert onClose={() => setOpen(false)} severity="error">
      {error.message}
    </Alert>
  </Snackbar>;
};

const styles = theme => ({
  snackbar: {
    margin: theme.spacing(1)
  }
});

export default withStyles(styles)(Error);
