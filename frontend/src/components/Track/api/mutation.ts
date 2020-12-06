import { gql } from '@apollo/client';

export const CREATE_LINK_MUTATION = gql`
mutation CreateLike($trackId:Int!){
  createLike(trackId:$trackId){
    track{
      id
      likes{
        id
      }
    }
  }
}
`;