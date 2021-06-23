import React from 'react';
import { EnhanceTable, WithSearch } from 'antd-doddle';
import { usePagination, setPagination } from 'antd-doddle/hooks';
import { fields, searchFields } from './fields';
import { useRequest } from './services';

setPagination({ pn: 1, ps: 10 });

export default function InviteList() {
  const [search, onSearch, onReset] = usePagination({});

  const { data = {}, loading } =
  useRequest('/invite/query', search, { prompt: true });


  const { datas = [], total } = data;

  const tableProps = {
    search,
    datas,
    fields,
    onSearch,
    total,
    loading,
    rowKey: 'id',
    extraFields: []
  };

  const searchProps = {
    fields: searchFields,
    search,
    onReset,
    onSearch,
  };


  return (
    <div>
      <WithSearch {...searchProps} />
      <div className="pageContent">
        <EnhanceTable {...tableProps} />
      </div>
    </div>
  );
}
