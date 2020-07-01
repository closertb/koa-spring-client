import React from 'react';
// import { Popconfirm } from 'antd';
import { connect } from 'dva';
import { Modal } from 'antd';
import { EnhanceTable, WithSearch } from 'antd-doddle';
import { bind } from 'antd-doddle/decorator';
import { fields, searchFields } from './fields';
import Edit from './Edit';

const initState = { isUpdate: false, data: { type: 'notes' }, previewVisible: false };

@connect(({ file }) => ({ ...file }), dispatch => ({
  onSearch(payload) {
    dispatch({ type: 'file/updateSearch', payload });
    dispatch({ type: 'file/getList' });
  },
  onUpload(payload) {
    dispatch({ type: 'file/upload', payload });
  }
}))
export default class Root extends React.PureComponent {
  state = initState

  getExtraFields() {
    // const { actions: { onDelete } } = this.props;
    return [
      {
        key: 'operate',
        name: '操作',
        width: 120,
        fixed: 'right',
        render: (text, { url, name }) => (
          <div>
            <a className="mr-10" onClick={() => this.handleUpdate(name)}>替换</a>
            <a onClick={() => this.handlePreview(url)}>查看</a>
          </div>)
      }
    ];
  }

  @bind
  handleReset() {
    this.setState({ ...initState });
  }

  @bind
  handleUpdate(key) {
    this.setState({ isUpdate: true, data: { type: key } });
  }

  @bind
  handlePreview(file) {
    this.setState({
      imageUrl: file,
      previewVisible: true,
    });
  }

  render() {
    const { loading: { getList }, datas, total, search, onSearch, onUpload } = this.props;
    const { isUpdate, data, previewVisible, imageUrl } = this.state;
    const tableProps = {
      search,
      datas,
      fields,
      rowKey: 'etag',
      loading: getList,
      pageName: 'pn',
      onSearch,
      extraFields: this.getExtraFields(),
      total
    };
    const editProps = {
      isUpdate,
      data,
      onSearch,
      onReset: this.handleReset,
      onUpload,
    };
    const searchProps = {
      fields: searchFields,
      search,
      timeFormat: true,
      onSearch,
    };
    return (
      <div>
        <Edit {...editProps} />
        <WithSearch {...searchProps} />
        <div className="pageContent">
          <EnhanceTable {...tableProps} />
        </div>
        <Modal
          visible={previewVisible}
          footer={null}
          onCancel={() => this.setState({ previewVisible: false })}
        >
          <img alt="example" style={{ width: '100%' }} src={imageUrl} />
        </Modal>
      </div>
    );
  }
}
