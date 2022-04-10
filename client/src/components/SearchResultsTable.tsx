import { Table, Tag } from 'antd';
import { BaseType } from 'antd/lib/typography/Base';
import Text from 'antd/lib/typography/Text';
import React, { CSSProperties } from 'react';
import { IMovieGenre, IMovieSearchResultItem } from '../api/getMovies';

const imageStyle: CSSProperties = {
  width: 45,
  height: 68,
  backgroundColor: '#eee',
  border: '1px solid #ddd',
  display: 'block',
};

const columns = [
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
}

export default function SearchResultsTable(props: ISearchResultsTableProps) {
  return (
    <Table columns={columns} dataSource={props.dataSource} rowKey="id" style={{ margin: 10 }} />
  );
}
