import { useState, useEffect } from 'react';
import { Props } from './index';
import { API_Common } from '@src/entites/index';
import { handleData, handleRoute, SetItem, getCurEnv, wx } from '../../env';

const useViewModel = (props: Props) => {
  const { data } = props;
  const [list, setList] = useState([]);

  const handleClick = async (data: SetItem) => {
    const appId = localStorage.getItem('selfId');
    const token = localStorage.getItem('token');
    const cur = await getCurEnv();
    let final = '';
    const url = data?.url ? data?.url : data?.spareUrl;
    if (cur === API_Common.Enum_App_Type.wx) {
      final = `${url}&selfId=${appId}&pro-token=${token}&appId=${appId}`;
    }
    if (cur === API_Common.Enum_App_Type.applet) {
      wx.miniProgram.navigateTo({ url });
    } else {
      final = `${url}&selfId=${appId}&pro-token=${token}&appId=${appId}&token=${token}`;
    }
    window.location.href = final;
    // handleRoute(data?.type, data?.url, data?.spareUrl);
  };

  const handleInitList = async (ori: string) => {
    const data = JSON.parse(ori);
    const res = await handleData(data);
    setList(res);
  };

  useEffect(() => {
    handleInitList(data.content);
  }, []);

  return {
    handleClick,
    list,
  };
};

export default useViewModel;
