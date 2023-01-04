import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import OverviewPage from './OverviewPage';
import {createUseStyles} from 'react-jss';
import WatchlistLink from './WatchlistLink';
import WatchlistPage from './WatchlistPage';
import MovieDetailsPage from './MovieDetailsPage';
import AjaxLoader from './AjaxLoader';
import ErrorNotification from './ErrorNotification';

const useStyles = createUseStyles({
  component: {
    padding: '5px 10px 10px 10px',
    minWidth: 320,
    maxWidth: 1000,
    margin: '0 auto',
    backgroundColor: '#fff',
    boxShadow: '0 0 45px rgba(0, 0, 0, .2)',
    minHeight: 'calc(100% - 15px)'
  }
});

function App() {
  const classes = useStyles();
  return (
    <Router>
      <div className={classes.component}>
        <ErrorNotification/>
        <AjaxLoader/>
        <WatchlistLink/>
        <Switch>
          <Route path="/watchlist"><WatchlistPage/></Route>
          <Route path="/movie/:id"><MovieDetailsPage/></Route>
          <Route path="/"><OverviewPage/></Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
