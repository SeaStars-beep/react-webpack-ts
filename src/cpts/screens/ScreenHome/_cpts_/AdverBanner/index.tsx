import React, { memo } from 'react';
import useViewModel from './view.model';
import { API_STORE } from '@src/entites/index';
import './index.less';

export interface Props {
  data?: API_STORE.ResConfig;
}
const Index: React.FC<Props> = (props) => {
  const { handleClick, list } = useViewModel(props);

  return (
    <div className="screen-adver-wrap">
      {list?.map((o) => (
        <img
          key={JSON.stringify(o)}
          src={o?.pic}
          onClick={() => handleClick(o)}
          className="screen-adver-item"
        />
      ))}
    </div>
  );
};
export default memo(Index);
