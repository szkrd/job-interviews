import React, {useState} from 'react';
import {ITopRated} from '../../../client/src/app/types/movies';
import apiService from '../services/apiService';
import {Link} from 'react-router-dom';
import AddToWatchlist from './AddToWatchlist';
import {createUseStyles} from 'react-jss';
import useObservable from '../hooks/useObservable';

const useStyles = createUseStyles({
  component: {
    '& h2': { margin: 0, padding: '15px 0 5px 5px', fontSize: 20 },
    '& ul, & li': { margin: 0, padding: 2, listStyle: 'none' }
  },
  row: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    background: 'linear-gradient(to bottom, rgba(255, 255, 255, 0) 0%, rgba(0, 0, 0, .1) 100%)',
    margin: 5,
    borderRadius: 5
  },
  link: {
    display: 'block',
    padding: 5
  }
});

export default function DiscoverMovies() {
  const classes = useStyles();
  const [movies, setMovies] = useState<ITopRated[]>([]);
  const [page, setPage] = useState<number>(1);

  const onMovies = (data: ITopRated[]) => {
    setMovies(data ? movies.concat(data) : movies);
  };

  const onShowMoreClick = () => {
    setPage(page + 1);
  };

  useObservable(() => apiService.discoverMovie(page), onMovies, [page]);

  return (
    <div className={classes.component}>
      <h2>Discover movies</h2>
      {movies.length > 0 && (
        <ul>
          {movies.map((movie) => (
            <li key={movie.id} className={classes.row}>
              <Link to={`/movie/${movie.id}`}>
                {movie.release_date} {movie.title}
              </Link>
              <AddToWatchlist movieId={movie.id}/>
            </li>
          ))}
          <li>
            <button onClick={onShowMoreClick}>Show more</button>
          </li>
        </ul>
      )}
    </div>
  );
}
