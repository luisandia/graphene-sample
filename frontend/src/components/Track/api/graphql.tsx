import { ApolloClient } from '@apollo/client';
import { CREATE_LINK_MUTATION } from './mutation';
import { CreateLike, CreateLikeVariables } from './types/CreateLike';

export const mutationCreateLike = (
  variables: CreateLikeVariables,
  apolloClient: ApolloClient<object>,
) => apolloClient.mutate<CreateLike, CreateLikeVariables>({
  mutation: CREATE_LINK_MUTATION,
  variables,
});
