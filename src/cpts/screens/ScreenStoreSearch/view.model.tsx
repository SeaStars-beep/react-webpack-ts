import { useState, useRef } from 'react';
import { Modal, Toast } from 'antd-mobile';
import { API_STORE } from '@src/entites/index';

const useViewModel = () => {
  const childRef = useRef<any>();
  const inputRef = useRef<any>();
  /**
   *
   * @param e  搜索-键盘确定事件
   */
  const handleSearch = async (e: any) => {
    if (e?.key === 'Enter') {
      // 键盘确定事件
      const val = e?.target?.value;
      childRef.current.common({ storeName: val });
    }
  };
  /**
   *  按钮点击事件
   */
  const handleClick = async () => {
    const val = inputRef?.current?.value;
    childRef.current.common({ storeName: val });
  };
  /**
   *
   * @param e  列表滚动
   */
  const handleScroll = (e: any) => childRef.current.scroll(e); //lodash.debounce(handleScroll,300);
  return {
    inputRef,
    handleClick,
    handleSearch,
    handleScroll,
    childRef,
  };
};

export default useViewModel;
