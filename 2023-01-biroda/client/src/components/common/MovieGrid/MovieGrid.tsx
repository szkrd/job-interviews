import React, { FC } from 'react';
import { IMovieSearchResultItem } from '../../../api/apiModels';
import styles from './MovieGrid.module.scss';

interface IMovieGrid {
  dataSource: IMovieSearchResultItem[];
}

const MovieGrid: FC<IMovieGrid> = (props) => {
  return (
    <ul className={styles.movieGrid}>
      {props.dataSource.map((movie) => (
        <li key={movie.id}>
          <p className={styles.poster}>
            <img src={movie.posterHigh} />
          </p>
          <div className={styles.details}>
            <h2 className={styles.title}>{movie.title}</h2>
            <aside className={styles.metaData}>{movie.releaseDate}</aside>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default MovieGrid;
