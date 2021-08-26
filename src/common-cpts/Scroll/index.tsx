import React, { forwardRef } from 'react';
import { observer } from 'mobx-react';
import useViewModel from './view.model';
export { API_STORE } from '@src/entites/index';
import ProdcutStoreItem from '@src/common-cpts/ProdcutStoreItem';
import './index.less';

const Scroll = (props: any, ref: any) => {
  const { storeStyle } = props;
  const { storeList, storeTotal, handleSureBill, handleDetail } = useViewModel(
    props,
    ref
  );

  return (
    <div className={'store-list-wrap'}>
      {storeList?.map((o) => (
        <div
          key={o?.cardStoreInfoVo?.id}
          className={'store-list-item'}
          style={storeStyle}
        >
          <ProdcutStoreItem
            data={o}
            detailCallback={handleDetail}
            sureCallback={handleSureBill}
          />
        </div>
      ))}
      {storeList.length === 0 && (
        <div className="store-list-note">暂无数据~</div>
      )}
      {storeTotal === storeList?.length && storeList.length > 0 && (
        <div className="store-list-note">没有更多了~</div>
      )}
    </div>
  );
};

export default observer(forwardRef(Scroll));
