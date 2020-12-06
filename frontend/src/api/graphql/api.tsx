import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: number;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /**
   * The `DateTime` scalar type represents a DateTime
   * value as specified by
   * [iso8601](https://en.wikipedia.org/wiki/ISO_8601).
   */
  DateTime: any;
  /**
   * The `GenericScalar` scalar type represents a generic
   * GraphQL scalar value that could be:
   * String, Boolean, Int, Float, List or Object.
   */
  GenericScalar: any;
};

export type Query = {
  __typename: 'Query';
  tracks?: Maybe<Array<Maybe<TrackType>>>;
  likes?: Maybe<Array<Maybe<LikeType>>>;
  user?: Maybe<UserType>;
  me?: Maybe<UserType>;
};


export type QueryTracksArgs = {
  search?: Maybe<Scalars['String']>;
};


export type QueryUserArgs = {
  id: Scalars['Int'];
};

export type TrackType = {
  __typename: 'TrackType';
  id: Scalars['ID'];
  title: Scalars['String'];
  description: Scalars['String'];
  url: Scalars['String'];
  createdAt: Scalars['DateTime'];
  postedBy?: Maybe<UserType>;
  likes: Array<LikeType>;
};


export type UserType = {
  __typename: 'UserType';
  id: Scalars['ID'];
  password: Scalars['String'];
  lastLogin?: Maybe<Scalars['DateTime']>;
  /** Designates that this user has all permissions without explicitly assigning them. */
  isSuperuser: Scalars['Boolean'];
  /** Required. 150 characters or fewer. Letters, digits and @/./+/-/_ only. */
  username: Scalars['String'];
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  email: Scalars['String'];
  /** Designates whether the user can log into this admin site. */
  isStaff: Scalars['Boolean'];
  /** Designates whether this user should be treated as active. Unselect this instead of deleting accounts. */
  isActive: Scalars['Boolean'];
  dateJoined: Scalars['DateTime'];
  trackSet: Array<TrackType>;
  likeSet: Array<LikeType>;
};

export type LikeType = {
  __typename: 'LikeType';
  id: Scalars['ID'];
  user?: Maybe<UserType>;
  track: TrackType;
};

export type Mutation = {
  __typename: 'Mutation';
  createTrack?: Maybe<CreateTrack>;
  updateTrack?: Maybe<UpdateTrack>;
  deleteTrack?: Maybe<DeleteTrack>;
  createLike?: Maybe<CreateLike>;
  createUser?: Maybe<CreateUser>;
  /** Obtain JSON Web Token mutation */
  tokenAuth?: Maybe<ObtainJsonWebToken>;
  verifyToken?: Maybe<Verify>;
  refreshToken?: Maybe<Refresh>;
};


export type MutationCreateTrackArgs = {
  description?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
  url?: Maybe<Scalars['String']>;
};


export type MutationUpdateTrackArgs = {
  description?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
  trackId: Scalars['Int'];
  url?: Maybe<Scalars['String']>;
};


export type MutationDeleteTrackArgs = {
  trackId: Scalars['Int'];
};


export type MutationCreateLikeArgs = {
  trackId: Scalars['Int'];
};


export type MutationCreateUserArgs = {
  email: Scalars['String'];
  password: Scalars['String'];
  username: Scalars['String'];
};


export type MutationTokenAuthArgs = {
  username: Scalars['String'];
  password: Scalars['String'];
};


export type MutationVerifyTokenArgs = {
  token?: Maybe<Scalars['String']>;
};


export type MutationRefreshTokenArgs = {
  token?: Maybe<Scalars['String']>;
};

export type CreateTrack = {
  __typename: 'CreateTrack';
  track?: Maybe<TrackType>;
};

export type UpdateTrack = {
  __typename: 'UpdateTrack';
  track?: Maybe<TrackType>;
};

export type DeleteTrack = {
  __typename: 'DeleteTrack';
  trackId?: Maybe<Scalars['Int']>;
};

export type CreateLike = {
  __typename: 'CreateLike';
  user?: Maybe<UserType>;
  track?: Maybe<TrackType>;
};

export type CreateUser = {
  __typename: 'CreateUser';
  user?: Maybe<UserType>;
};

