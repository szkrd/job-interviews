import React, {useState} from 'react';
import apiService from '../services/apiService';
import {createUseStyles} from 'react-jss';
import {Link} from 'react-router-dom';
import {IDiscovery} from '../../../client/src/app/types/movies';
import useObservable from '../hooks/useObservable';

const useStyles = createUseStyles({
  component: {
    '& h2': { margin: 0, padding: '2px 0 5px 5px', fontSize: 20 },
    '& ul, & li': { margin: 0, padding: 2, listStyle: 'none' }
  }
});

export default function TopRated() {
  const classes = useStyles();
  const [movies, setMovies] = useState<IDiscovery[]>([]);

  useObservable(() => apiService.getTopRatedMovies(), setMovies);

  return (
    <div className={classes.component}>
      <h2>Top movies of all time</h2>
      <ul>
        {movies.map((movie) => (
          <li key={movie.id}>
            <Link to={`/movie/${movie.id}`}>
              {movie.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
