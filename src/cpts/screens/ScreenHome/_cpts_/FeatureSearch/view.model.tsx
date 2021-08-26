import { useState } from 'react';
import { Props } from './index';
import { API_STORE, API_Common, API_Car } from '@src/entites/index';

const useViewModel = (props: Props) => {
  const { callback, extraCallback, data } = props;
  const [active, setActive] = useState(API_STORE.Feature.all);
  const handleFeatureClick = (data: any) => {
    if (data?.id !== active) {
      if (callback) {
        callback(data);
      }
      setActive(data?.id);
    }
  };
  const handleExtraClick = () => {
    if (extraCallback) {
      extraCallback();
    }
  };
  return {
    handleFeatureClick,
    handleExtraClick,
    data,
    active,
  };
};

export default useViewModel;
