import { gql } from '@apollo/client';

export const GET_TRACKS = gql`
  query getTracks {
    tracks {
      ...trackSetFragment
    }
  }
`;

export const CurrentUser = gql`
  fragment currentUser on UserType {
    id
    username
    firstName
    lastName
    email
    isStaff
    isSuperuser
    ...likesetFragment
  }
`;

export const ME = gql`
  query me {
    me {
      ...currentUser
    }
  }
`;

export const SEARCH_TRACKS = gql`
  query searchTracks($search: String) {
    tracks(search: $search) {
      ...trackSetFragment
    }
  }
`;

export const PROFILE_QUERY = gql`
  query userProfile($id: Int!) {
    user(id: $id) {
      id
      username
      dateJoined
      ...likesetFragment
      trackSet {
        ...trackSetFragment
      }
    }
  }
`;

export const frag = gql`
  fragment likesetFragment on UserType {
    likeSet {
      id
      track {
        ...trackSetFragment
      }
    }
  }
`;

export const TrackSetFragment = gql`
  fragment trackSetFragment on TrackType {
    id
    title
    description
    url
    likes {
      id
    }
    postedBy {
      id
      username
    }
  }
`;
