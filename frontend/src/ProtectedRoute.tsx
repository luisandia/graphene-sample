import React, { useContext } from 'react';
import MainContext from './MainContext';
import { Route, Redirect, RouteProps } from 'react-router-dom';
import { useMeQuery } from './api/graphql/api';
import { Loading } from './components/Shared/Loading';

export interface ProtectedRouteProps extends RouteProps {
  component: React.ComponentType<RouteProps>;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = (props) => {
  const { component: Component, ...rest } = props;
  const { state } = useContext(MainContext);
  const { loading, error } = useMeQuery({ fetchPolicy: 'cache-and-network' });

  if (loading) return <Loading />;

  let pass = true;

  if (error) {
    if (error.message.startsWith('Not logged in!')) {
      pass = false;
    }
    console.error(error);
  }

  return (
    <Route
      render={(props) =>
        state.isAuth || pass ? <Component {...props} /> : <Redirect to="/login" />
      }
      {...rest}
    />
  );
};

export default ProtectedRoute;
