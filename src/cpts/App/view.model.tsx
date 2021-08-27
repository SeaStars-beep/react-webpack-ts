import { useEffect } from 'react';
import { useStores } from '@src/store';
import { Toast } from 'antd-mobile';
import { getParamsInUrl } from '@src/utils';
import { getCurEnv } from '@src/cpts/screens/ScreenHome/env';
import { getAppLog } from '@src/services/appInfo';
import { default as packageInfo } from '../../../package.json';

const useViewModel = () => {
  const { globalState } = useStores();
  // 获取当前位置信息
  const getCurPos = () => {
    window.addEventListener('setEvent', (e: any) => {
      const { longitude, latitude, codeInfo } = e?.detail;
      globalState.curCityInfo = { longitude, latitude, codeInfo };
    });
  };

  /**
   * token selfId  处理
   */
  const initTokenSelfId = () => {
    if(localStorage.getItem('token') && localStorage.getItem('selfId')) return;
    const selfId = getParamsInUrl('selfId');
    const token = getParamsInUrl('pro-token');
    if (!selfId || !token) {
      Toast.fail('没有必要的参数appId&token，请联系开发人员');
      return;
    } 
    localStorage.setItem('token', token);
    localStorage.setItem('selfId', selfId);
  };
  /**
   * app信息
   */
  const appInfo = async () => {
    const curEnv = await getCurEnv();
    const params = {
      构建项目名称: packageInfo.name,
      构建版本信息: packageInfo.version,
      app所在环境: curEnv,
      接口域名: process.env.API_BACK,
      构建环境: process.env.ENV_MODE,
    };
    await getAppLog({ versionJson: JSON.stringify(params) });
  };
  useEffect(() => {
    if (process.env.ENV_MODE !== 'production') {
      /* eslint-disable no-new */
      const VConsole = require('vconsole');
      new VConsole();
    }
    appInfo();
    getCurPos();
    initTokenSelfId();
  }, []);

  return {
    globalState,
  };
};

export default useViewModel;
