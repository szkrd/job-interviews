import { Button, Form, Input, PageHeader } from 'antd';
import { random } from 'lodash';
import React, { MutableRefObject, useCallback, useState } from 'react';

const movieTitleExamples = [
  'Star Wars',
  'The Godfather',
  'Pulp Fiction',
  'Back to the Future',
  'Blade Runner',
];

export interface ISearchHeaderProps {
  value?: string;
  onSubmit?: (value: string) => void;
  setValue?: MutableRefObject<(val: string) => void>;
}

const isEmpty = (text: string) => text.trim().length === 0;

function SearchForm(props: ISearchHeaderProps) {
  const [searchValue, setSearchValue] = useState(props.value ?? '');
  if (props.setValue)
    props.setValue.current = (val) => {
      console.log('inner event');
      setSearchValue(val);
    };

  const handleSubmit = useCallback(() => {
    if (!isEmpty(searchValue) && props.onSubmit) props.onSubmit(searchValue);
  }, [searchValue]);

  const randomMovieName = movieTitleExamples[random(movieTitleExamples.length - 1)];
  return (
    <Form layout="inline">
      <Form.Item label="Movie title">
        {/* ant does have an Input.Search, but the button part can not be disabled individually */}
        <Input
          placeholder={randomMovieName}
          value={searchValue}
          onChange={(el) => setSearchValue(el.target.value)}
          onPressEnter={handleSubmit}
        />
      </Form.Item>
      <Form.Item>
        <Button type="primary" onClick={handleSubmit} disabled={isEmpty(searchValue)}>
          Search
        </Button>
      </Form.Item>
    </Form>
  );
}

export default function SearchHeader(props: ISearchHeaderProps) {
  return (
    <PageHeader
      title="Movies"
      subTitle="search for movies using tmdb and wikipedia"
      style={{ backgroundColor: '#eee' }}
      extra={<SearchForm {...props} />}
    />
  );
}
