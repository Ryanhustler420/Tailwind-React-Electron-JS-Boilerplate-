import React, { useEffect } from 'react';

import { HashRouter as Router, Switch, Route, Redirect, useHistory } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux';

import StoreProvider from './store/StoreProvider';

// HOC
import ContainerWrapper from './views/ContainerWrapper';

// Views
import Home from './views/container/Home';
import Login from './views/container/Login';
import Register from './views/container/Register';
import Settings from './views/container/Settings';

import { updateSessionFromCache } from './actions/session-actions';
import { listenToConnectionChanges } from './actions/connection-actions';
import { loadInitialSettings } from './actions/settings-actions';
import { Toast } from './utils/Toast';

import * as Constants from './Constants';
import BROWSER_STORAGE from './utils/BrowserStorage';

function Application() {

  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => handleHotKeysListeners(dispatch, history));
  useEffect(() => showCurrentEnvToast());
  useEffect(() => {
    showRunningEnvValue();
    showRootFiles();
  }, [])

  useEffect(() => {
    sendEnvsToMainProcess();
    dispatch(loadInitialSettings());
    dispatch(updateSessionFromCache());
    const connectionListenerUnsubscrib = dispatch(listenToConnectionChanges());
    return () => { connectionListenerUnsubscrib(); }
  }, [])

  return (
    <Router>
      <ContainerWrapper>
        <Switch>
          <Route path="/login" exact>
            <Login />
          </Route>
          <Route path="/register" exact>
            <Register />
          </Route>
          <AuthRoute path="/settings">
            <Settings />
          </AuthRoute>
          <AuthRoute path="/" exact>
            <Home />
          </AuthRoute>
          {/* <Redirect from='/*' to='/' /> */}
        </Switch>
      </ ContainerWrapper>
    </Router>
  );
}

function AuthRoute({ children, ...rest }) {
  const session = useSelector(({ session }) => session.infos);
  const onlyChild = React.Children.only(children);

  return (<Route
    {...rest} // Providing the props as it is to children
    render={props =>
      session.cookie ? React.cloneElement(onlyChild, { ...rest, ...props, }) :
        <Redirect to="/login" />} />
  )
}

function sendEnvsToMainProcess() {
  const envs = { 'someValue': 'shouldReceiveOnMainProcessDataStatgeClass' }
  window.electron?.portal.appname_values.send(envs);
}

export default function App() {
  return (
    <StoreProvider>
      <Application />
    </StoreProvider>
  )
}

const handleHotKeysListeners = (dispatch) => {
  window.electron?.appApi.hotkey.openL((info) => {
    // you can handle such cases from here...
    switch (info?.reduxStateKey) {
      case 'sideBarVisible':
        // dispatch(updateSettingsToggleSideBarVisibility());
        break;
      case 'headerVisible':
        // dispatch(updateSettingsToggleHeaderVisibility());
        break;
      case 'footerVisible':
        // dispatch(updateSettingsToggleFooterVisibility());
        break;
      default:
        break;
    }
    Toast.bottom_center.stage('success', info?.description);
  });

  return () => {
    window.electron?.appApi.hotkey.closeL();
  }
}

const showCurrentEnvToast = () => {
  if (window.electron?.appApi?.is_dev) Toast.bottom_center.stage('success', 'Running Development Server');
}

const showRunningEnvValue = () => {
  if (BROWSER_STORAGE.showRunningEnvValue()) console.log('Application is running on:', Constants.rootNode);
}

const showRootFiles = () => {
  if (BROWSER_STORAGE.showCwdFilesValue()) {
    window.electron?.appApi.getInstallationDirectory.send();
    window.electron?.appApi.getInstallationDirectory.openL(o => {
      window.electron?.appApi.getInstallationDirectory.closeL();
      console.log(o);
    });
  }
}