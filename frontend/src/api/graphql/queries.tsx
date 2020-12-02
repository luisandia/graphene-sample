import { gql } from '@apollo/client';

export const GET_TRACKS = gql`
  query getTracks {
    tracks {
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
  }
`;

export const PROFILE_QUERY = gql`
  query userProfile($id: Int!) {
    user(id: $id) {
      id
      username
      dateJoined
      likeSet {
        id
        track {
          ...trackSetFragment
          postedBy {
            id
            username
          }
        }
      }
      trackSet {
        ...trackSetFragment
      }
    }
  }
`;

export const TrackSetFragment = gql`
  fragment trackSetFragment on TrackType {
    id
    title
    url
    likes {
      id
    }
  }
`;
