import React, { useRef } from 'react';
import SearchHeader from './components/SearchHeader';
import 'modern-normalize/modern-normalize.css'; // god bless sindre
import 'antd/dist/antd.css'; // ant still uses css/less (instead of a jss solution)
import { updateLocationHashParams } from './utils/navigation';
import { useLocationHash } from './hooks/useLocationHash';
import { noop } from 'lodash';

export default function App() {
  // the plain value itself is not enough, we need a callback function, since
  // hashchange will not reload the page; this would cause the param pickup
  // to work only on reload or first page load, but not on a hash only transition
  const setValueRef = useRef(noop);
  useLocationHash('query', (val) => {
    // TODO: dispatch thunk with val
    setValueRef.current(val);
  });
  return (
    <div>
      <SearchHeader
        setValue={setValueRef}
        onSubmit={(val) => updateLocationHashParams('query', val)}
      />
    </div>
  );
}
