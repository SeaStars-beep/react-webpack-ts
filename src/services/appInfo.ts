import { makeIO } from '@src/services/meta';

// 前端版本日志
export const getAppLog = makeIO<any, any>('post', '/api/v1/common/front');
