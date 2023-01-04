import React, {useEffect, useState} from 'react';
import watchlistService from '../services/watchlistService';
import useObservable from '../hooks/useObservable';

interface IProps {
  movieId?: number
}

export default function AddToWatchlist(props: IProps) {
  const movieId = props.movieId || 0;
  const [isAdded, setIsAdded] = useState<boolean>(false);
  const [list, setList] = useState<number[]>([]);

  useObservable<number[]>(watchlistService.list$, setList);
  useEffect(() => { setIsAdded(list.includes(movieId)); }, [list, movieId]);

  const onClick = () => {
    if (isAdded) {
      watchlistService.removeFromWatchlist(movieId);
    } else {
      watchlistService.addToWatchlist(movieId);
    }
  };
  return (
    <div>
      <button onClick={onClick}>
        {isAdded ? 'Remove from watchlist' : 'Add to watchlist'}
      </button>
    </div>
  );
}
