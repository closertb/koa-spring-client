/* eslint-disable no-param-reassign */
import React from 'react';
// import OriginSearch from '../OriginSearch';
// import FileUpload from '../FileUpload';
import InputWithUnit from '../InputWithUnit';

export const isUndefind = (value, defaultValue) => typeof value === 'undefined' ? defaultValue : value;

// const OriginInput = ({ field, props, data }) => {
//   const { service, searchKey, placeholder, onSelect, allowClear, valueFormat, format,
//     maxSize, seldomProps, disable } = field;
//   return (<OriginSearch
//     disabled={disable && disable(data)}
//     style={{ width: '100%', height: 32 }}
//     searchKey={searchKey}
//     onSelect={props.onSelect || onSelect}
//     format={format}
//     placeholder={placeholder}
//     allowClear={allowClear}
//     maxSize={maxSize}
//     valueFormat={valueFormat}
//     fetchData={service}
//     {...seldomProps}
//   />);
// };

// const UploadFile = ({ field, props }) => {
//   const { key, name, seldomProps = {} } = field;
//   return (<FileUpload
//     info={field.info}
//     url={props.url}
//     name={name}
//     simple={field.psimple}
//     key={key}
//     listType={field.listType}
//     reg={field.reg}
//     fileSize={field.fileSize}
//     tips={field.tips}
//     upload={props.upload || field.upload}
//     maxSize={field.maxSize}
//     {...seldomProps}
//   />);
// };

const WithUnit = ({ field }) => {
  const { inputProps, selectProps, defaultUnit, enums, seldomProps } = field;
  return (<InputWithUnit
    enums={enums}
    selectProps={selectProps}
    inputProps={inputProps}
    defaultUnit={defaultUnit}
    {...seldomProps}
  />);
};

const selfDefine = ({ field, props, data }) => field.child({ field, props, data });
const renderType = {
  // origin: OriginInput,
  // image: UploadFile,
  // imageUpload: UploadFile,
  selfDefine,
  inputWithUnit: WithUnit
};

export const extendRenderTypes = (types = {}) => Object.assign(renderType, types);

export default renderType;

/*
 * 获取表单field数组
 * 示例:
 * const formFields = getFields(fields,['name','author'],{ name: { rules: []}}).values();
 * const formFields = getFields(fields).excludes(['id','desc']).values();
 * const formFields = getFields(fields).pick(['name','author','openTime']).enhance({name:{ rules: [] }}).values();
 * @param originField 原始fields
 * @param fieldKeys 需要包含的字段keys
 * @param extraFields 扩展的fields
 * @result 链式写法，返回链式对象(包含pick,excludes,enhance,values方法), 需要调用values返回最终的数据
 */
export const createFields = (originFields, fieldKeys, extraFields) => {
  const chain = {};
  let fields = [...originFields];

  const pick = (keys) => {
    keys = [].concat(keys);
    fields = keys.map((key) => {
      let field = fields.find(item => key === item.key);
      if (!field) {
        // 如果field不存在，则默认类型的field
        field = {
          key,
          name: key
        };
      }
      return field;
    });
    return chain;
  };

  const excludes = (keys) => {
    keys = [].concat(keys);
    fields = fields.filter(field => !keys.includes(field.key));
    return chain;
  };

  const enhance = (_extraFields) => {
    if (!Array.isArray(_extraFields)) {
      _extraFields = Object.keys(_extraFields).map(key => Object.assign(_extraFields[key], {
        key
      }));
    }
    _extraFields.forEach((extraField) => {
      const field = fields.find(item => item.key === extraField.key);
      if (field) {
        Object.assign(field, extraField);
      } else {
        fields.push(extraField);
      }
    });
    return chain;
  };

  const values = () => fields;

  const mixins = (keys) => {
    keys = [].concat(keys);
    fields = keys.map((key) => {
      let field;
      if (typeof key === 'string') {
        field = fields.find(item => key === item.key) || { key };
      } else {
        field = key;
      }
      return field;
    });
    return chain;
  };

  if (fieldKeys) {
    mixins(fieldKeys);
  }

  if (extraFields) {
    enhance(extraFields);
  }

  return Object.assign(chain, {
    pick,
    excludes,
    enhance,
    values
  });
};
