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
    <div className="service-recommend-wrap">
      <div className="service-recommend-tit">热门精选</div>
      <div className="service-recommend-con">
        {list?.map((o) => (
          <img
            key={JSON.stringify(o)}
            src={o?.pic}
            className="service-recommend-item"
            onClick={() => handleClick(o)}
          />
        ))}
      </div>
    </div>
  );
};
export default memo(Index);
