import { useEffect, useState } from 'react';

import { Props } from './index';
import { handleData, handleRoute, SetItem } from '../../env';

const useViewModel = (props: Props) => {
  const { data } = props;
  const [list, setList] = useState([]);
  const handleClick = (data: SetItem) => {
    handleRoute(data?.type, data?.url, data?.spareUrl);
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
