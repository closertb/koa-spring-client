import React from 'react';
import { Button } from 'antd';
import { connect } from 'dva';
import { bind } from 'antd-doddle/decorator';
import SearchPage from '../../components/SearchPage';
import { fields, searchFields } from './fields';
import Edit from './Edit';

@connect(({ rule }) => ({ ...rule }), dispatch => ({
  onSearch(payload) {
    dispatch({ type: 'rule/getList', payload });
  },
  onSave(payload) {
    dispatch({ type: 'rule/save', payload });
  },
  onUpdate(payload) {
    dispatch({ type: 'rule/update', payload });
  },
  onGetDetail(payload) {
    return dispatch({ type: 'rule/getDetail', payload });
  }
}))
export default class Root extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      detail: {}
    };
  }

  @bind
  onOk(data) {
    const { detail } = this.state;
    const { onSave, onUpdate } = this.props;
    return detail.id ? onUpdate({ id: detail.id, ...data }) : onSave(data);
  }

  getExtraFields() {
    return [
      {
        key: 'operate',
        name: '操作',
        width: 120,
        fixed: 'right',
        render: (text, detail) => (
          <div>
            <a onClick={() => { this.handleEdit(detail); }}>修改</a>
            {/* <Popconfirm title="确认删除？" onConfirm={() => { this.handleSubmit(detail); }}>
              <a className="ml-10">更新</a>
            </Popconfirm> */}
          </div>)
      }
    ];
  }

  @bind
  handleEdit({ id } = {}) {
    if (id) {
      const { onGetDetail } = this.props;
      onGetDetail({ id }).then((detail) => {
        this.setState({
          detail,
          visible: Symbol('')
        });
      });
    } else {
      this.setState({
        detail: {},
        visible: Symbol('')
      });
    }
  }

  render() {
    const { loading, datas, total, onSearch } = this.props;
    const { visible, detail } = this.state;
    const tableProps = {
      datas,
      fields,
      total,
      loading: loading.getList,
      extraFields: this.getExtraFields()
    };

    const searchProps = {
      fields: searchFields,
    };

    const editProps = {
      onOk: this.onOk,
      visible,
      detail,
      id: detail.id,
      title: detail.id ? '修改' : '新增',
      confirmLoading: loading.save || loading.update,
    };

    const pageProps = {
      onSearch,
      searchProps,
      tableProps,
      ExtraBtns: (<Button type="primary" onClick={this.handleEdit}>添加</Button>)
    };

    return (
      <SearchPage {...pageProps}>
        {visible && <Edit {...editProps} />}
      </SearchPage>
    );
  }
}
