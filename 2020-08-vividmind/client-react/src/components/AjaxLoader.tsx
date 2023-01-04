import React, {useState} from 'react';
import useObservable from '../hooks/useObservable';
import {call} from '../utils/ajax';
import {createUseStyles} from 'react-jss';

const COLOR = '#0af';
const useStyles = createUseStyles({
  '@keyframes dualRing': {
    from: { transform: 'rotate(0deg)' },
    to: { transform: 'rotate(360deg)' }
  },
  loader: {
    display: 'block',
    width: 64,
    height: 64,
    margin: 8,
    borderRadius: '50%',
    border: `6px solid ${COLOR}`,
    borderColor: `${COLOR} transparent ${COLOR} transparent`,
    animation: '$dualRing 1.2s linear infinite'
  },
  container: {
    position: 'fixed',
    top: 'calc(50% - 64px / 2)',
    left: 'calc(50% - 64px / 2)'
  }
});

export default function AjaxLoader() {
  const classes = useStyles();
  const [callCount, setCallCount] = useState<number>(0);
  useObservable(call.count$, setCallCount);
  if (!callCount) return null;
  return (
    <div className={classes.container}>
      <div className={classes.loader}/>
    </div>
  );
}
