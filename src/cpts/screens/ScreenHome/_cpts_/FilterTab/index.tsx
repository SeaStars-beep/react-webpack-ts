import React, { memo } from 'react';
import { Icon, Picker } from 'antd-mobile';
import { API_Common, API_STORE } from '@src/entites/index';
import useViewModel from './view.model';

import './index.less';

export interface Props {
  areaData?: API_Common.LabelValue[];
  carTypeData?: API_Common.LabelValue[];
  areaCallback?: (data: string) => void;
  statusCallback?: (data: string) => void;
  modelCallback?: (data: string) => void;
  quailtyCallback?: (data: any) => void;
}

const Index: React.FC<Props> = (props) => {
  const {
    handleAreaFilter,
    curArea,
    STORE_STATUS,
    storeStatus,
    handleStatusFilter,
    handleModelFilter,
    curModel,
    areaData,
    handleQualityFilter,
    hasQuality,
    carTypeData,
  } = useViewModel(props);

  return (
    <div className="filter-compnent-wrap">
      <Picker
        data={carTypeData}
        cols={1}
        value={[curModel?.value]}
        onOk={handleModelFilter}
      >
        <div className="filter-component-item">{curModel?.label}</div>
      </Picker>
      <Picker
        data={areaData}
        cols={1}
        value={[curArea?.value]}
        onOk={handleAreaFilter}
      >
        <div className="filter-component-item">{curArea?.label}</div>
      </Picker>

      <Picker
        data={STORE_STATUS}
        cols={1}
        value={[storeStatus?.value]}
        onOk={handleStatusFilter}
      >
        <div className={'filter-component-item'}>{storeStatus?.label}</div>
      </Picker>
      <div
        className="filter-component-item-extra"
        onClick={() =>
          handleQualityFilter(
            hasQuality === API_STORE.CHANNEL.main
              ? API_STORE.CHANNEL.no
              : API_STORE.CHANNEL.main
          )
        }
      >
        品质优选
      </div>
    </div>
  );
};
export default memo(Index);
