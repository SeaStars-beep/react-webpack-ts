import React from 'react';
import { API_STORE } from '@src/entites/index';

import './index.less';

interface Props {
  data?: API_STORE.StoreDTO;
  callback?: (data: API_STORE.StoreDTO) => void;
}

const StoreItem: React.FC<Props> = (props) => {
  const { data, callback } = props;

  const handleClick = () => {
    if (callback) {
      return callback(data as API_STORE.StoreDTO);
    }
  };

  return (
    <div className={'store-item-wrap'} onClick={handleClick}>
      <div className={'store-wrap-left'}>
        <img
          className={'store-wrap-img'}
          src={data?.storePicture}
          alt={data?.storeName}
        />
        {data?.channel === API_STORE.CHANNEL.main && (
          <div className="store-item-qulity">品质优选</div>
        )}
        {data?.status === API_STORE.ONLINE.stop && (
          <div className="store-item-offline">打烊中</div>
        )}
        {/* <div></div> */}
      </div>
      <div className={'store-wrap-right'}>
        <div className={'store-item-name'}>{data?.storeName}</div>

        <div className={'store-item-site'}>{data?.address}</div>
        <div
          className={'store-item-time'}
        >{`营业时间：${data?.openStart}-${data?.endStart}`}</div>
        {data?.distance && (
          <div className={'store-item-distance'}>
            {(Math.round(data?.distance ?? 0) / 1000).toFixed(2)}km
          </div>
        )}
        <div className={'store-item-star'}>
          {data?.categoryNameList?.map((o) => (
            <span key={o} className="star-item">
              {o}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};
export default StoreItem;
