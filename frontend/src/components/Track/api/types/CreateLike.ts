/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: CreateLike
// ====================================================

export interface CreateLike_createLike_track_likes {
  __typename: "LikeType";
  id: string;
}

export interface CreateLike_createLike_track {
  __typename: "TrackType";
  id: string;
  likes: CreateLike_createLike_track_likes[];
}

export interface CreateLike_createLike {
  __typename: "CreateLike";
  track: CreateLike_createLike_track | null;
}

export interface CreateLike {
  createLike: CreateLike_createLike | null;
}

export interface CreateLikeVariables {
  trackId: number;
}
