import { Button, Modal } from 'antd';
import Link from 'antd/lib/typography/Link';
import Text from 'antd/lib/typography/Text';
import React, { CSSProperties, useState } from 'react';
import { getMovieById, IGetMovieByIdResponse } from '../api/getMovieById';
import { useLocationHash } from '../hooks/useLocationHash';
import { apiCall, ApiCallState } from '../utils/apiCall';
import { updateLocationHashParams } from '../utils/navigation';
import CenterSpin from './CenterSpin';

const NBSP = '\xa0';
const linkStyle: CSSProperties = { marginRight: 10 };

// ant modal typedefinition is broken in this version and even if
// the proper issue exists, I still can't read the kanji :(
const BrokenModal = Modal as any; // eslint-disable-line @typescript-eslint/no-explicit-any

function ExternalLink({ text, url, key }: { text: string; url?: string; key: string }) {
  return url ? (
    <Link href={url} target="_blank" key={key} style={linkStyle}>
      {text}
    </Link>
  ) : null;
}

export default function DetailsModal() {
  const [callState, setCallState] = useState(ApiCallState.Uninitialized);
  const [result, setResult] = useState<IGetMovieByIdResponse | null>(null);
  const [selectedId, setSelectedid] = useState('');

  useLocationHash('id', (id) => {
    setSelectedid(id ?? '');
    if (id && id !== selectedId)
      apiCall.fromComponent<IGetMovieByIdResponse>(getMovieById(id), setResult, setCallState);
  });

  const handleCancel = () => {
    setResult(null);
    updateLocationHashParams('id', '');
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
        <>
          <Text>{result?.overview}</Text>
          <br />
          <Text type="secondary">({result?.overviewSource})</Text>
        </>
      )}
    </BrokenModal>
  );
}
