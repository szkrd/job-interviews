import React from 'react';
import TopRated from './TopRated';
import DiscoverMovies from './DiscoverMovies';

export default function OverviewPage() {
  return (
    <div className="overview-page-component">
      <h1>Film DB App</h1>
      <TopRated/>
      <DiscoverMovies/>
    </div>
  );
}

