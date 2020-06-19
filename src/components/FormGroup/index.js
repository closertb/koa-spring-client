import React, { Children, cloneElement, useMemo, forwardRef, useEffect } from 'react';
import { Form } from 'antd';
import FormRender from './FormRender';
import { WrapperDefault, extendSymbol } from './default';

// 表单通用格式
export const layout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 8 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 15 },
  },
};

const { useForm } = Form;
// 遍历 react children, 识别FormRender
function deepMap(children, extendProps, mapFields) {
  return Children
    .map(children, (child) => {
      if (child === null || typeof child !== 'object') { return child; }
      const isDefine = typeof child.type === 'function';
      // 仅对FormRender 组件做属性扩展
      if (isDefine && child.type.$type === extendSymbol) {
        const { itemKey } = child.props;
        const field = itemKey && mapFields[itemKey];
        const data = child.props.data || extendProps.datas;
        return cloneElement(child, { extendProps, data, field: child.props.field || field });
      }
      if (child && child.props && child.props.children && typeof child.props.children === 'object') {
        // Clone the child that has children and map them too
        return cloneElement(child, {
          children: deepMap(child.props.children, extendProps, mapFields),
        });
      }
      return child;
    });
}

function FormGroup(constProps, ref) {
  const [form] = useForm();
  const { formItemLayout = layout, containerName, required, fields = [],
    Wrapper = WrapperDefault, withWrap = false, dynamicParams, children, datas, ...others } = constProps;

  const mapFields = useMemo(() => fields.reduce((a, b) => {
    a[b.key] = b;
    return a;
  }, {}), [fields]);

  const formProps = {
    ...formItemLayout,
    ...others
  };

  const extendProps = {
    containerName,
    dynamicParams,
    required,
    Wrapper,
    withWrap,
  };

  useEffect(() => {
    // 如果data 值变化，重置表单的值
    console.log('form', ref);
    ref && ref.current.setFieldsValue(datas);
  }, [datas]);
  return (
    <Form {...formProps} ref={ref}>
      {deepMap(children, extendProps, mapFields)}
    </Form>);
}


const ForwardForm = forwardRef(FormGroup);

ForwardForm.FormRender = FormRender;

ForwardForm.useForm = useForm;
export default ForwardForm;