/** Obtain JSON Web Token mutation */
export type ObtainJsonWebToken = {
  __typename: 'ObtainJSONWebToken';
  payload: Scalars['GenericScalar'];
  refreshExpiresIn: Scalars['Int'];
  token: Scalars['String'];
};


export type Verify = {
  __typename: 'Verify';
  payload: Scalars['GenericScalar'];
};

export type Refresh = {
  __typename: 'Refresh';
  payload: Scalars['GenericScalar'];
  refreshExpiresIn: Scalars['Int'];
  token: Scalars['String'];
};

export type TokenAuthMutationVariables = Exact<{
  username: Scalars['String'];
  password: Scalars['String'];
}>;


export type TokenAuthMutation = (
  { __typename: 'Mutation' }
  & { tokenAuth?: Maybe<(
    { __typename: 'ObtainJSONWebToken' }
    & Pick<ObtainJsonWebToken, 'token'>
  )> }
);

export type CreateTrackMutationVariables = Exact<{
  title: Scalars['String'];
  description: Scalars['String'];
  url: Scalars['String'];
}>;


export type CreateTrackMutation = (
  { __typename: 'Mutation' }
  & { createTrack?: Maybe<(
    { __typename: 'CreateTrack' }
    & { track?: Maybe<(
      { __typename: 'TrackType' }
      & Pick<TrackType, 'id' | 'title' | 'description' | 'url'>
      & { likes: Array<(
        { __typename: 'LikeType' }
        & Pick<LikeType, 'id'>
      )>, postedBy?: Maybe<(
        { __typename: 'UserType' }
        & Pick<UserType, 'id' | 'username'>
      )> }
    )> }
  )> }
);

export type DeleteTrackMutationVariables = Exact<{
  trackId: Scalars['Int'];
}>;


export type DeleteTrackMutation = (
  { __typename: 'Mutation' }
  & { deleteTrack?: Maybe<(
    { __typename: 'DeleteTrack' }
    & Pick<DeleteTrack, 'trackId'>
  )> }
);

export type UpdateTrackMutationVariables = Exact<{
  trackId: Scalars['Int'];
  title?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  url?: Maybe<Scalars['String']>;
}>;


export type UpdateTrackMutation = (
  { __typename: 'Mutation' }
  & { updateTrack?: Maybe<(
    { __typename: 'UpdateTrack' }
    & { track?: Maybe<(
      { __typename: 'TrackType' }
      & TrackSetFragmentFragment
    )> }
  )> }
);

export type GetTracksQueryVariables = Exact<{ [key: string]: never; }>;


export type GetTracksQuery = (
  { __typename: 'Query' }
  & { tracks?: Maybe<Array<Maybe<(
    { __typename: 'TrackType' }
    & TrackSetFragmentFragment
  )>>> }
);

export type CurrentUserFragment = (
  { __typename: 'UserType' }
  & Pick<UserType, 'id' | 'username' | 'firstName' | 'lastName' | 'email' | 'isStaff' | 'isSuperuser'>
  & LikesetFragmentFragment
);

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = (
  { __typename: 'Query' }
  & { me?: Maybe<(
    { __typename: 'UserType' }
    & CurrentUserFragment
  )> }
);

export type SearchTracksQueryVariables = Exact<{
  search?: Maybe<Scalars['String']>;
}>;


export type SearchTracksQuery = (
  { __typename: 'Query' }
  & { tracks?: Maybe<Array<Maybe<(
    { __typename: 'TrackType' }
    & TrackSetFragmentFragment
  )>>> }
);

export type UserProfileQueryVariables = Exact<{
  id: Scalars['Int'];
}>;


export type UserProfileQuery = (
  { __typename: 'Query' }
  & { user?: Maybe<(
    { __typename: 'UserType' }
    & Pick<UserType, 'id' | 'username' | 'dateJoined'>
    & { trackSet: Array<(
      { __typename: 'TrackType' }
      & TrackSetFragmentFragment
    )> }
    & LikesetFragmentFragment
  )> }
);

