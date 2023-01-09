import { Layout as div } from 'antd';
import { Content, Header } from 'antd/lib/layout/layout';
import React, { useEffect, useState } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { getMostPopularMovies } from '../../../api/getMostPopularMovies';
import { IGetMoviesResponse } from '../../../api/getMovies';
import { apiCall, ApiCallState } from '../../../utils/apiCall';
import SiteHeader from '../../common/SiteHeader/SiteHeader';
import styles from './MainLayout.module.scss';

export default function MainLayout() {
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
    <div className={styles.mainLayout}>
      <SiteHeader />
      <Content>
        content outlet:
        <Outlet />
      </Content>
    </div>
  );
}
