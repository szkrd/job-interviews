import { Button, Modal } from 'antd';
import Link from 'antd/lib/typography/Link';
import Text from 'antd/lib/typography/Text';
import React, { CSSProperties, useEffect, useRef, useState } from 'react';
import { getMovieById, IGetMovieByIdResponse } from '../api/getMovieById';
import { useLocationHash } from '../hooks/useLocationHash';
import { apiCall, ApiCallState } from '../utils/apiCall';
import { updateLocationHashParams } from '../utils/navigation';
import CenterSpin from './CenterSpin';

const NBSP = '\xa0';
const linkStyle: CSSProperties = { marginRight: 10 };
const innerContentStyle: CSSProperties = {
  backgroundColor: '#fffffff0',
  boxShadow: '0 0 30px 40px #fffffff0',
};
const getAntContentStyle = (backdrop?: string): CSSProperties => ({
  overflow: 'hidden',
  background: backdrop ? `url("${backdrop}") top left no-repeat` : 'none',
  backgroundSize: 'cover',
});

// ant modal typedefinition is broken in this version and even if
// the proper issue exists, I still can't read the kanji :(
const BrokenModal = Modal as any; // eslint-disable-line @typescript-eslint/no-explicit-any

function ExternalLink({ text, url }: { text: string; url?: string }) {
  return url ? (
    <Link href={url} target="_blank" style={linkStyle}>
      {text}
    </Link>
  ) : null;
}

export default function DetailsModal() {
  const [callState, setCallState] = useState(ApiCallState.Uninitialized);
  const [result, setResult] = useState<IGetMovieByIdResponse | null>(null);
  const [selectedId, setSelectedid] = useState('');
  const [antContentElement, setAntContentElement] = useState<HTMLDivElement | null>(null);
  const andInnerContentRef = useRef<HTMLDivElement | null>(null);

  useLocationHash('id', (id) => {
    setSelectedid(id ?? '');
    if (id && id !== selectedId)
      apiCall.fromComponent<IGetMovieByIdResponse>(getMovieById(id), setResult, setCallState);
  });

  // let's add a semitransparent poster cover to the ant content, just for fun
  useEffect(() => {
    const el = andInnerContentRef.current;
    if (el && el.parentNode) setAntContentElement(el.parentNode as HTMLDivElement);
  }, [andInnerContentRef.current, result]);
  useEffect(() => {
    if (antContentElement)
      Object.assign(antContentElement.style, getAntContentStyle(result?.backdrop));
  }, [antContentElement, result]);

  // reset the modal, since we're not really destroying it
  const handleCancel = () => {
    setResult(null);
    updateLocationHashParams('id', '');
    if (antContentElement) antContentElement.style.background = 'none';
  };

  const title = result?.title ?? NBSP;
  const wikipediaLink = (
    <ExternalLink url={result?.wikipediaUrl} text="Wikipedia" key="wikipediaLink" />
  );
  const imdbLink = <ExternalLink url={result?.imdbUrl} text="IMDB" key="imdbLink" />;
  const closeButton = (
    <Button onClick={handleCancel} type="primary" key="closeButton">
      Close
    </Button>
  );

  return (
    <BrokenModal
      title={title}
      visible={!!selectedId}
      cancelButtonProps={{ style: { display: 'none' } }}
      onCancel={handleCancel}
      onOk={handleCancel}
      footer={[wikipediaLink, imdbLink, closeButton]}
    >
      {callState === ApiCallState.Pending && <CenterSpin />}
      {callState === ApiCallState.Rejected && (
        <Text type="danger">
          Could not download movie details,
          <br />
          please try again later.
        </Text>
      )}
      {callState === ApiCallState.Fulfilled && (
        <div ref={andInnerContentRef} style={innerContentStyle}>
          <Text>{result?.overview}</Text>
          <br />
          <Text type="secondary">({result?.overviewSource})</Text>
        </div>
      )}
    </BrokenModal>
  );
}
