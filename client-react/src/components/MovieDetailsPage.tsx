/* eslint-disable jsx-a11y/accessible-emoji */
import React, {useState} from 'react';
import {useParams} from 'react-router-dom';
import useObservable from '../hooks/useObservable';
import apiService from '../services/apiService';
import {IDetails} from '../../../client/src/app/types/movies';
import {gt, num, range} from '../utils/number';
import CastAndCrew from './CastAndCrew';
import Reviews from './Reviews';
import AddToWatchlist from './AddToWatchlist';

interface IPageUrlParams {
  id?: string;
}

export default function MovieDetailsPage() {
  const [details, setDetails] = useState<IDetails>();
  const urlParams = useParams() as IPageUrlParams;
  const id = parseInt(urlParams.id || '', 10) || 0;
  useObservable(() => apiService.getMovieDetails(id), setDetails, [id]);
  return (
    <div>
      {details !== undefined ? (
        <>
          <h1>{details.title}</h1>
          <aside>{details.overview}</aside>
          <AddToWatchlist movieId={id}/>
          {gt(details.vote_count, 0) && (
            <p>
              <strong>Score:</strong>
              {range(details.vote_average).map((key) => (
                <span key={key}>⭐</span>
              ))}
              <span>
                10 / {num(details.vote_average)}
              </span>
            </p>
          )}
        </>
      ) : (
        <p>...</p>
      )}
      {id > 0 && (
        <div>
          <CastAndCrew movieId={id}/>
          <Reviews movieId={id}/>
        </div>
      )}
    </div>
  );
}
