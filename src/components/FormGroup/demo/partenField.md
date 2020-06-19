---
title: 父级传入fields
order: 1
---

```jsx
import React, { useCallback, useEffect, useState } from 'react';
import moment from 'moment';
import { Form, Row, Col, Button, Switch, Input } from 'antd';
import FormGroup from "../index";

const FormItem = Form.Item;
const { FormRender } = FormGroup;

const fieldLayout = {
  labelCol: { span: 3 },
  wrapperCol: { span: 21 }
};

const smallFieldLayout = {
  labelCol: { span: 3 },
  wrapperCol: { span: 8 }
};

function Edit(props) {
  const { detail: data = { userName: 'doddle', mail: 'closertb@163.com', enable: true }, form: { getFieldDecorator } } = props;
  // 组件声明，绑定getFieldDecorator
  const formProps = {
    layout: 'horizontal',
    getFieldDecorator,
    required: true,
    withWrap: true,
    fields: editFields,
    datas: {
      userName: '张三'
    }
  };
  return (
    <div>
      <Row>
        <FormGroup {...formProps}>
          <Row>
            <FormRender key='userName' itemKey='userName' formItemLayout={smallFieldLayout} />
            <FormRender key='mail' itemKey='mail' data={{ mail: '163' }} formItemLayout={fieldLayout}  />
            <FormRender key='userId' itemKey='userId' inputProps={{ disabled: true }} />
          </Row>
        </FormGroup>
      </Row>
    </div>
  );
}

const editFields = [{
  key: 'userName',
  name: '真实姓名',
}, {
  key: 'mail',
  name: '邮箱',
}, {
  key: 'userId',
  name: '用户ID',
}];

const Basic = Form.create()(Edit)
ReactDOM.render(<Basic />, mountNode);
```
