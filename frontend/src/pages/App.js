import React from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import SearchStracks from '../components/Track/SearchTracks';
import CreateTrack from "../components/Track/CreateTrack";
import TrackList from "../components/Track/TrackList";
import { Query } from 'react-apollo';
import { gql } from 'apollo-boost';
import Loading from "../components/Shared/Loading";
import Error from "../components/Shared/Error";

const App = ({ classes }) => {
  return <div className={classes.container}>
    <SearchStracks />
    <CreateTrack />
    <Query query={GET_TRACKS_QUERY}>
      {
        ({ data, loading, error }) => {
          if (loading) return <Loading />
          if (error) return <Error error={error} />
          return <TrackList tracks={data.tracks} />
        }
      }
    </Query>
  </div>;
};


export const GET_TRACKS_QUERY = gql`

query getTracksQuery {
  tracks {
    id
    title
    description
    url
    likes{
      id
    }
    postedBy{
      id
      username
    }
  }
}
`;

const styles = theme => ({
  container: {
    margin: "0 auto",
    maxWidth: 1200,
    padding: theme.spacing(1) * 2
  }
});

export default withStyles(styles)(App);
