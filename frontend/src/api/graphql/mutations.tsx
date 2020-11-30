import { gql } from '@apollo/client';

gql`
  mutation TokenAuth($username: String!, $password: String!) {
    tokenAuth(username: $username, password: $password) {
      token
    }
  }
`;

gql`
  mutation CreateTrack($title: String!, $description: String!, $url: String!) {
    createTrack(title: $title, description: $description, url: $url) {
      track {
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
  }
`;

gql`
  mutation DeleteTrack($trackId: Int!) {
    deleteTrack(trackId: $trackId) {
      trackId
    }
  }
`;
