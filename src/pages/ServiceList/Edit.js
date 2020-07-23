import React from 'react';
import { HModal, FormGroup } from 'antd-doddle';
import { editFields } from './fields';

const { FormRender } = FormGroup;

function Edit({ detail, visible, ...others }) {
  const [form] = FormGroup.useForm();
  const modalProps = {
    visible,
    form,
    bodyStyle: {
      padding: '10px 80px 0 0'
    },
    ...others
  };
  return (
    <HModal {...modalProps}>
      <FormGroup form={form} datas={detail} required>
        {editFields.map(field => <FormRender key={field.key} field={field} />)}
      </FormGroup>
    </HModal>
  );
}

export default Edit;
