/* eslint-disable import/no-extraneous-dependencies */
import userEvent from '@testing-library/user-event';
import axios from 'axios';
import React from 'react';
import {
  CreateTrackDocument,
  DeleteTrackDocument,
  GetTracksDocument,
  GetTracksQuery,
} from 'src/api/graphql/api';
import { SEARCH_TRACKS } from 'src/api/graphql/queries.graphql';
import { act, fireEvent, render, tick } from 'src/test_utils/render';
import { mocked } from 'ts-jest/utils';
import Dashboard from '../Dashboard';

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
        id: '1',
        username: 'zafiron',
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
              id: '1',
              username: 'zafiron',
              likeSet: [],
            },
          },
        ],
      },
    },
  },
  {
    request: {
      query: DeleteTrackDocument,
      variables: {
        trackId: 16,
      },
    },
    result: {
      data: {
        deleteTrack: {
          trackId: 16,
        },
      },
    },
  },
  {
    request: {
      query: CreateTrackDocument,
      variables: {
        title: 'tu trouveras',
        description:
          'Reference site about Lorem Ipsum, giving information on its origins',
        url: 'www.myurl.com',
      },
    },
    result: {
      data: {
        createTrack: {
          track: {
            __typename: 'TrackType',
            id: '10',
            title: 'tu trouveras',
            description:
              'Reference site about Lorem Ipsum, giving information on its origins',
            url: 'www.myurl.com',
            likes: [],
            postedBy: {
              __typename: 'UserType',
              id: '1',
              username: 'zafiron',
              likeSet: [],
            },
          },
        },
      },
    },
  },
];

const TITLE = 'tu trouveras';
const DESCRIPTION =
  'Reference site about Lorem Ipsum, giving information on its origins';

jest.mock('axios');

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

  it('searching track', async () => {
    const component = render(<Dashboard />, mocks);
    await act(tick);
    expect(component.queryByText(/^tu nombre$/i)).toBeTruthy();

    // searching track
    const searchButton = component.getByTestId('track-search');
    const searchText = component.getByPlaceholderText(
      'Search All Tracks',
    ) as HTMLInputElement;

    fireEvent.change(searchText, { target: { value: 'libido' } });
    expect(searchText.value).toBe('libido');
    fireEvent.submit(searchButton);

    await act(tick);
    expect(component.queryByText(/^tu nombre$/i)).toBeFalsy();
    expect(component.queryByText(/^libido sed$/i)).toBeTruthy();

    component.debug();
  });
  it('deleting track', async () => {
    const component = render(<Dashboard />, mocks);

    await act(tick);
    expect(component.queryByText(/^tu nombre$/i)).toBeTruthy();

    // deleting track
    const deleteButton = component.getByTestId('track-delete-16');

    fireEvent.click(deleteButton);
    await act(tick);
    expect(component.queryByText(/^tu nombre$/i)).toBeFalsy();

    component.debug();
  });

  it('creating track', async () => {
    const component = render(<Dashboard />, mocks);

    await act(tick);
    expect(component.queryByText(/^tu nombre$/i)).toBeTruthy();
    expect(component.queryByText(/^Add Track$/i)).toBeFalsy();

    // open popup create track
    const openButton = component.getByTestId('track-open-create-dialog');
    fireEvent.click(openButton);
    await act(tick);
    expect(component.queryByText(/^Add Track$/i)).toBeTruthy();

    // Adding data
    const trackTitle = component.getByTestId('track-title') as HTMLInputElement;
    const trackDescription = component.getByTestId(
      'track-description',
    ) as HTMLInputElement;

    fireEvent.change(trackTitle, { target: { value: TITLE } });
    fireEvent.change(trackDescription, { target: { value: DESCRIPTION } });

    expect(trackTitle.value).toBe(TITLE);
    expect(trackDescription.value).toBe(DESCRIPTION);

    let file = new File(['hello'], 'hello.mp3', { type: 'audio/mp3' });
    const audioInput = component.getByTestId(
      'track-audio-file',
    ) as HTMLInputElement;
    Object.defineProperty(file, 'size', { value: 10000000 * 1024 + 1 });
    userEvent.upload(audioInput, file);
    expect(
      component.queryByText(`${file.name}: File size too large`),
    ).toBeTruthy();
    file = new File(['hello'], 'hello.mp3', { type: 'audio/mp3' });

    userEvent.upload(audioInput, file);
    expect(
      component.queryByText(`${file.name}: File size too large`),
    ).toBeFalsy();

    expect(audioInput.files![0]).toStrictEqual(file);
    expect(audioInput.files?.item(0)).toStrictEqual(file);
    expect(audioInput.files).toHaveLength(1);

    // creating track
    const createButton = component.getByTestId('track-create');

    await act(tick);
    mocked(axios.post).mockResolvedValueOnce(
      Promise.resolve({
        status: 200,
        data: { url: 'www.myurl.com' },
      }),
    );

    fireEvent.click(createButton);
    await act(tick);
    expect(axios.post).toHaveBeenCalledTimes(1);
    await act(tick);
    expect(component.queryByText(/^tu trouveras$/i)).toBeTruthy();
  });
});
