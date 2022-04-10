import 'antd/dist/antd.css'; // ant still uses css/less (instead of a jss solution)
import { noop } from 'lodash';
import 'modern-normalize/modern-normalize.css'; // god bless sindre
import React, { useRef, useState } from 'react';
import { getMovies, IGetMoviesResponse } from './api/getMovies';
import SearchHeader from './components/SearchHeader';
import { useLocationHash } from './hooks/useLocationHash';
import { apiCall, ApiCallState } from './utils/apiCall';
import { triggerInitialHashChange, updateLocationHashParams } from './utils/navigation';

triggerInitialHashChange();

export default function App() {
  const [searchState, setSearchState] = useState(ApiCallState.Uninitialized);
  const [searchResult, setSearchResult] = useState<IGetMoviesResponse | null>(null);
  const [searchFor, setSearchFor] = useState('');

  const setSearchValueRef = useRef(noop);
  useLocationHash('query', (query) => {
    setSearchFor(query ?? '');
    if (query && query !== searchFor) {
      apiCall.fromComponent<IGetMoviesResponse>(getMovies(query), setSearchResult, setSearchState);
    }
    setSearchValueRef.current(query);
  });

  const showResults =
    searchFor !== '' && searchResult !== null && searchState === ApiCallState.Fulfilled;
  return (
    <>
      <SearchHeader
        setValue={setSearchValueRef}
        hasBackButton={searchFor !== ''}
        onSubmit={(val) => updateLocationHashParams('query', val)}
      />
      {showResults && (
        <ul>
          {searchResult.results.map((result) => (
            <li key={result.id}>{result.title}</li>
          ))}
        </ul>
      )}
    </>
  );
}
