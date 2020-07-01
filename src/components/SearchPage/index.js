import React, { useCallback, useRef, useState, useEffect } from 'react';
import { WithSearch, EnhanceTable } from 'antd-doddle';

export default function SearchPage(props) {
  const { pn = 'pn', ps = 'ps', searchProps, tableProps = {},
    ExtraBtn = false, onSearch, children, setQuery } = props;

  const { initSearch = {} } = searchProps;
  const _initSearch = useRef({ [pn]: 1, [ps]: 5, ...initSearch });
  const [_search, setSearch] = useState({ ..._initSearch.current });

  const _onSearch = useCallback((value) => {
    // _search.current = Object.assign(_search.current, value);
    const _temp = { ..._search, ...value };
    setSearch(_temp);
    onSearch(_temp);
    setQuery && setQuery(_temp);
  });

  const _onReset = useCallback(() => {
    const _temp = { ..._initSearch.current };
    setSearch(_temp);
    onSearch(_temp);
    setQuery && setQuery(_temp);
  });

  useEffect(() => {
    onSearch(_search);
    setQuery && setQuery(_search);
    return () => {
      console.log('unmount');
      // _search.current = _initSearch.current;
    };
  }, []);

  const _searchProps = {
    search: _search,
    onReset: _onReset,
    onSearch: _onSearch,
    ...searchProps,
  };
  const _tableProps = {
    onSearch: _onSearch,
    search: _search,
    ...tableProps
  };

  return (
    <div>
      <WithSearch {..._searchProps} />
      {ExtraBtn}
      <div className="pageContent">
        <EnhanceTable {..._tableProps} />
      </div>
      {children}
    </div>
  );
}
