import React, { createRef } from 'react';
import { Button, Row, Spin, message } from 'antd';
import copy from 'copy-to-clipboard';
import { bind } from 'antd-doddle/decorator';
import { FormGroup } from 'antd-doddle';
import { editFields } from './fields';
import { oss } from './model';

const { FormRender } = FormGroup;

function getRadomName() {
  const randomCode = Math.floor(Math.random() * 26) + 65;
  return `${Date.now()}-${String.fromCharCode(randomCode)}`;
}

const reg = /[\s\S]*(?=(\.[a-z-A-Z]+))/;

const clipStyle = {
  margin: '0 0 20px 50px',
  padding: '0 10px',
  width: 313,
  height: '50px',
  color: 'rgba(0, 0, 0, 0.35)',
  border: '1px solid #d9d9d9',
  borderRadius: '3px',
  lineHeight: '50px',
};


export default class Edit extends React.PureComponent {
  constructor(props) {
    super(props);
    this.clipRef = createRef();
    this.form = createRef();
    this.state = {
      spinning: false,
    };
  }

  async handleUpload(file, type) {
    this.setState({ spinning: true });
    const { isUpdate, onSearch } = this.props;
    const keyId = getRadomName();
    const res = {
      key: isUpdate ? type : `${type}/${file.name.replace(reg, keyId)}`,
      file,
    };
    const result = await oss.upload(res);
    this.setState({ spinning: false });
    if (!result) {
      message.error('上传失败');
      return;
    }
    // e.clipboardData.setData('text', `![image](${result.url})`);
    // eslint-disable-next-line no-undef
    try {
      copy(`![${keyId}](${result.url})`);
      message.success('复制到粘贴板成功');
    } catch (error) {
      message.success('复制到粘贴板失败');
    }

    onSearch({ type: type.split('/')[0] });
  }

  @bind
  handleAction() {
    this.form.validateFields()
      .then(({ file, type }) => {
        const target = file[0];
        this.handlUpload(target, type);
      });
  }

  @bind
  handlePaste(e) {
    const { data: { type } } = this.props;
    if (e.clipboardData || e.originalEvent) {
      const { items } = e.clipboardData || e.originalEvent.clipboardData || window.clipboardData;
      let file;
      if (items) {
        e.preventDefault();
        // eslint-disable-next-line no-plusplus
        for (let i = 0; i < items.length; i++) {
          if (items[i].type.indexOf('image') !== -1) {
            // getAsFile() 此方法只是living standard firefox ie11 并不支持
            file = items[i].getAsFile();
            break;
          }
        }
      } else {
        this.clipRef.current.innerHTML = '<span class="error">请选择图片文件 !</span>';
        return;
      }

      if (!file) {
        this.clipRef.current.innerHTML = '<span class="error">请选择图片文件 !</span>';
        return;
      }

      this.handleUpload(file, type);
      return;
    }
    this.clipRef.current.innerHTML = '请复制图片';
  }

  render() {
    const { onReset, data, isUpdate } = this.props;
    const { spinning } = this.state;
    return (
      <div className="search-form">
        <Spin spinning={spinning} tip="文件上传中">
          <FormGroup ref={this.form} {...{ withWrap: true, required: true }}>
            <Row>
              {editFields.map(field => <FormRender key={field.key} {...{ field, data, wrapProps: { span: 8 } }} />)}
              <Button type="primary" className="mt-5" onClick={this.handleAction}>{isUpdate ? '修改' : '添加' }</Button>
              <Button className="ml-20" onClick={onReset}>重置</Button>
            </Row>
            <div
              onPaste={this.handlePaste}
              style={clipStyle}
              ref={this.clipRef}
            >
                请粘贴图片
            </div>
          </FormGroup>
        </Spin>
      </div>);
  }
}
