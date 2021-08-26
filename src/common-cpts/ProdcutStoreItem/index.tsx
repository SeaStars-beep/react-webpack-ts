import React, { memo } from 'react';

import { API_STORE } from '@src/entites/index';
import StoreItem from '@src/common-cpts/StoreItem';
import './index.less';

interface Props {
  data?: API_STORE.ResStoreRecord;
  detailCallback?: (data: API_STORE.ProductItem) => void;
  sureCallback?: (
    data: API_STORE.ProductItem,
    store: API_STORE.StoreDTO
  ) => void;
}

const Index: React.FC<Props> = (props) => {
  const { data, detailCallback, sureCallback } = props;
  const handleDetailClick = (item: API_STORE.StoreDTO) => {
    if (detailCallback) {
      return detailCallback(item);
    }
  };
  const handleSureClick = (
    item: API_STORE.ProductItem,
    store: API_STORE.StoreDTO
  ) => {
    if (sureCallback) {
      return sureCallback(item, store);
    }
  };

  return (
    <div className={'product-store-item-wrap'}>
      <StoreItem
        data={data.cardStoreInfoVo}
        callback={() => handleDetailClick(data.cardStoreInfoVo)}
      />
      <div className={'product-store-list'}>
        {data?.products?.map((o: API_STORE.ProductItem) => (
          <div className={'product-store-list-item'} key={o?.id}>
            <div className="product-s-l-left">
              <div className={'product-name'}>{o?.name}</div>
              <div>
                <span className={'product-line-price'}>￥{o?.linePrice}</span>
                <span className={'product-sale'}>￥{o?.salePrice}</span>
              </div>
            </div>
            <div
              className={'product-btn'}
              onClick={() => handleSureClick(o, data?.cardStoreInfoVo)}
            >
              抢购
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default memo(Index);
