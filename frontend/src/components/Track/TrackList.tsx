import { makeStyles } from '@material-ui/core';
import Accordion from '@material-ui/core/Accordion';
import AccordionActions from '@material-ui/core/AccordionActions';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import React from 'react';
import { Link } from 'react-router-dom';
import { SearchTracksQuery, useGetTracksLazyQuery } from '../../api/graphql/api';
import AudioPlayer from '../Shared/AudioPlayer';
import Error from '../Shared/Error';
import { Loading } from '../Shared/Loading';
import DeleteTrack from './DeleteTrack';
import { LikeTrack } from './LikeTrack';
import UpdateTrack from './UpdateTrack';

const trackStyles = makeStyles({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  details: {
    alignItems: 'center',
  },
  link: {
    color: '#424242',
    textDecoration: 'none',
    '&:hover': {
      color: 'black',
    },
  },
});

const TrackList: React.FC<Pick<SearchTracksQuery, 'tracks'> | undefined> = (props) => {
  const classes = trackStyles();
  const [getTracksQuery, { data, error, loading }] = useGetTracksLazyQuery();
  // const { data, error, loading } = useGetTracksQueryQuery();
  React.useEffect(() => {
    getTracksQuery();
  }, [getTracksQuery]);

  if (loading) return <Loading />;
  if (error) return <Error error={error} />;

  const tracks = props.tracks ?? data?.tracks ?? [];

  return (
    <List>
      {tracks.map((track) => (
        <Accordion key={track.id}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <ListItem className={classes.root}>
              <LikeTrack trackId={track.id} likeCount={track.likes.length} />
              <ListItemText
                primaryTypographyProps={{
                  variant: 'subtitle1',
                  color: 'primary',
                }}
                primary={track.title}
                secondary={(
                  <Link className={classes.link} to={`/profile/${track.postedBy?.id}`}>
                    {track.postedBy?.username}
                  </Link>
                )}
              />
              <AudioPlayer url={track.url} />
            </ListItem>
          </AccordionSummary>
          <AccordionDetails className={classes.details}>
            <Typography variant="body1">{track.description}</Typography>
          </AccordionDetails>
          <AccordionActions>
            <UpdateTrack track={track} />
            <DeleteTrack track={track} />
          </AccordionActions>
        </Accordion>
      ))}
    </List>
  );
};

export default TrackList;
