<script setup>
const props = defineProps({
  dataSource: Array,
  onItemClick: Function,
});

const imageStyle = {
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
    // render: (url) =>
    //   url ? <img src={url} style={imageStyle} /> : <span style={imageStyle} />,
  },
];
</script>
<template>
  <a-table :columns="columns" :dataSource="dataSource" rowKey="id" class="m-1" />
</template>
