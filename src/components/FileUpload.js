import React from 'react';
import { Upload, Modal, Button } from 'antd';
import { bind } from 'antd-doddle/decorator';
import { PlusOutlined, UploadOutlined, InboxOutlined } from '@ant-design/icons';

import style from './index.less';

const kb = 1024 * 1024;
const { Dragger } = Upload;

const uploadButton = (type = 'picture-card') => type === 'picture-card' ? (
  <div>
    <PlusOutlined />
    <div className="ant-upload-text">上传</div>
  </div>
) : (
  <Button>
    <UploadOutlined />
    选择文件
  </Button>
);

function showInfoModal(content) {
  Modal.info({
    title: '提示',
    content
  });
}

class UploadImg extends React.PureComponent {
  state = {
    previewVisible: false,
    previewImage: '',
    fileList: []
  };

  @bind
  beforeUpload(file) {
    const { reg = /(jpe?g|JPE?G|png|PNG|gif|GIF)$/, onChange, draggerable,
      tips = '请选择jpg,png类型的图片格式', fileSize: size = 5 } = this.props;
    const fileType = file.name;
    const fileSize = file.size;
    return new Promise((resolve, reject) => {
      console.log('test', file);
      if (!draggerable && !reg.test(fileType)) {
        showInfoModal(tips);
        reject();
        return;
      }
      if (fileSize > size * kb) {
        showInfoModal(`文件的大小不能超 ${size}M`);
        reject();
        return;
      }
      this.setState(({ fileList: [file] }));
      onChange && onChange([file]);
    });
  }

  @bind
  handleCancel() {
    this.setState({ previewVisible: false });
  }

  @bind
  handlePreview(file) {
    this.setState({
      previewImage: file.url || file.thumbUrl,
      previewVisible: true,
    });
  }

  @bind
  handleRemove() {
    const { onChange } = this.props;
    this.setState({ fileList: [] });
    onChange && onChange(undefined);
  }

  render() {
    const { previewVisible, previewImage, fileList = [] } = this.state;
    const { seldomProps = {}, maxCount = 1, disabled, listType = 'text', draggerable = false } = this.props;
    const uploadBtn = uploadButton(listType);
    const props = {
      fileList,
      onChange: this.handleChange,
      onRemove: this.handleRemove,
      beforeUpload: this.beforeUpload
    };
    return (
      <div className={style.FileUpload}>
        {!draggerable ?
          <Upload
            listType={listType}
            {...props}
            {...seldomProps}
          >
            {!disabled && fileList.length < maxCount && uploadBtn}
          </Upload> :
          <Dragger {...props} multiple>
            <p className="ant-upload-drag-icon">
              <InboxOutlined />
            </p>
            <p className="ant-upload-text">单击或拖拽上传</p>
          </Dragger>
        }
        <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
          <img alt="example" style={{ width: '100%' }} src={previewImage} />
        </Modal>
      </div>
    );
  }
}

export default UploadImg;


// 说明 props {onChange,disabled,value,config:{maxNum,uploadUrl}}
