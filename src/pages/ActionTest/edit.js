import React, { useCallback } from 'react';
import { FormGroup } from 'antd-doddle';
import { Button } from 'antd';

const { FormRender } = FormGroup;

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


function Edit(props) {
  const { handle } = props;
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
