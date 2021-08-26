import qs from 'qs';
import { makeIO } from '@src/services/meta';
import { makePublicParams } from '@src/services/meta';

/**北京接口调用demo */
export const loginByCode = makeIO<
  { code: string; type: string },
  { openId: string; token: string }
>(
  'post',
  '/api/v1/customer/user/h5/login',
  (params) => {
    const reg = makePublicParams('/api/v1/customer/user/h5/login');
    return qs.stringify({ ...params, ...reg });
  },
  'BJ'
);

/**杭州接口调用demo */
export const cancel = makeIO<{ orderId: string }, never>(
  'post',
  '/api/v1/customer/vehicle/order/cancel'
);