export type LikesetFragmentFragment = (
  { __typename: 'UserType' }
  & { likeSet: Array<(
    { __typename: 'LikeType' }
    & Pick<LikeType, 'id'>
    & { track: (
      { __typename: 'TrackType' }
      & TrackSetFragmentFragment
    ) }
  )> }
);

export type TrackSetFragmentFragment = (
  { __typename: 'TrackType' }
  & Pick<TrackType, 'id' | 'title' | 'description' | 'url'>
  & { likes: Array<(
    { __typename: 'LikeType' }
    & Pick<LikeType, 'id'>
  )>, postedBy?: Maybe<(
    { __typename: 'UserType' }
    & Pick<UserType, 'id' | 'username'>
  )> }
);

export type CreateLikeMutationVariables = Exact<{
  trackId: Scalars['Int'];
}>;


export type CreateLikeMutation = (
  { __typename: 'Mutation' }
  & { createLike?: Maybe<(
    { __typename: 'CreateLike' }
    & { track?: Maybe<(
      { __typename: 'TrackType' }
      & Pick<TrackType, 'id'>
      & { likes: Array<(
        { __typename: 'LikeType' }
        & Pick<LikeType, 'id'>
      )> }
    )> }
  )> }
);

export const TrackSetFragmentFragmentDoc = gql`
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
export const LikesetFragmentFragmentDoc = gql`
    fragment likesetFragment on UserType {
  likeSet {
    id
    track {
      ...trackSetFragment
    }
  }
}
    ${TrackSetFragmentFragmentDoc}`;
export const CurrentUserFragmentDoc = gql`
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
    ${LikesetFragmentFragmentDoc}`;
export const TokenAuthDocument = gql`
    mutation TokenAuth($username: String!, $password: String!) {
  tokenAuth(username: $username, password: $password) {
    token
  }
}
    `;
export type TokenAuthMutationFn = Apollo.MutationFunction<TokenAuthMutation, TokenAuthMutationVariables>;

/**
 * __useTokenAuthMutation__
 *
 * To run a mutation, you first call `useTokenAuthMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useTokenAuthMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [tokenAuthMutation, { data, loading, error }] = useTokenAuthMutation({
 *   variables: {
 *      username: // value for 'username'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useTokenAuthMutation(baseOptions?: Apollo.MutationHookOptions<TokenAuthMutation, TokenAuthMutationVariables>) {
        return Apollo.useMutation<TokenAuthMutation, TokenAuthMutationVariables>(TokenAuthDocument, baseOptions);
      }
export type TokenAuthMutationHookResult = ReturnType<typeof useTokenAuthMutation>;
export type TokenAuthMutationResult = Apollo.MutationResult<TokenAuthMutation>;
export type TokenAuthMutationOptions = Apollo.BaseMutationOptions<TokenAuthMutation, TokenAuthMutationVariables>;
export const CreateTrackDocument = gql`
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
export type CreateTrackMutationFn = Apollo.MutationFunction<CreateTrackMutation, CreateTrackMutationVariables>;

/**
 * __useCreateTrackMutation__
 *
 * To run a mutation, you first call `useCreateTrackMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateTrackMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createTrackMutation, { data, loading, error }] = useCreateTrackMutation({
 *   variables: {
 *      title: // value for 'title'
 *      description: // value for 'description'
 *      url: // value for 'url'
 *   },
 * });
 */
export function useCreateTrackMutation(baseOptions?: Apollo.MutationHookOptions<CreateTrackMutation, CreateTrackMutationVariables>) {
        return Apollo.useMutation<CreateTrackMutation, CreateTrackMutationVariables>(CreateTrackDocument, baseOptions);
      }
export type CreateTrackMutationHookResult = ReturnType<typeof useCreateTrackMutation>;
export type CreateTrackMutationResult = Apollo.MutationResult<CreateTrackMutation>;
export type CreateTrackMutationOptions = Apollo.BaseMutationOptions<CreateTrackMutation, CreateTrackMutationVariables>;
export const DeleteTrackDocument = gql`
    mutation DeleteTrack($trackId: Int!) {
  deleteTrack(trackId: $trackId) {
    trackId
  }
}
    `;
export type DeleteTrackMutationFn = Apollo.MutationFunction<DeleteTrackMutation, DeleteTrackMutationVariables>;

/**
 * __useDeleteTrackMutation__
 *
 * To run a mutation, you first call `useDeleteTrackMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteTrackMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteTrackMutation, { data, loading, error }] = useDeleteTrackMutation({
 *   variables: {
 *      trackId: // value for 'trackId'
 *   },
 * });
 */
export function useDeleteTrackMutation(baseOptions?: Apollo.MutationHookOptions<DeleteTrackMutation, DeleteTrackMutationVariables>) {
        return Apollo.useMutation<DeleteTrackMutation, DeleteTrackMutationVariables>(DeleteTrackDocument, baseOptions);
      }
export type DeleteTrackMutationHookResult = ReturnType<typeof useDeleteTrackMutation>;
export type DeleteTrackMutationResult = Apollo.MutationResult<DeleteTrackMutation>;
export type DeleteTrackMutationOptions = Apollo.BaseMutationOptions<DeleteTrackMutation, DeleteTrackMutationVariables>;
export const UpdateTrackDocument = gql`
    mutation UpdateTrack($trackId: Int!, $title: String, $description: String, $url: String) {
  updateTrack(
    trackId: $trackId
    title: $title
    url: $url
    description: $description
  ) {
    track {
      ...trackSetFragment
    }
  }
}
    ${TrackSetFragmentFragmentDoc}`;
export type UpdateTrackMutationFn = Apollo.MutationFunction<UpdateTrackMutation, UpdateTrackMutationVariables>;

/**
 * __useUpdateTrackMutation__
 *
 * To run a mutation, you first call `useUpdateTrackMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateTrackMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateTrackMutation, { data, loading, error }] = useUpdateTrackMutation({
 *   variables: {
 *      trackId: // value for 'trackId'
 *      title: // value for 'title'
 *      description: // value for 'description'
 *      url: // value for 'url'
 *   },
 * });
 */
export function useUpdateTrackMutation(baseOptions?: Apollo.MutationHookOptions<UpdateTrackMutation, UpdateTrackMutationVariables>) {
        return Apollo.useMutation<UpdateTrackMutation, UpdateTrackMutationVariables>(UpdateTrackDocument, baseOptions);
      }
export type UpdateTrackMutationHookResult = ReturnType<typeof useUpdateTrackMutation>;
export type UpdateTrackMutationResult = Apollo.MutationResult<UpdateTrackMutation>;
export type UpdateTrackMutationOptions = Apollo.BaseMutationOptions<UpdateTrackMutation, UpdateTrackMutationVariables>;
export const GetTracksDocument = gql`
    query getTracks {
  tracks {
    ...trackSetFragment
  }
}
    ${TrackSetFragmentFragmentDoc}`;

/**
 * __useGetTracksQuery__
 *
 * To run a query within a React component, call `useGetTracksQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetTracksQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetTracksQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetTracksQuery(baseOptions?: Apollo.QueryHookOptions<GetTracksQuery, GetTracksQueryVariables>) {
        return Apollo.useQuery<GetTracksQuery, GetTracksQueryVariables>(GetTracksDocument, baseOptions);
      }
export function useGetTracksLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetTracksQuery, GetTracksQueryVariables>) {
          return Apollo.useLazyQuery<GetTracksQuery, GetTracksQueryVariables>(GetTracksDocument, baseOptions);
        }
export type GetTracksQueryHookResult = ReturnType<typeof useGetTracksQuery>;
export type GetTracksLazyQueryHookResult = ReturnType<typeof useGetTracksLazyQuery>;
export type GetTracksQueryResult = Apollo.QueryResult<GetTracksQuery, GetTracksQueryVariables>;
export const MeDocument = gql`
    query me {
  me {
    ...currentUser
  }
}
    ${CurrentUserFragmentDoc}`;

/**
 * __useMeQuery__
 *
 * To run a query within a React component, call `useMeQuery` and pass it any options that fit your needs.
 * When your component renders, `useMeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMeQuery({
 *   variables: {
 *   },
 * });
 */
export function useMeQuery(baseOptions?: Apollo.QueryHookOptions<MeQuery, MeQueryVariables>) {
        return Apollo.useQuery<MeQuery, MeQueryVariables>(MeDocument, baseOptions);
      }
export function useMeLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MeQuery, MeQueryVariables>) {
          return Apollo.useLazyQuery<MeQuery, MeQueryVariables>(MeDocument, baseOptions);
        }
