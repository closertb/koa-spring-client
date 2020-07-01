import React from 'react';
import { HModal, FormGroup } from 'antd-doddle';
import { editFields } from './fields';
import { useRequest } from './services';

const { FormRender } = FormGroup;

function Edit({ id, visible, confirmLoading, ...others }) {
  const { data = {} } = useRequest('/rule/detail', { id }, { skip: !id, trigger: visible });
  const [form] = FormGroup.useForm();

  const modalProps = {
    visible,
    form,
    bodyStyle: {
      padding: '10px 80px 0 0'
    },
    confirmLoading,
    ...others,
  };
  return (
    <HModal {...modalProps}>
      <FormGroup required form={form} datas={data}>
        {editFields.map(field => <FormRender key={field.key} field={field} />)}
      </FormGroup>
    </HModal>
  );
}

export default Edit;
