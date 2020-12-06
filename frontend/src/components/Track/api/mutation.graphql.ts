import { gql } from '@apollo/client';

const CREATE_LINK_MUTATION = gql`
  mutation CreateLike($trackId: Int!) {
    createLike(trackId: $trackId) {
      track {
        id
        likes {
          id
        }
      }
    }
  }
`;

export default CREATE_LINK_MUTATION;
