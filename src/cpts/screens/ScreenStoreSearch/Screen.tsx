import React from 'react';
import { observer } from 'mobx-react';
import useViewModel from './view.model';
export { API_STORE } from '@src/entites/index';
import Scroll from '@src/common-cpts/Scroll';
import './index.less';

const ScreenStoreSearch = () => {
  const { inputRef, handleClick, handleSearch, handleScroll, childRef } =
    useViewModel();

  return (
    <div className="screen-store-search">
      <div className={'search-header'}>
        <div className="search-header-ico"></div>
        <input
          ref={inputRef}
          className={'search-header-input'}
          onKeyDown={handleSearch}
          type="text"
          placeholder="请输入门店名称关键词查询"
        />
        <div className={'search-header-btn'} onClick={handleClick}>
          搜索
        </div>
      </div>
      <div className={'search-list-wrap'} onScroll={handleScroll}>
        <Scroll ref={childRef} />
      </div>
    </div>
  );
};

export default observer(ScreenStoreSearch);
