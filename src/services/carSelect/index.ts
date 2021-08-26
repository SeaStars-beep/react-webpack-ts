import { makeIO } from '@src/services/meta';
import { API_Car, API_Common } from '@src/entites/index';
// import {} from '@src/entites/meta'

export const getCarList = makeIO<
  API_Car.ReqCarListParam,
  API_Common.ListDto<API_Car.ResListRecord>
>('post', '/carInfo/list');
