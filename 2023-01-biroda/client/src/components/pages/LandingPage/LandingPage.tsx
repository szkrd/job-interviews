import React, { FC, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { getMostPopularMovies } from '../../../api/getMostPopularMovies';
import { IGetMoviesResponse } from '../../../api/getMovies';
import { apiCall, ApiCallState } from '../../../utils/apiCall';
import MovieGrid from '../../common/MovieGrid/MovieGrid';
import Spinner from '../../common/Spinner/Spinner';

const LandingPage: FC = () => {
  const [searchState, setSearchState] = useState(ApiCallState.Uninitialized);
  const [searchResult, setSearchResult] = useState<IGetMoviesResponse | null>(null);
  const location = useLocation();
  useEffect(() => {
    if (location.pathname !== '/' || searchState !== ApiCallState.Uninitialized) return;
    const caller = apiCall.fromComponent<IGetMoviesResponse>(
      getMostPopularMovies(),
      setSearchResult,
      setSearchState
    );
    return caller.abort;
  }, [location]);
  return (
    <div>
      {[ApiCallState.Pending, ApiCallState.Uninitialized].includes(searchState) && <Spinner />}
      {searchState === ApiCallState.Fulfilled && (
        <MovieGrid dataSource={searchResult?.results ?? []} />
      )}
    </div>
  );
};

export default LandingPage;