export type MeQueryHookResult = ReturnType<typeof useMeQuery>;
export type MeLazyQueryHookResult = ReturnType<typeof useMeLazyQuery>;
export type MeQueryResult = Apollo.QueryResult<MeQuery, MeQueryVariables>;
export const SearchTracksDocument = gql`
    query searchTracks($search: String) {
  tracks(search: $search) {
    ...trackSetFragment
  }
}
    ${TrackSetFragmentFragmentDoc}`;

/**
 * __useSearchTracksQuery__
 *
 * To run a query within a React component, call `useSearchTracksQuery` and pass it any options that fit your needs.
 * When your component renders, `useSearchTracksQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSearchTracksQuery({
 *   variables: {
 *      search: // value for 'search'
 *   },
 * });
 */
export function useSearchTracksQuery(baseOptions?: Apollo.QueryHookOptions<SearchTracksQuery, SearchTracksQueryVariables>) {
        return Apollo.useQuery<SearchTracksQuery, SearchTracksQueryVariables>(SearchTracksDocument, baseOptions);
      }
export function useSearchTracksLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<SearchTracksQuery, SearchTracksQueryVariables>) {
          return Apollo.useLazyQuery<SearchTracksQuery, SearchTracksQueryVariables>(SearchTracksDocument, baseOptions);
        }
