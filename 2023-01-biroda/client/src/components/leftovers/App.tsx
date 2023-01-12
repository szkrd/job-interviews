import { Layout } from 'antd';
import 'antd/dist/antd.css'; // ant still uses css/less (instead of a jss solution)
import { Content, Header } from 'antd/lib/layout/layout';
import 'modern-normalize/modern-normalize.css'; // god bless sindre
import React, { useCallback, useRef, useState } from 'react';
import { getMovies, IGetMoviesResponse } from '../../api/getMovies';
import AppFooter from './AppFooter';
import CenterSpin from './CenterSpin';
import DetailsModal from './DetailsModal';
import SearchHeader from './SearchHeader';
import SearchResultsTable from './SearchResultsTable';
import { useLocationHash } from '../../hooks/useLocationHash';
import { apiCall, ApiCallState } from '../../utils/apiCall';
import { style, styles } from '../../utils/css';
import { noop } from '../../utils/function';
import { triggerInitialHashChange, updateLocationHashParams } from '../../utils/navigation';

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

  const onSearchSubmit = useCallback((val: string) => updateLocationHashParams('query', val), []);
  const onMovieTitleClick = useCallback((id: number) => updateLocationHashParams('id', id), []);
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
          onSubmit={onSearchSubmit}
        />
      </Header>
      <Content style={styles(style.hFull, style.overflowYAuto, { marginTop: 10 })}>
        {isSearching && <CenterSpin />}
        {showResults && (
          <SearchResultsTable dataSource={searchResult.results} onItemClick={onMovieTitleClick} />
        )}
        <DetailsModal />
      </Content>
      <AppFooter />
    </Layout>
  );
}
