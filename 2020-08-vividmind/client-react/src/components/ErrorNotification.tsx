import React, {useState} from 'react';
import useObservable from '../hooks/useObservable';
import {call} from '../utils/ajax';
import {createUseStyles} from 'react-jss';

const useStyles = createUseStyles({
  component: {
    listStyle: 'none',
    position: 'fixed',
    bottom: 0,
    right: 10
  },
  item: {
    margin: '-10px 0 0 0',
    padding: 10,
    border: '1px solid black',
    borderRadius: 5,
    boxShadow: '0 0 5px rgba(0, 0, 0, .25)',
    backgroundColor: 'white',
    width: 220,
    fontSize: 13,
    textTransform: 'capitalize',
    color: 'red',
    position: 'relative'
  },
  link: {
    position: 'absolute',
    top: 0,
    right: 0,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: 12,
    height: 12,
    fontSize: 10,
    border: 0,
    textDecoration: 'none',
    padding: 3,
    backgroundColor: 'silver',
    borderRadius: '0 5px 0 5',
    '&:hover': {
      background: 'red',
      color: 'white'
    }
  }
});

// WIP
export default function ErrorNotification() {
  const classes = useStyles();
  const [errors, setErrors] = useState<any[]>([]);
  useObservable(call.error$, error => setErrors(errors.concat(error)));
  const onRemoveClick = (error: any) => {
    setErrors(errors.filter(current => current !== error))
  }
  return (
    <ul className={classes.component}>
      {errors.map(error => (
        <li key={error.id} className={classes.item}>
          <a href="#close" className={classes.link} onClick={() => onRemoveClick(error)}>
            X
          </a>
          {error.message}
        </li>))}
    </ul>
  );
}
