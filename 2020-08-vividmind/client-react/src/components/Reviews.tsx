import React, {useState} from 'react';
import {IReview} from '../../../client/src/app/types/movies';
import useObservable from '../hooks/useObservable';
import apiService from '../services/apiService';
import {ellipsis} from '../utils/string';

interface IProps {
  movieId: number;
}

export default function Reviews(props: IProps) {
  const { movieId } = props;
  const [reviews, setReviews] = useState<IReview[]>();
  useObservable(() => apiService.getMovieReviews(movieId), setReviews);
  return (
    <div>
      {reviews !== undefined ? (
        <>
          <h2>Reviews</h2>
          {reviews.length === 0 && (
            <p>This movie has no reviews yet.</p>
          )}
          <ul>
            {reviews.map(review => (
              <li key={review.id}>
                <h3>
                  {review.author}
                </h3>
                <p>
                  {ellipsis(review.content, 500)}
                  {review.url !== undefined && (
                    <a href={review.url} target="_blank" rel="noopener noreferrer" title="Read all">
                      <span aria-label="Read all" role="img">🔗</span>
                    </a>
                  )}
                </p>
              </li>
            ))}
          </ul>
        </>
      ) : (<p>...</p>)}
    </div>
  );
}
