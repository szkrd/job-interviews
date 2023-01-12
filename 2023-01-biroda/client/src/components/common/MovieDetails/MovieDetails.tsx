import React, { FC, useEffect, useState } from 'react';
import { getMovieById, IGetMovieByIdResponse } from '../../../api/getMovieById';
import { apiCall, ApiCallState } from '../../../utils/apiCall';
import Modal from '../Modal/Modal';
import Spinner from '../Spinner/Spinner';
import styles from './MovieDetails.module.scss';

interface IMovieDetails {
  id: number;
  onClose: () => void;
}

const MovieDetails: FC<IMovieDetails> = ({ id, onClose }) => {
  const [callState, setCallState] = useState(ApiCallState.Uninitialized);
  const [result, setResult] = useState<IGetMovieByIdResponse | null>(null);
  useEffect(() => {
    if (id > -1) {
      apiCall.fromComponent<IGetMovieByIdResponse>(getMovieById(id), setResult, setCallState);
    } else {
      setResult(null);
    }
  }, [id]);
  if (id === -1) return null;
  return (
    <Modal title="movie title" onClose={onClose}>
      {callState === ApiCallState.Pending && (
        <div className={styles.centeredContent}>
          <Spinner />
        </div>
      )}
      {callState === ApiCallState.Rejected && (
        <div className={styles.centeredContent}>
          <p>
            Could not download movie details,
            <br />
            please try again later.
          </p>
        </div>
      )}
      {callState === ApiCallState.Fulfilled && (
        <p>
          {result?.overview}
          <br />({result?.overviewSource})
        </p>
      )}
    </Modal>
  );
};

export default MovieDetails;
