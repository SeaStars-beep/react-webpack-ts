import React, { memo } from 'react';
import { API_STORE } from '@src/entites/index';
import useViewModel from './view.model';
import './index.less';

export interface Props {
  callback?: (data: any) => Promise<void>;
  extraCallback?: () => void;
  data?: API_STORE.ResCategory[];
}

const Index: React.FC<Props> = (props) => {
  const { handleFeatureClick, handleExtraClick, data, active } =
    useViewModel(props);

  return (
    <div className="feature-search-com-wrap">
      <div className="feature-search-com">
        {data?.map((o) => (
          <div
            key={o?.id}
            onClick={() => handleFeatureClick(o)}
            className={`f-s-com-item ${active === o?.id ? 'active' : ''}`}
          >
            {o?.name}
          </div>
        ))}
      </div>
      <div className="feature-search-extra" onClick={handleExtraClick}>
        <div className="feature-search-ico"></div>
      </div>
    </div>
  );
};
export default memo(Index);
