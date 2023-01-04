import React, {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import watchlistService from '../services/watchlistService';
import useObservable from '../hooks/useObservable';
import {IDetails} from '../../../client/src/app/types/movies';
import watchlistPageService from '../services/watchlistPageService';
import {createUseStyles} from 'react-jss';

const useStyles = createUseStyles({
  movieName: {
    display: 'inline-block',
    width: 400,
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
    overflow: 'hidden'
  }
});

export default function WatchlistPage() {
  const classes = useStyles();
  const [count, setCount] = useState<number>(0);
  const [details, setDetails] = useState<IDetails[]>([]);

  // the first would not work, and while the second should, that would mean
  // that we have to wrap _every_ observable into react state handlers
  // 1. `const offset$ = new BehaviorSubject(0);`
  // 2. `const [offset$, setOffset$] = useState(new BehaviorSubject(0));`

  useObservable(watchlistService.count$, setCount);
  useObservable(watchlistPageService.downloadWatchlistDetails, setDetails);
  useEffect(() => watchlistPageService.reset, []);

  const onClearWatchlistClick = () => watchlistService.reset();
  const onLoadMoreClick = () => watchlistPageService.increaseOffset();
  return (
    <div>
      <h1>Watchlist</h1>
      {count === 0 ? (
        <p>
          Your watchlist is empty.
        </p>
      ) : (
        <>
          <p>
            You have {count} items in your watchlist
            <br/>
            <button onClick={onClearWatchlistClick}>Clear my watchlist</button>
          </p>
          <ol>
            {details.map(movie => (
              <li key={movie.id}>
                <Link to={`/movie/${movie.id}`} className={classes.movieName}>
                  {movie.title}
                </Link>
                {' '}
                10 / {movie.vote_average}
                {' '}
                <span role="img" aria-label="stars">⭐</span>
              </li>
            ))}
          </ol>
          {count > details.length && (
            <button onClick={onLoadMoreClick}>Load more</button>
          )}
        </>
      )}
    </div>
  );
}
