import React, {Fragment} from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Landing from './components/Landing';
import {Provider} from 'react-redux';
import store from './store';
import './App.css';


const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          <Switch>
            <Route exact path="/" component={Landing}/>
          </Switch>
        </Fragment>
      </Router>
    </Provider>
  );
};
export default App;
