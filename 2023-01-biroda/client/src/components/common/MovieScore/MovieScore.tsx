import classNames from 'classnames';
import React, { FC } from 'react';
import { Star } from 'react-feather';
import styles from './MovieScore.module.scss';

interface IMovieScore {
  score: number;
}

const MovieScore: FC<IMovieScore> = ({ score }) => {
  const scoreInt = Math.floor(score / 10);
  return (
    <div className={styles.movieScore}>
      <Star className={classNames(styles.star, styles[`star${scoreInt}`])} />
      {/* using clip path would be somewhat more complicated */}
      <Star className={styles.shadow} />
      <span className={styles.value}>{score}%</span>
    </div>
  );
};

export default MovieScore;
