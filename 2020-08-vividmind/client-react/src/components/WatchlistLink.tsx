import React, {useState} from 'react';
import {createUseStyles} from 'react-jss';
import {Link} from 'react-router-dom';
import useObservable from '../hooks/useObservable';
import watchlistService from '../services/watchlistService';

const useStyles = createUseStyles({
  component: {
    display: 'block',
    position: 'sticky',
    top: 0,
    float: 'right',
    backgroundColor: '#fff',
    padding: 5,
    margin: '-10px -10px 0 0',
    borderRadius: '0 0 0 5px'
  }
});

export default function WatchlistLink() {
  const classes = useStyles();
  const [count, setCount] = useState<number>(0);
  useObservable<number>(watchlistService.count$, setCount);

  return (
    <div className={classes.component}>
      <Link to="/watchlist">
        My watchlist
        {count > 0 && (
          <span>
            ({count})
          </span>
        )}
      </Link>
    </div>
  );
}
