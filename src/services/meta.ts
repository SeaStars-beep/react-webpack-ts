import axios, { AxiosRequestConfig, AxiosResponse, Method } from 'axios';
import Cookie from 'js-cookie';
import CryptoJS from 'crypto-js';
import { Modal } from 'antd-mobile';

const alert = Modal.alert;
const rawIO = axios.create({
  withCredentials: false,
});
const tokenFieldName = 'token';
rawIO.interceptors.request.use((config: AxiosRequestConfig) => {
  const tokenInCookie = Cookie.get(tokenFieldName);
  const tokenInStorage = localStorage.getItem(tokenFieldName);

  let token;
  if (tokenInCookie) {
    localStorage.setItem(tokenFieldName, tokenInCookie);
    token = tokenInCookie;
  } else {
    token = tokenInStorage;
  }

  /*config.headers.mode 用来判断是BJ接口还是HZ接口*/
  const mode = config.headers.mode;
  if (mode === 'BJ') {
    /**由于反向代理，北京接口需要添加oil前缀，北京接口token需要按Authorization字段传递*/
    config.url = `/oil${config.url}`;
    config.headers['Authorization'] = `Bearer ${token}`;
  } else {
    /**由于反向代理，杭州接口需要添加cs前缀，杭州接口直接传token字段，并需要传selfId*/
    config.url = `/cs${config.url}`;
    config.headers['token'] = token;
    config.headers['appId'] = localStorage.getItem('selfId');
  }

  if (!config.responseType) {
    config.responseType = 'json';
  }

  if (!config.headers['Content-Type']) {
    /**北京杭州content type不同，需要区分 */
    config.headers['Content-Type'] =
      mode === 'BJ'
        ? 'application/x-www-form-urlencoded'
        : 'application/json;charset=utf-8';
  }
  delete config.headers.mode;
  config.url = process.env.API_BACK + config.url;
  return config;
});

rawIO.interceptors.response.use((res: AxiosResponse<Ret<any>>) => {
  if (
    res.status === 200 &&
    (res.data.code === ResultCode.INVALID_TOKEN ||
      res.data.code === ResultCode.TOKEN_OVERDUE)
  ) {
    localStorage.removeItem(tokenFieldName);
    alert('', 'token失效，请重新登录！');
  }
  return res;
});

export enum ResultCode {
  OK2 = 1, //成功
  OK = 200, // 成功
  UNAUTHORIZED = 401, // 非法访问
  NOT_PERMISSION = 403, // 没有权限
  NOT_FOUND = 404, // 资源不存在
  FAIL = 500, // 操作失败
  INVALID_TOKEN = 1007, // token失效
  LOGIN_EXCEPTION = 4000, // 登录失败
  SYSTEM_EXCEPTION = 5000, // 系统异常
  PARAMETER_EXCEPTION = 5001, // 请求参数校验异常
  PARAMETER_PARSE_EXCEPTION = 5002, // 请求参数解析异常
  HTTP_MEDIA_TYPE_EXCEPTION = 5003, // HTTP内容类型异常
  SPRING_BOOT_PLUS_EXCEPTION = 5100,
  BUSINESS_EXCEPTION = 5101,
  DAO_EXCEPTION = 5102,
  VERIFICATION_CODE_EXCEPTION = 5103,
  AUTHENTICATION_EXCEPTION = 5104,
  UNAUTHENTICATED_EXCEPTION = 5105,
  UNAUTHORIZED_EXCEPTION = 5106,
  JWTDECODE_EXCEPTION = 5107,
  HTTP_REQUEST_METHOD_NOT_SUPPORTED_EXCEPTION = 5108,
  TOKEN_OVERDUE = 5109,
}
export interface Ret<DATA> {
  data: DATA;
  msg: string;
  code: ResultCode;
  success: boolean;
}
export type ResponsePromise<R> = Promise<AxiosResponse<Ret<R>>>;
export type SearchRet<E> = {
  pageIndex: number;
  pageSize: number;
  total: number;
  records: E[];
};
export type SearchRetBJ<E> = {
  pageIndex: number;
  pageSize: number;
  total: number;
  list: E[];
};

export function makeIO<P, R = never>(
  method: Method,
  url: string | ((params?: P) => string),
  makePayload?: (params?: P) => any, // 参数 => 载荷 转换器，默认直接用参数作为载荷
  mode?: 'BJ' | 'HZ'
): (params?: P) => ResponsePromise<R> {
  return (params: P) =>
    rawIO({
      url: typeof url === 'string' ? url : url(params),
      method,
      data: makePayload ? makePayload(params) : params,
      headers: { mode },
    });
}

const str2Byte = (str: any) => {
  let pos = 0;
  let len = str.length;
  if (len % 2 != 0) {
    return null;
  }
  len /= 2;
  const hexA = [];
  for (let i = 0; i < len; i++) {
    const s = str.substr(pos, 2);
    let v = parseInt(s, 16);
    if (v >= 127) v = v - 255 - 1;
    hexA.push(v);
    pos += 2;
  }
  return hexA;
};

const arrayBufferToBase64 = (buffer: any) => {
  let binary = '';
  const bytes = new Uint8Array(buffer);
  const len = bytes.byteLength;
  for (let i = 0; i < len; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return window.btoa(binary);
};

const toSign = (
  cv: string,
  did: string,
  method: string,
  os: string,
  rsign: string,
  timestamp: string
) => {
  const stringToSign = `cv=${cv}&did=${
    did || ''
  }&method=${method}&os=${os}&rsign=${rsign}&t=${timestamp}`;
  const key = localStorage.getItem('selfId');
  const nn = CryptoJS.enc.Utf8.parse(stringToSign);
  const sha1_result = CryptoJS.HmacSHA1(nn, key); // 第一个参数为加密字符串，第二个参数为公共秘钥
  const arr = str2Byte(sha1_result.toString());
  return arrayBufferToBase64(arr);
};

export function makePublicParams(url: string) {
  const t = `${new Date().getTime()}`;
  const cv = '1.0';
  const did = '20210401';
  const os = '2';
  const rsign = '20210401';
  return {
    t,
    appId: localStorage.getItem('selfId'),
    sign: toSign(cv, did, url, os, rsign, t),
    rsign,
    os,
    did,
    cv,
  };
}
