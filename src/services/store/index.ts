import qs from 'qs';
import { makeIO } from '@src/services/meta';
import { API_Common, API_STORE } from '@src/entites/index';

/**杭州接口调用demo */
export const channelStoreList = makeIO<
  API_STORE.ReqStoreListParam,
  API_STORE.ResStoreRecord
>('post', '/api/v1/customer/channel/store/list');
