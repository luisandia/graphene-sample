import { makeStyles } from '@material-ui/core';
import React from 'react';
import { SearchTracksQuery } from '../api/graphql/api';
import CreateTrack from '../components/Track/CreateTrack';
import SearchTracks from '../components/Track/SearchTracks';
import TrackList from '../components/Track/TrackList';

interface Props {}

const styles = makeStyles((theme) => ({
  container: {
    margin: '0 auto',
    maxWidth: 1200,
    padding: theme.spacing(1) * 2,
  },
}));

const Dashboard: React.FC<Props> = (props) => {
  const classes = styles();
  const [searchResults, setSearchResults] = React.useState<SearchTracksQuery | undefined>();
  return (
    <div className={classes.container}>
      <SearchTracks setSearchResults={setSearchResults} />
      <CreateTrack />

      <TrackList tracks={searchResults?.tracks} />
    </div>
  );
};

export default Dashboard;
