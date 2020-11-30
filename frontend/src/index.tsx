import { ApolloClient, ApolloProvider, createHttpLink, InMemoryCache } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import React, { useReducer } from 'react';
import ReactDOM from 'react-dom';
import {
  CurrentUserFragment,
  MeDocument,
  MeQuery,
  MeQueryVariables,
  useMeLazyQuery,
} from './api/graphql/api';
import App from './App';
import './index.css';
import MainContext, { initialState } from './MainContext';
import reducer from './reducer';
import reportWebVitals from './reportWebVitals';

const httpLink = createHttpLink({
  // uri: 'http://172.26.0.2:8000/graphql/',
  uri: '/api/graphql/',
});

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem('token');
  console.log('my token ', token);
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `JWT ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

const Root = () => {
  // const ini = useContext(MainContext);



  return (
    <ApolloProvider client={client}>
      <React.StrictMode>
          <App />
      </React.StrictMode>
    </ApolloProvider>
  );
};

ReactDOM.render(<Root />, document.getElementById('root'));

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
