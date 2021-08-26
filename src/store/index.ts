/**
 * 全局状态管理
 */
import { observable } from 'mobx';
import { useLocalObservable } from 'mobx-react';
import { API_Car } from '@src/entites/index';

const curCityInfo = {
  // lng  lat  [provinceCode, citycode]
  longitude: '',
  latitude: '',
  codeInfo: [] as any,
};

const carModel = {
  //user选择的车型数据
  selctModel: null as API_Car.ResListRecord,
  carNumber: '',
  VIN: '',
  registrationDate: '' as any,
  engine: '',
  vehicleUpdateId: '',
};
const carType: any = [];

const globalState = observable({
  defaultStatus,
  carModel,
  carType,
  curCityInfo,
});

export const useStores = () =>
  useLocalObservable(() => ({
    globalState,
  }));
