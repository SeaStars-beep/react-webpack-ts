import { useEffect, useState } from 'react';
import { useStores } from '@src/store';
import { Toast } from 'antd-mobile';
import { getParamsInUrl } from '@src/utils';

const useViewModel = () => {
  const [loading, setLoading] = useState(true);
  const { globalState } = useStores();
  // 获取当前位置信息
  const getCurPos = () => {
    window.addEventListener('setEvent', (e: any) => {
      const { longitude, latitude, codeInfo } = e?.detail;
      globalState.curCityInfo = { longitude, latitude, codeInfo };
    });
  };

  useEffect(() => {
    if (process.env.ENV_MODE !== 'production') {
      /* eslint-disable no-new */
      const VConsole = require('vconsole');
      new VConsole();
    }

    getCurPos();
    if (localStorage.getItem('token') && localStorage.getItem('selfId')) {
      setLoading(false);
    } else {
      const selfId = getParamsInUrl('selfId');
      const token = getParamsInUrl('pro-token');
      if (!selfId || !token) {
        Toast.fail('没有必要的参数appId&token，请联系开发人员');
      } else {
        localStorage.setItem('token', token);
        localStorage.setItem('selfId', selfId);
        setLoading(false);
      }
    }
  }, []);

  return {
    loading,
    globalState,
  };
};

export default useViewModel;
