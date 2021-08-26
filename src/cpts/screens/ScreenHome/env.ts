import { API_Common } from '@src/entites/index';
export const wx = require('weixin-js-sdk');

const u = navigator.userAgent.toLowerCase();
const isIos = /(iphone | macintosh | mac os x)/i.test(u);
const isAndroid = u.indexOf('android') > -1 || u.indexOf('adr') > -1;
const isWx = /microMessenger/i.test(u);

export interface SetItem {
  pic?: string;
  url?: string;
  type?: API_Common.Enum_App_Type;
  name?: string;
  spareUrl?: string;
}
/**
 *
 * @param data  h5跳转
 */
export const h5History = (data = '') => {
  const appId = localStorage.getItem('selfId');
  const token = localStorage.getItem('token');
  const urlObj = new URL(data);
  let final = '';
  const operator = urlObj?.search ? '&' : '?';
  final = `${data}${operator}selfId=${appId}&pro-token=${token}&appId=${appId}&token=${token}`;
  window.location.href = final;
};
/**
 *
 * @returns  获取当前环境
 */
export const getCurEnv = () => {
  return new Promise((reslove) => {
    if ((window as any)?.littleElephant || (window as any)?.czbInfo) {
      // app内部
      if (isIos) {
        // ios app
        reslove(API_Common.Enum_App_Type.ios);
      }
      if (isAndroid) {
        // Android app
        reslove(API_Common.Enum_App_Type.android);
      }
    } else if (isWx) {
      wx.miniProgram.getEnv((res: any) => {
        if (res.miniprogram) {
          // 小程序
          reslove(API_Common.Enum_App_Type.applet);
        } else {
          // 微信网页
          reslove(API_Common.Enum_App_Type.wx);
        }
      });
    } else {
      reslove(API_Common.Enum_App_Type.h5);
    }
  }).catch(() => API_Common.Enum_App_Type.h5);
};

/**
 *  统一跳转
 */
export const handleRoute = (
  type: API_Common.Enum_App_Type,
  url = '',
  spareUrl: string
) => {
  if (type === API_Common.Enum_App_Type.ios) {
    // 跳转ios app 页面 暂未定义
    h5History(url ? url : spareUrl);
  }
  if (type === API_Common.Enum_App_Type.android) {
    // 跳转Android app 页面 暂未定义
    h5History(url ? url : spareUrl);
  }
  if (type === API_Common.Enum_App_Type.applet) {
    // 跳转小程序 页面 url? url : spareUrl
    if (url) {
      wx.miniProgram.navigateTo({ url });
    } else {
      h5History(spareUrl);
    }
  }
  if (type === API_Common.Enum_App_Type.wx) {
    // 微信浏览器 页面 url? url : spareUrl
    h5History(url ? url : spareUrl);
  }
  if (type === API_Common.Enum_App_Type.h5) {
    // 走h5页面逻辑
    h5History(url);
  } else {
    // 走h5页面逻辑
    h5History(url);
  }
};

/**
 *
 * @param data 处理各个环境下的数据
 */

export const handleData = async (data: any[]) => {
  const curEnv = await getCurEnv();
  console.log('当前页面env------------', curEnv);
  const res = data?.map((item) => {
    const cur = item?.data?.find((o: SetItem) => o?.type === curEnv);
    const spare = item?.data?.find(
      (o: SetItem) => o?.type === API_Common.Enum_App_Type.h5
    );
    return { ...cur, spareUrl: spare?.url };
  });
  return res;
};
