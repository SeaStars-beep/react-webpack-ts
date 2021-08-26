import { useState, useEffect } from 'react';
import {
  getPageList,
  vehicleInfo,
  vehicleDelete,
} from '@src/services/vehicleInformation';
import { Toast } from 'antd-mobile';
import { useStores } from '@src/store';

const useViewModel = (props: any) => {
  const { globalState } = useStores();
  const [pageList, setPageList] = useState<any>([]);

  const getPageListEvent = () => {
    const params = {
      pageIndex: 1,
      pageSize: 5,
      appId: localStorage.getItem('selfId'),
    };
    getPageList(params).then((res: any) => {
      if (res.data.data) {
        setPageList(res.data.data.records);
      }
    });
  };
  const addVehicle = () => {
    if (pageList.length < 5) {
      globalState.carModel.carNumber = '';
      globalState.carModel.selctModel = null;
      globalState.carType = [];
      globalState.carModel.registrationDate = '';
      globalState.carModel.VIN = '';
      globalState.carModel.engine = '';
      props.history.push({
        pathname: '/car-center',
      });
      globalState.carModel.vehicleUpdateId = '';
    } else {
      Toast.info('车辆添加不能超过5辆', 1);
    }
  };
  const editCar = (val: any) => {
    vehicleInfo({ appId: localStorage.getItem('selfId'), id: val.id }).then(
      (res: any) => {
        const data = res.data.data;
        if (res.data.message === '操作成功') {
          globalState.carModel.carNumber = data.carNumber;
          globalState.carModel.selctModel = {
            fullName: data.fullName,
            id: data.carId,
          };
          globalState.carType = [data.carType];
          globalState.carModel.registrationDate = new Date(
            data.registerDate.substr(0, 10)
          );
          globalState.carModel.VIN = data.frameNumber;
          globalState.carModel.engine = data.engineNumber;
        } else {
          Toast.fail(res.data.message);
        }
      }
    );
    props.history.push({
      pathname: '/car-center',
      query: { id: val.id },
    });
  };
  const removeEvent = (val: any) => {
    vehicleDelete({ appId: localStorage.getItem('selfId'), id: val.id }).then(
      (res: any) => {
        if (res.data.message === '操作成功') {
          Toast.success('删除成功', 1);
          getPageListEvent();
        } else {
          Toast.fail(res.data.message);
        }
      }
    );
  };
  useEffect(() => {
    getPageListEvent();
  }, []);
  return {
    addVehicle,
    removeEvent,
    pageList,
    editCar,
  };
};

export default useViewModel;
