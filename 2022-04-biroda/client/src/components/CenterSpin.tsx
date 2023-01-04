import { Space, Spin } from 'antd';
import React from 'react';
import { style as st, styles } from '../utils/css';

export default function CenterSpin() {
  const wrapperStyle = styles(st.placeContentCenter, st.m0p0, st.hFull, st.wFull);
  return (
    <Space align="center" size="large" style={wrapperStyle}>
      <Spin size="large" />
    </Space>
  );
}
