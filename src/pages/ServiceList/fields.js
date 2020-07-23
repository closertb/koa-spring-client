
const sceneEnums = {
  common: '普通',
  special: '特殊'
};

export const searchFields = [{
  key: 'scene_code',
  name: '场景',
  enums: sceneEnums,
  type: 'select'
}, {
  key: 'param_name',
  name: '名称',
}];

export const fields = [{
  key: 'scene_code',
  name: '场景',
}, {
  key: 'scene_name',
  name: '场景名称',
}, {
  key: 'param_code',
  name: 'Code',
}, {
  key: 'param_name',
  name: '名称',
}, {
  key: 'param_type',
  name: '类型'
}, {
  key: 'update_time',
  name: '更新时间',
  type: 'datetime'
}];

export const editFields = [{
  key: 'scene_code',
  name: '场景',
  enums: sceneEnums,
  type: 'select',
  disabled: detail => detail.scene_code === 'special'
}, {
  key: 'param_code',
  name: 'Code',
}, {
  key: 'param_name',
  name: '名称',
}, {
  key: 'param_type',
  name: '类型'
}];
