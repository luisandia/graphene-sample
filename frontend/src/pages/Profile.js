import React from "react";
import { Query } from "react-apollo";
import { gql } from "apollo-boost";
import withStyles from "@material-ui/core/styles/withStyles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import Avatar from "@material-ui/core/Avatar";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import ThumbUpIcon from "@material-ui/icons/ThumbUpTwoTone";
import AudiotrackIcon from "@material-ui/icons/AudiotrackTwoTone";
import Divider from "@material-ui/core/Divider";
import format from "date-fns/format";
import AudioPlayer from "../components/Shared/AudioPlayer";
import Error from "../components/Shared/Error";
import Loading from "../components/Shared/Loading";

const Profile = ({ classes, match }) => {
  const id = match.params.id;
  return (
    <Query query={PROFILE_QUERY} variables={{ id }}>
      {({ data, loading, error }) => {
        if (loading) return <Loading />;
        if (error) return <Error error={error} />;
        console.log(data)
        return (
          <div>
            {/* User Info Card */}
            <Card className={classes.card}>
              <CardHeader
                avatar={<Avatar>{data.user.username[0]}</Avatar>}
                title={data.user.username}
                subheader={`Joined ${format(
                  new Date(data.user.dataJoined),
                  'MMM Do, yyyy'
                )}`}
              // subheader={new Intl.DateTimeFormat("en-GB", {
              //   year: "numeric",
              //   month: "long",
              //   day: "2-digit"
              // }).format(data.user.dataJoined)}
              />
            </Card>

            {/* Created Tracks */}
            <Paper elevation={1} className={classes.paper}>
              <Typography variant="h6" className={classes.title}>
                <AudiotrackIcon className={classes.audioIcon} />
                Created Tracks
              </Typography>
              {data.user.trackSet.map(track => (
                <div key={track.id}>
                  <Typography>
                    {track.title} · {track.likes.length} Likes
                  </Typography>
                  <AudioPlayer url={track.url} />
                  <Divider className={classes.divider} />
                </div>
              ))}
            </Paper>

            {/* Liked Tracks */}
            <Paper elevation={1} className={classes.paper}>
              <Typography variant="h6" className={classes.title}>
                <ThumbUpIcon className={classes.thumbIcon} />
                Liked Tracks
              </Typography>
              {data.user.likeSet.map(({ track }) => (
                <div key={track.id}>
                  <Typography>
                    {track.title} · {track.likes.length} Likes ·{" "}
                    {track.postedBy.username}
                  </Typography>
                  <AudioPlayer url={track.url} />
                  <Divider className={classes.divider} />
                </div>
              ))}
            </Paper>
          </div>
        );
      }}
    </Query>
  );
};

const PROFILE_QUERY = gql`
  query($id: Int!) {
    user(id: $id) {
      id
      username
      dateJoined
      likeSet {
        id
        track {
          id
          title
          url
          likes {
            id
          }
          postedBy {
            id
            username
          }
        }
      }
      trackSet {
        id
        title
        url
        likes {
          id
        }
      }
    }
  }
`;

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