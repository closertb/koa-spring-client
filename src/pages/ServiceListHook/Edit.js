import React from 'react';
import { HModal } from 'antd-doddle';
import FormGroup from '../../components/FormGroup';
import { editFields } from './fields';
import { useRequest } from './services';

const { FormRender } = FormGroup;

function Edit({ id, form, visible, confirmLoading, ...others }) {
  const { data = {}, loading } = useRequest('/rule/detail', { id }, { skip: !id, trigger: visible });
  console.log('id', id, loading, data);

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
      <FormGroup required>
        {editFields.map(field => <FormRender key={field.key} field={field} data={data} />)}
      </FormGroup>
    </HModal>
  );
}

export default Edit;
