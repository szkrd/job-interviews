import React, {useState} from 'react';
import {ICredits} from '../../../client/src/app/types/people';
import useObservable from '../hooks/useObservable';
import apiService from '../services/apiService';

interface IProps {
  movieId: number;
}

export default function CastAndCrew(props: IProps) {
  const { movieId } = props;
  const [maxShown, setMaxShown] = useState<number>(10);
  const [credits, setCredits] = useState<ICredits>();

  useObservable(() => apiService.getMovieCredits(movieId), setCredits);

  const onShowAllClick = () => setMaxShown(-1);
  const castPartial = Array.from(credits?.cast || []).slice(0, maxShown);
  const showAllButtonVisible = Array.isArray(credits?.cast) && credits!.cast.length > maxShown && maxShown !== -1

  return (
    <div>
      {credits !== undefined ? (
        <>
          <h2>Cast</h2>
          <ul>
            {castPartial.map(member => (
              <li key={member.id}>
                <p>
                  <strong>{member.character || 'unspecified'}</strong> - {member.name}
                </p>
              </li>
            ))}
          </ul>
          {showAllButtonVisible && (
            <p>
              <button onClick={onShowAllClick}>
              Show all {credits?.cast!.length}
            </button>
            </p>
          )}
        </>
      ) : (<p>...</p>)}
    </div>
  );
}
