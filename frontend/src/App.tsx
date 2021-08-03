import CssBaseline from '@material-ui/core/CssBaseline/CssBaseline';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { useMeLazyQuery } from './api/graphql/api';
import './App.css';
import Login from './components/Auth/Login';
import { Header } from './components/Shared/Header';
import { Loading } from './components/Shared/Loading';
import MainContext, { initialState } from './MainContext';
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';
import ProtectedRoute from './ProtectedRoute';
import reducer from './reducer';
import LogRocket from 'logrocket';

LogRocket.init('k6leuh/luisandia');

const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#00CBFF',
      main: '#007BDF',
      dark: '#006DC6',
    },
    secondary: {
      light: '#DFE0E0',
      main: '#FF3C32',
      dark: '#FF3C32',
      contrastText: '#ffcc00',
    },
  },
});

function App() {
  const [meQuery, { data, loading }] = useMeLazyQuery();

  const [state, dispatch] = React.useReducer(reducer, initialState);

  React.useEffect(() => {
    meQuery();
  }, [meQuery]);

  if (loading) return <Loading />;
  if (data) {
    state.currentUser = data.me;
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <MainContext.Provider value={{ state, dispatch }}>
        <Router>
          <Header />
          <Switch>
            <ProtectedRoute exact path="/" component={Dashboard} />
            <ProtectedRoute exact path="/profile/:id" component={Profile} />
            <Route exact path="/login" component={Login} />
          </Switch>
        </Router>
      </MainContext.Provider>
    </ThemeProvider>
  );
}

export default App;
