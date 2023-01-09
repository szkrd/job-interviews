import React, { FC } from 'react';
import { IMovieSearchResultItem } from '../../../api/apiModels';

interface IMovieGrid {
  dataSource: IMovieSearchResultItem[];
}

const MovieGrid: FC<IMovieGrid> = (props) => {
  return (
    <ul>
      {props.dataSource.map((movie) => (
        <li key={movie.id}>{movie.title}</li>
      ))}
    </ul>
  );
};

export default MovieGrid;
