import { Layout } from 'antd';
import 'antd/dist/antd.css'; // ant still uses css/less (instead of a jss solution)
import { Content, Header } from 'antd/lib/layout/layout';
import 'modern-normalize/modern-normalize.css'; // god bless sindre
import React, { useRef, useState } from 'react';
import { getMovies, IGetMoviesResponse } from './api/getMovies';
import AppFooter from './components/AppFooter';
import CenterSpin from './components/CenterSpin';
import SearchHeader from './components/SearchHeader';
import { useLocationHash } from './hooks/useLocationHash';
import { apiCall, ApiCallState } from './utils/apiCall';
import { style, styles } from './utils/css';
import { noop } from './utils/function';
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

  const isSearching = searchState === ApiCallState.Pending;
  const showResults =
    searchFor !== '' && searchResult !== null && searchState === ApiCallState.Fulfilled;
  return (
    <Layout style={style.hFull}>
      <Header style={style.m0p0}>
        <SearchHeader
          setValue={setSearchValueRef}
          hasBackButton={searchFor !== ''}
          searchDisabled={isSearching}
          onSubmit={(val) => updateLocationHashParams('query', val)}
        />
      </Header>
      <Content style={styles(style.hFull, style.overflowYAuto)}>
        {isSearching && <CenterSpin />}
        {showResults && (
          <ul style={{ margin: 20 }}>
            {searchResult.results.map((result) => (
              <li key={result.id}>{result.title}</li>
            ))}
          </ul>
        )}
      </Content>
      <AppFooter />
    </Layout>
  );
}
