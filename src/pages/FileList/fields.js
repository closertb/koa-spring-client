export const searchFields = [{
  key: 'type',
  name: '文件分类',
}, {
  key: 'time',
  name: '筛选时间',
  type: 'rangePicker',
  startKey: 'startTime',
  endKey: 'endTime',
}];

export const fields = [{
  key: 'type',
  name: '文件分类',
}, {
  key: 'url',
  name: '地址',
}, {
  key: 'size',
  name: '大小',
  render: val => val && `${(val / 1024).toFixed(2)}kb`
}, {
  key: 'lastModified',
  name: '更新时间',
  type: 'datetime'
}];

export const editFields = [{
  key: 'type',
  name: '文件分类',
  // eslint-disable-next-line no-bitwise
  disable: ({ type = '' }) => Boolean(~type.indexOf('/'))
}, {
  key: 'file',
  name: '文件',
  type: 'staticFile',
  // draggerable: true,
  reg: /\.(js|css|jpg|png|gif|html)$/,
  tips: '文件类型为web资源类文件',
  listType: 'text',
}];
