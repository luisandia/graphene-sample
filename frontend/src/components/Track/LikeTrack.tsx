import { useApolloClient } from '@apollo/client';
import { makeStyles, Theme } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import React from 'react';
import MainContext from '../../MainContext';
import mutationCreateLike from './api/graphql';

const styles = makeStyles((theme: Theme) => ({
  iconButton: {
    color: 'deeppink',
  },
  icon: {
    marginLeft: theme.spacing(1) / 2,
  },
}));

interface Props {
  trackId: string;
  likeCount: number;
}

export const LikeTrack: React.FC<Props> = ({ trackId, likeCount }) => {
  const client = useApolloClient();
  const classes = styles();
  const { state } = React.useContext(MainContext);
  const { currentUser } = state;

  const handleDisabledLikedTrack = () => {
    const userLikes = currentUser!.likeSet;
    const isTrackLiked = userLikes.findIndex(({ track }) => track?.id === trackId) > -1;

    return isTrackLiked;
  };

  return (
    <IconButton
      className={classes.iconButton}
      onClick={(event) => {
        event.stopPropagation();
        mutationCreateLike({ trackId:Number(trackId) }, client);
      }}
      disabled={handleDisabledLikedTrack()}
    >
      {likeCount}
      <ThumbUpIcon className={classes.icon} />
    </IconButton>
  );
};

export default LikeTrack;