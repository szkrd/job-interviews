import React, { FC, MouseEventHandler, useCallback, useState } from 'react';
import { IMovieSearchResultItem } from '../../../api/apiModels';
import DateFormat from '../DateFormat/DateFormat';
import Modal from '../Modal/Modal';
import MovieScore from '../MovieScore/MovieScore';
import styles from './MovieGrid.module.scss';

interface IMovieGrid {
  dataSource: IMovieSearchResultItem[];
  onMovieClick: (id: number) => void;
}

const MovieGrid: FC<IMovieGrid> = ({ dataSource, onMovieClick }) => {
  const [selectedId, setSelectedId] = useState(-1);
  const handleMovieClick: MouseEventHandler<HTMLButtonElement> = useCallback(
    (event) => {
      onMovieClick(parseInt(event.currentTarget.dataset.id ?? '-1', 10));
    },
    [onMovieClick]
  );
  const handleModalClose = useCallback(() => {
    setSelectedId(-1);
  }, []);
  return (
    <>
      <ul className={styles.movieGrid}>
        {dataSource.map((movie) => (
          <li key={movie.id}>
            <button className={styles.clickable} data-id={movie.id} onClick={handleMovieClick}>
              <p className={styles.poster}>
                <img src={movie.posterHigh} />
              </p>
              <div className={styles.details}>
                <MovieScore score={movie.score} />
                <h2 className={styles.title}>{movie.title}</h2>
                <aside className={styles.metaData}>
                  <DateFormat date={movie.releaseDate} />
                </aside>
              </div>
            </button>
          </li>
        ))}
      </ul>
      {/* <Modal title="lorem ipsum" onClose={handleModalClose} /> */}
    </>
  );
};

export default MovieGrid;
