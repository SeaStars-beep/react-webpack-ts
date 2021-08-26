import { makeIO } from '@src/services/meta';
import { API_STORE, API_Common } from '@src/entites/index';
// import {} from '@src/entites/meta'

// 获取门店列表
export const getChannelStore = makeIO<
  API_STORE.ReqStoreListParam,
  API_Common.ListDto<API_STORE.ResStoreRecord>
>('post', '/api/v1/customer/channel/store/list');

// 获取区县接口
export const getAreaList = makeIO<{ cityCode: string }, API_STORE.SiteDTO>(
  'get',
  ({ cityCode }) => `/api/v1/admin/area/${cityCode}`
);

// 获取服务列表

export const getCategoryList = makeIO<
  API_STORE.ReqCategory,
  API_Common.ListDto<API_STORE.ResCategory>
>('post', '/api/v1/customer/product/category/product/category/list');

// 获取车型数据

export const getCartypeList = makeIO<
  API_STORE.ReqCarType,
  API_STORE.ResCarType[]
>('post', '/api/v1/customer/channel/store/cartype/list');

// 获取已有车辆列表

export const getBindCarList = makeIO<
  API_STORE.ReqCarType,
  API_Common.ListDto<API_STORE.ResBindCar>
>('post', '/api/v1/h5/user/car/getPageList');

// 页面配置接口
export const getConfigure = makeIO<API_STORE.ReqConfig, API_STORE.ResConfig[]>(
  'post',
  '/api/v1/customer/configure/list'
);
