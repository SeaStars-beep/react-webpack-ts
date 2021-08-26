import qs from 'qs';
import { makeIO } from '@src/services/meta';
import { makePublicParams } from '@src/services/meta';

// 车型分页列表
export const getPageList = makeIO<any>(
  'post',
  '/api/v1/h5/user/car/getPageList'
);

// 添加用户车型
export const vehicleAdd = makeIO<any>('post', '/api/v1/h5/user/car/add');

// 删除用户车型

export const vehicleDelete = makeIO<any>('post', (params) => {
  return `/api/v1/h5/user/car/delete/${params.appId}/${params.id}`;
});

// 车型详情
export const vehicleInfo = makeIO<any>('get', (params) => {
  return `/api/v1/h5/user/car/info/${params.appId}/${params.id}`;
});

// 修改用户车型
export const vehicleUpdate = makeIO<any>('put', '/api/v1/h5/user/car/update');

// 车型
export const vehicleModel = makeIO<any>(
  'post',
  '/api/v1/customer/channel/store/cartype/list'
);
