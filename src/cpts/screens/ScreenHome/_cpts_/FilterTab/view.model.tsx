import { useState } from 'react';
import { Props } from './index';
import { API_STORE, API_Common } from '@src/entites/index';

export const STORE_STATUS = [
  {
    label: '全部车型',
    value: API_STORE.ONLINE.all,
  },
  {
    label: '营业中',
    value: API_STORE.ONLINE.on,
  },
  {
    label: '休息中',
    value: API_STORE.ONLINE.stop,
  },
];

const useViewModel = (props: Props) => {
  const {
    areaCallback,
    areaData,
    statusCallback,
    modelCallback,
    quailtyCallback,
    carTypeData,
  } = props;
  // 筛选项state
  const [curArea, setCurArea] = useState<API_Common.LabelValue>({
    label: '全市',
    value: null,
  });
  const [storeStatus, setStoreStatus] = useState({
    label: '全部',
    value: API_STORE.ONLINE.all,
  });
  const [curModel, setCurModel] = useState({
    label: '全部车型',
    value: null,
  });
  const [hasQuality, setHasQuality] = useState(API_STORE.CHANNEL.no);
  /**
   *
   * @param data 区域筛选
   */
  const handleAreaFilter = (data: any) => {
    const [val] = data;
    const cur = areaData.find((o) => o.value === val);
    setCurArea(cur);
    areaCallback && areaCallback(val);
  };
  /**
   *
   * @param data 门店状态筛选
   */
  const handleStatusFilter = (data: any) => {
    const [val] = data;
    const cur = STORE_STATUS.find((o) => o.value === val);
    setStoreStatus(cur);
    statusCallback && statusCallback(val);
  };
  /**
   *
   * @param data 车型筛选
   */
  const handleModelFilter = (data: any) => {
    const [val] = data;
    const cur = carTypeData.find((o) => o.value === val);
    setCurModel(cur);
    modelCallback && modelCallback(val);
  };
  /**
   *
   * @param data 品质优选
   */
  const handleQualityFilter = (data: any) => {
    if (API_STORE.CHANNEL.main === hasQuality && quailtyCallback) {
      quailtyCallback(data);
      setHasQuality(API_STORE.CHANNEL.no);
    }
    if (API_STORE.CHANNEL.no === hasQuality && quailtyCallback) {
      quailtyCallback(data);
      setHasQuality(API_STORE.CHANNEL.main);
    }
  };

  return {
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
  };
};

export default useViewModel;
