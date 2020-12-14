import { MockedProvider, MockedResponse } from '@apollo/client/testing';
import { render, within } from '@testing-library/react';
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import MainContext, { ContextState } from '../MainContext';

export const UsecustomRender = (
  children: React.ReactElement<any>,
  mocks: MockedResponse<Record<string, any>>[] | undefined,
) => {
  const state: ContextState = {
    isAuth: false,
    currentUser: {
      __typename: 'UserType',
      id: '1',
      username: 'zafiron',
      firstName: '',
      lastName: '',
      email: 'zafiron@gmail.com',
      isStaff: false,
      isSuperuser: false,
      likeSet: [
        {
          __typename: 'LikeType',
          id: '6',
          track: {
            __typename: 'TrackType',
            id: '16',
            title: 'otro nombre',
            description: 'sdf',
            url:
              'http://res.cloudinary.com/zafiron/video/upload/v1607230836/vpy6yiumuacdxdmaatp4.mp3',
            likes: [],
          },
        },
      ],
    },
  };
  const dispatch = () => null;
  const ui = render(
    <MockedProvider mocks={mocks} addTypename={false}>
      <Router>
        <MainContext.Provider value={{ state, dispatch }}>
          {children}
        </MainContext.Provider>
      </Router>
    </MockedProvider>,
  );
  return ui;
};

export * from '@testing-library/react';
export { UsecustomRender as render };