export type SearchTracksQueryHookResult = ReturnType<typeof useSearchTracksQuery>;
export type SearchTracksLazyQueryHookResult = ReturnType<typeof useSearchTracksLazyQuery>;
export type SearchTracksQueryResult = Apollo.QueryResult<SearchTracksQuery, SearchTracksQueryVariables>;
export const UserProfileDocument = gql`
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
    ${LikesetFragmentFragmentDoc}
${TrackSetFragmentFragmentDoc}`;

/**
 * __useUserProfileQuery__
 *
 * To run a query within a React component, call `useUserProfileQuery` and pass it any options that fit your needs.
 * When your component renders, `useUserProfileQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUserProfileQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useUserProfileQuery(baseOptions: Apollo.QueryHookOptions<UserProfileQuery, UserProfileQueryVariables>) {
        return Apollo.useQuery<UserProfileQuery, UserProfileQueryVariables>(UserProfileDocument, baseOptions);
      }
export function useUserProfileLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<UserProfileQuery, UserProfileQueryVariables>) {
          return Apollo.useLazyQuery<UserProfileQuery, UserProfileQueryVariables>(UserProfileDocument, baseOptions);
        }
export type UserProfileQueryHookResult = ReturnType<typeof useUserProfileQuery>;
export type UserProfileLazyQueryHookResult = ReturnType<typeof useUserProfileLazyQuery>;
export type UserProfileQueryResult = Apollo.QueryResult<UserProfileQuery, UserProfileQueryVariables>;
export const CreateLikeDocument = gql`
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
export type CreateLikeMutationFn = Apollo.MutationFunction<CreateLikeMutation, CreateLikeMutationVariables>;

/**
 * __useCreateLikeMutation__
 *
 * To run a mutation, you first call `useCreateLikeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateLikeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createLikeMutation, { data, loading, error }] = useCreateLikeMutation({
 *   variables: {
 *      trackId: // value for 'trackId'
 *   },
 * });
 */
export function useCreateLikeMutation(baseOptions?: Apollo.MutationHookOptions<CreateLikeMutation, CreateLikeMutationVariables>) {
        return Apollo.useMutation<CreateLikeMutation, CreateLikeMutationVariables>(CreateLikeDocument, baseOptions);
      }
export type CreateLikeMutationHookResult = ReturnType<typeof useCreateLikeMutation>;
export type CreateLikeMutationResult = Apollo.MutationResult<CreateLikeMutation>;
export type CreateLikeMutationOptions = Apollo.BaseMutationOptions<CreateLikeMutation, CreateLikeMutationVariables>;