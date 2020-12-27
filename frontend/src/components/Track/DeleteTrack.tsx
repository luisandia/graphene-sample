import { MutationUpdaterFn } from '@apollo/client';
import IconButton from '@material-ui/core/IconButton';
import TrashIcon from '@material-ui/icons/DeleteForeverOutlined';
import React from 'react';
import { ValuesType } from 'utility-types';
import {
  DeleteTrackMutation,
  GetTracksDocument,
  GetTracksQuery,
  GetTracksQueryVariables,
  SearchTracksQuery, useDeleteTrackMutation
} from 'src/api/graphql/api';
import MainContext from 'src/MainContext';

const DeleteTrack = ({
  track,
}: {
  track: ValuesType<NonNullable<SearchTracksQuery['tracks']>>;
}) => {
  const [deleteTrackMutation,] = useDeleteTrackMutation();
  const { state } = React.useContext(MainContext);
  const { currentUser } = state;
  const handleUpdateCache: MutationUpdaterFn<DeleteTrackMutation> = (cache, { data }) => {
    const cacheData = cache.readQuery<GetTracksQuery, GetTracksQueryVariables>({
      query: GetTracksDocument,
    });
    const tracks = cacheData!.tracks!.filter(
      (track_) => Number(track_.id) !== data?.deleteTrack?.trackId,
    );
    cache.writeQuery({ query: GetTracksDocument, data: { tracks } });
  };

  const handleDeleteTrack = async () => {
    try {
      await deleteTrackMutation({
        variables: {
          trackId: Number(track.id),
        },
        update: handleUpdateCache,
      });
    } catch (e) {
      console.error(e);
    }
  };

  const isCurrentUser = currentUser?.id === track.postedBy?.id;

  return isCurrentUser ? (
    <IconButton onClick={handleDeleteTrack}  data-testid={`track-delete-${track.id}`}>
      <TrashIcon />
    </IconButton>
  ) : (
    <div />
  );
};
export default DeleteTrack;
