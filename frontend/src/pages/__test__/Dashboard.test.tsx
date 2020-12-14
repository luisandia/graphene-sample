// import { MockedProvider } from '@apollo/client/testing';
import React from 'react';
import { GetTracksDocument, GetTracksQuery } from 'src/api/graphql/api';
import { SEARCH_TRACKS } from 'src/api/graphql/queries.graphql';
import { act, fireEvent, render } from 'src/test_utils/render';
import Dashboard from '../Dashboard';
// import { render, getQueriesForElement } from '@testing-library/react';
// import { act } from 'react-dom/test-utils';

const mockedData: GetTracksQuery = {
  __typename: 'Query',
  tracks: [
    {
      __typename: 'TrackType',
      id: '9',
      title: 'libido sed',
      description: 'my libido song description',
      url:
        'http://res.cloudinary.com/dmem1806r/video/upload/v1580715083/u4crcgmbxbjdlclitduq.mp3',
      likes: [],
      postedBy: {
        __typename: 'UserType',
        id: '7',
        username: 'carlos',
        likeSet: [],
      },
    },
    {
      __typename: 'TrackType',
      id: '16',
      title: 'tu nombre',
      description: 'my song description',
      url:
        'http://res.cloudinary.com/zafiron/video/upload/v1607230836/vpy6yiumuacdxdmaatp4.mp3',
      likes: [
        {
          __typename: 'LikeType',
          id: '6',
          likeSet: [],
        },
      ],
      postedBy: {
        __typename: 'UserType',
        id: '1',
        username: 'zafiron',
        likeSet: [],
      },
    },
  ],
};

const mocks = [
  {
    request: {
      query: GetTracksDocument,
    },
    result: {
      data: mockedData,
      errors: [],
    },
  },
  {
    request: {
      query: SEARCH_TRACKS,
      variables: {
        search: 'libido',
      },
    },
    result: {
      data: {
        tracks: [
          {
            __typename: 'TrackType',
            id: '9',
            title: 'libido sed',
            description: 'my libido song description',
            url:
              'http://res.cloudinary.com/dmem1806r/video/upload/v1580715083/u4crcgmbxbjdlclitduq.mp3',
            likes: [],
            postedBy: {
              __typename: 'UserType',
              id: '7',
              username: 'carlos',
              likeSet: [],
            },
          },
        ],
      },
    },
  },
];

const tick = async () => {
  await new Promise((resolve) => setTimeout(resolve, 10));
};

describe('general dashboard test', () => {
  it('dashboard has data', async () => {
    const component = render(<Dashboard />, mocks);
    // const component = render(
    //   <MockedProvider mocks={mocks} addTypename={false}>
    //     <TrackList />
    //   </MockedProvider>,
    // );
    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 0));
    });

    component.debug();
    expect(component.queryByText(/^libido sed$/i)).toBeTruthy();
  });
  it('dashboard has empty data', async () => {
    const component = render(<Dashboard />, []);
    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 0));
    });
    expect(component.queryByText(/^libido sed$/i)).toBeFalsy();
  });

  it.only('searching artist', async () => {
    const component = render(<Dashboard />, mocks);
    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 0));
    });
    // component.debug();
    expect(component.queryByText(/^tu nombre$/i)).toBeTruthy();

    const searchButton = component.getByTestId('track-search');
    const searchText = component.getByPlaceholderText(
      'Search All Tracks',
    ) as HTMLInputElement;
    fireEvent.change(searchText, { target: { value: 'libido' } });
    expect(searchText.value).toBe('libido');
    fireEvent.submit(searchButton);
    // print()
    // await act(async () => {
    //   await new Promise((resolve) => setTimeout(resolve, 10));
    // });
    await act(tick);
    expect(component.queryByText(/^tu nombre$/i)).toBeFalsy();
    expect(component.queryByText(/^libido sed$/i)).toBeTruthy();
    component.debug();
  });
});
