import React, { memo } from 'react';
import { API_STORE } from '@src/entites/index';
import useViewModel from './view.model';
import './index.less';

export interface Props {
  data?: API_STORE.ResConfig;
}

const Index = (props: Props) => {
  const { handleClick, list } = useViewModel(props);
  return (
    <div className="micro-app-wrap">
      {list?.map((o) => (
        <div
          key={JSON.stringify(o)}
          className="micro-app-item"
          onClick={() => handleClick(o)}
        >
          <img className="micro-app-item-img" src={o?.pic} alt="" />
          <div className="micro-app-item-txt">{o?.name}</div>
        </div>
      ))}
    </div>
  );
};
export default memo(Index);
