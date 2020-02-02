import React from "react";
import withStyles from "@material-ui/core/styles/withStyles";
// import Card from "@material-ui/core/Card";
// import CardHeader from "@material-ui/core/CardHeader";
// import Avatar from "@material-ui/core/Avatar";
// import Paper from "@material-ui/core/Paper";
// import Typography from "@material-ui/core/Typography";
// import ThumbUpIcon from "@material-ui/icons/ThumbUpTwoTone";
// import AudiotrackIcon from "@material-ui/icons/AudiotrackTwoTone";
// import Divider from "@material-ui/core/Divider";

const Profile = ({ classes }) => {
  return <div>Profile</div>;
};

const styles = theme => ({
  paper: {
    width: "auto",
    display: "block",
    padding: theme.spacing(1) * 2,
    marginLeft: theme.spacing(1) * 3,
    marginRight: theme.spacing(1) * 3,
    marginTop: theme.spacing(1) * 2,
    marginBottom: theme.spacing(1) * 2,
    [theme.breakpoints.up("md")]: {
      width: 650,
      marginLeft: "auto",
      marginRight: "auto"
    }
  },
  card: {
    display: "flex",
    justifyContent: "center"
  },
  title: {
    display: "flex",
    alignItems: "center",
    marginBottom: theme.spacing(1) * 2
  },
  audioIcon: {
    color: "purple",
    fontSize: 30,
    marginRight: theme.spacing(1)
  },
  thumbIcon: {
    color: "green",
    marginRight: theme.spacing(1)
  },
  divider: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1)
  }
});

export default withStyles(styles)(Profile);
