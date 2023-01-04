import { Button, Form, Input, PageHeader } from 'antd';
import React, { MutableRefObject, useCallback, useState } from 'react';
import { famousMovieTitles } from '../data/famousMovieTitles';
import { style } from '../utils/css';
import { goToRootPage } from '../utils/navigation';
import { random } from '../utils/number';

export interface ISearchHeaderProps {
  value?: string;
  hasBackButton?: boolean;
  onSubmit?: (value: string) => void;
  searchDisabled?: boolean;
  /** Callable function to set the value from outside */
  setValue?: MutableRefObject<(val: string) => void>;
}

const isEmpty = (text = '') => text.trim().length === 0;

function SearchForm(props: ISearchHeaderProps) {
  const [searchValue, setSearchValue] = useState(props.value ?? '');
  if (props.setValue)
    props.setValue.current = (val) => {
      setSearchValue(val);
    };

  const handleSubmit = useCallback(() => {
    if (!isEmpty(searchValue) && props.onSubmit) props.onSubmit(searchValue);
  }, [searchValue]);

  const randomMovieName = famousMovieTitles[random(famousMovieTitles.length - 1)];
  const isSubmitDisabled = isEmpty(searchValue) || props.searchDisabled;
  return (
    <Form layout="inline">
      <Form.Item label="Movie title">
        {/* ant does have an Input.Search, but the button part can not be disabled individually */}
        <Input
          placeholder={randomMovieName}
          disabled={props.searchDisabled}
          value={searchValue}
          onChange={(el) => setSearchValue(el.target.value)}
          onPressEnter={handleSubmit}
        />
      </Form.Item>
      <Form.Item>
        <Button type="primary" onClick={handleSubmit} disabled={isSubmitDisabled}>
          Search
        </Button>
      </Form.Item>
    </Form>
  );
}

export default function SearchHeader(props: ISearchHeaderProps) {
  const onBack = props.hasBackButton ? goToRootPage : undefined;
  return (
    <PageHeader
      title="Movies"
      onBack={onBack}
      subTitle="search for movies using tmdb and wikipedia"
      style={style.bgIndigo200}
      extra={<SearchForm {...props} />}
    />
  );
}
