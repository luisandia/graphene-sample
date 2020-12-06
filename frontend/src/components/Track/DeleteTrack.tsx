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
  TrackType,
  useDeleteTrackMutation,
  TrackSetFragmentFragment,
  SearchTracksQuery,
} from '../../api/graphql/api';
import MainContext from '../../MainContext';

const DeleteTrack = ({
  track,
}: {
  track: ValuesType<NonNullable<SearchTracksQuery['tracks']>>;
}) => {
  const [deleteTrackMutation, _] = useDeleteTrackMutation();
  const { state } = React.useContext(MainContext);
  const { currentUser } = state;
  const handleUpdateCache: MutationUpdaterFn<DeleteTrackMutation> = (cache, { data }) => {
    const data_ = cache.readQuery<GetTracksQuery, GetTracksQueryVariables>({
      query: GetTracksDocument,
    });
    const tracks = data_!.tracks!.filter(
      (track) => Number(track.id) !== data?.deleteTrack?.trackId,
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
  console.log('my current user ', currentUser?.id);
  const isCurrentUser = currentUser?.id === track.postedBy?.id;

  return isCurrentUser ? (
    <IconButton onClick={handleDeleteTrack}>
      <TrashIcon />
    </IconButton>
  ) : (
    <div />
  );
};
export default DeleteTrack;
