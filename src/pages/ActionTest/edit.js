import React, { useCallback, useRef } from 'react';
import { FormGroup } from 'antd-doddle';
import { Button, message } from 'antd';
import crypto from 'crypto';

const { FormRender } = FormGroup;

function calHash(obj) {
  return crypto.createHash('md5').update(JSON.stringify(obj)).digest('hex');
}

export const editFields = [{
  key: 'tag',
  name: 'Tag',
}, {
  key: 'name',
  name: '名称',
}, {
  key: 'file',
  name: '文件',
  type: 'staticFile',
  // draggerable: true,
  reg: /\.(js|css|jpg|png|zip|html)$/,
  tips: '文件类型为web资源类文件',
  listType: 'text',
}];

export const detailFields = [{
  key: 'choose',
  name: '条目',
  type: 'select',
  isDynamic: true,
}, {
  key: 'number',
  name: '编号',
  shouldUpdate: (pre, cur) => pre.choose !== cur.choose,
  isEnable: (init, { choose }) => choose === 'self'
}, {
  key: 'cursor',
  name: '光标',
  shouldUpdate: (pre, cur) => pre.choose !== cur.choose,
  isEnable: (init, { choose }) => choose === 'self'
}];

export const getFields = [{
  key: 'chose',
  name: '条目',
  type: 'select',
  isDynamic: true,
}, {
  key: 'type',
  name: '类型',
  type: 'select',
  enums: [{
    label: '文章列表',
    value: 'BlogAllList'
  }, {
    label: '分页列表',
    value: 'Blog'
  }, {
    label: '详情',
    value: 'BlogDetail'
  }],
  shouldUpdate: (pre, cur) => pre.chose !== cur.chose,
  isEnable: (init, { chose }) => chose === 'self'
}, {
  key: 'body',
  name: '请求体',
  type: 'text',
  required: false,
  seldomProps: { // 使用seldomProps扩展原生支持的属性
    autoSize: { minRows: 4, maxRows: 6 }
  },
  shouldUpdate: (pre, cur) => pre.chose !== cur.chose,
  isEnable: (init, { chose }) => chose === 'self'
}];


function Edit({ handle }) {
  const [form] = FormGroup.useForm();
  const handleSubmit = useCallback(() => {
    form.validateFields().then(({ file, ...values }) => {
      handle({
        file: file[0],
        ...values
      });
    });
  });

  return (
    <FormGroup form={form} datas={{ tag: 'tag', name: 'name' }} required>
      {editFields.map(field => <FormRender key={field.key} field={field} />)}
      <Button type="primary" onClick={handleSubmit}>提交</Button>
    </FormGroup>
  );
}


export default React.memo(Edit);


function EditDetail({ handle, loading, dynamicParams }) {
  const [form] = FormGroup.useForm();
  const handleSubmit = useCallback(() => {
    form.validateFields().then(({ choose, ...values }) => {
      if (choose === 'self') {
        handle(values);
        return;
      }
      const { cursor, number } = dynamicParams.choose[choose];
      handle({ cursor, number });
    });
  });

  const initRef = useRef({ choose: 'self' });
  const formProps = {
    form,
    required: true,
    datas: initRef.current,
    style: { marginTop: 20 },
    dynamicParams
  };

  return (
    <FormGroup {...formProps}>
      {detailFields.map(field => <FormRender key={field.key} field={field} />)}
      <Button loading={loading} type="primary" onClick={handleSubmit}>更新</Button>
    </FormGroup>
  );
}


export const UpdateDetail = React.memo(EditDetail);

function getKeyDetail({ handle, loading, dynamicParams }) {
  const [form] = FormGroup.useForm();
  const handleSubmit = useCallback(() => {
    form.validateFields().then(({ chose, type = 'BlogDetail', body = '{}' }) => {
      let params;
      if (chose === 'self') {
        if (type === 'BlogAllList') {
          handle({ key: 'BlogAllList-key' });
          return;
        }
        try {
          params = JSON.parse(body.replace("'", '"'));
        } catch (error) {
          message.error(error.message);
          return;
        }
        // 换单引号为双引号，换中文引号为英文双引号
      } else {
        const { cursor, number } = dynamicParams.chose[chose];
        params = { number, cursor };
      }
      // console.log('params:', params, `${type}-${calHash(params)}`);
      handle({ key: `${type}-${calHash(params)}` });
    });
  });

  const initRef = useRef({ chose: 'self', type: 'BlogAllList' });
  const formProps = {
    form,
    required: true,
    datas: initRef.current,
    // datas: { chose: 'self', type: 'BlogAllList' },
    style: { marginTop: 20 },
    dynamicParams
  };

  return (
    <FormGroup {...formProps}>
      {getFields.map(field => <FormRender key={field.key} field={field} />)}
      <Button loading={loading} type="primary" onClick={handleSubmit}>获取</Button>
    </FormGroup>
  );
}

export const GetKeyDetail = React.memo(getKeyDetail);
