import { Button, Table, Tag } from 'antd';
import { ColumnsType } from 'antd/lib/table';
import { BaseType } from 'antd/lib/typography/Base';
import Text from 'antd/lib/typography/Text';
import React, { CSSProperties } from 'react';
import { IMovieGenre, IMovieSearchResultItem } from '../api/apiModels';

const imageStyle: CSSProperties = {
  width: 45,
  height: 68,
  backgroundColor: '#eee',
  border: '1px solid #ddd',
  display: 'block',
};

const getColumns = (
  onItemClick: ((id: number) => void) | undefined
): ColumnsType<IMovieSearchResultItem> => [
  {
    title: 'Poster',
    dataIndex: 'poster',
    key: 'poster',
    render: (url: string) =>
      url ? <img src={url} style={imageStyle} /> : <span style={imageStyle} />,
  },
  {
    title: 'Title',
    dataIndex: 'title',
    key: 'title',
    render: (title: string, item: IMovieSearchResultItem) => {
      return onItemClick ? (
        <Button type="link" onClick={() => onItemClick(item.id)}>
          {title}
        </Button>
      ) : (
        <Text>{title}</Text>
      );
    },
  },
  {
    title: 'Score',
    dataIndex: 'score',
    key: 'score',
    render: (score: number) => {
      let color: BaseType | undefined = undefined;
      if (score > 80) color = 'success';
      if (score < 20) color = 'danger';
      return <Text type={color}>{score}</Text>;
    },
  },
  {
    title: 'Release date',
    dataIndex: 'releaseDate',
    key: 'releaseDate',
  },
  {
    title: 'Genres',
    key: 'genres',
    dataIndex: 'genres',
    render: (genres: IMovieGenre[]) => (
      <>
        {genres.map((genre) => (
          <Tag key={genre.id}>{genre.name}</Tag>
        ))}
      </>
    ),
  },
];

interface ISearchResultsTableProps {
  dataSource: IMovieSearchResultItem[];
  onItemClick?: (id: number) => void;
}

export default function SearchResultsTable(props: ISearchResultsTableProps) {
  const columns = getColumns(props.onItemClick);
  return (
    <Table columns={columns} dataSource={props.dataSource} rowKey="id" style={{ margin: 10 }} />
  );
}
