import { useState, useEffect } from 'react';
import { useStores } from '@src/store';
import { Toast } from 'antd-mobile';
import {
  vehicleAdd,
  vehicleModel,
  vehicleUpdate,
  getPageList,
} from '@src/services/vehicleInformation';
import { any } from 'prop-types';
import moment from 'moment';

const useViewModel = (props: any) => {
  const { globalState } = useStores();
  const [showOrNot, setshowOrNot] = useState<any>(false);
  const [carType, setcarType] = useState<any>([]);
  const [pageList, setPageList] = useState<any>([]);
  const setCarNumber = (val: string) => {
    globalState.carModel.carNumber = val;
  };
  const carTypeEvenet = (val: string) => {
    globalState.carType = val;
  };
  const registrationDate = (val: any) => {
    globalState.carModel.registrationDate = new Date(val);
  };
  const setVIN = (val: string) => {
    globalState.carModel.VIN = val;
  };
  const setEngine = (val: string) => {
    globalState.carModel.engine = val;
  };
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
  const submit = () => {
    if (
      globalState.carModel.carNumber &&
      globalState.carModel.selctModel &&
      globalState.carType
    ) {
      const xreg =
        /^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}(([0-9]{5}[DF]$)|([DF][A-HJ-NP-Z0-9][0-9]{4}$))/;
      const creg =
        /^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}[A-HJ-NP-Z0-9]{4}[A-HJ-NP-Z0-9挂学警港澳]{1}$/;

      if (globalState.carModel.carNumber.length === 7) {
        if (creg.test(globalState.carModel.carNumber)) {
          vehicleAddEvent();
        } else {
          Toast.fail('输入的车牌格式不对');
        }
      } else if (globalState.carModel.carNumber.length === 8) {
        if (xreg.test(globalState.carModel.carNumber)) {
          vehicleAddEvent();
        } else {
          Toast.fail('输入的车牌格式不对');
        }
      } else {
        Toast.fail('输入的车牌格式不对');
      }
    } else {
      Toast.fail('请填写必填信息');
    }
  };

  const vehicleAddEvent = () => {
    const params = {
      carNumber: globalState.carModel.carNumber,
      carId: globalState.carModel.selctModel.id,
      carType: globalState.carType[0],
      registerDate: globalState.carModel.registrationDate
        ? moment(globalState.carModel.registrationDate).format('YYYY-MM-DD')
        : '',
      frameNumber: globalState.carModel.VIN,
      engineNumber: globalState.carModel.engine,
      appId: localStorage.getItem('selfId'),
      id: '' as number | string,
    };
    if (globalState.carModel.vehicleUpdateId) {
      let carNumberNum: any = [];
      pageList.map((val: any, key: string) => {
        if (val.id !== globalState.carModel.vehicleUpdateId) {
          carNumberNum.push(val.carNumber);
        }
        console.log(carNumberNum, '001111');
      });
      if (carNumberNum.indexOf(globalState.carModel.carNumber) == -1) {
        params.id = globalState.carModel.vehicleUpdateId;
        vehicleUpdate(params).then((res: any) => {
          if (res.data.message === '操作成功') {
            Toast.success('修改成功！', 1);
            globalState.carModel.carNumber = '';
            globalState.carModel.selctModel = null;
            globalState.carType = [];
            globalState.carModel.registrationDate = '';
            globalState.carModel.VIN = '';
            globalState.carModel.engine = '';
            setTimeout(() => {
              props.history.push({
                pathname: '/my-car',
              });
            }, 500);
            globalState.carModel.vehicleUpdateId = '';
          } else {
            Toast.fail(res.data.message);
          }
        });
      } else {
        Toast.fail('已有相同的车牌');
      }
    } else {
      let carNumberNum: any = [];
      pageList.map((val: any, key: string) => {
        carNumberNum.push(val.carNumber);
      });
      if (carNumberNum.indexOf(globalState.carModel.carNumber) == -1) {
        vehicleAdd(params).then((res: any) => {
          if (res.data.message === '操作成功') {
            Toast.success('添加成功！', 1);
            globalState.carModel.carNumber = '';
            globalState.carModel.selctModel = null;
            globalState.carType = [];
            globalState.carModel.registrationDate = '';
            globalState.carModel.VIN = '';
            globalState.carModel.engine = '';
            setTimeout(() => {
              props.history.push({
                pathname: '/my-car',
              });
            }, 500);
          } else {
            Toast.fail(res.data.message);
          }
        });
      } else {
        Toast.fail('已有相同的车牌');
      }
    }
  };
  const vehicleModelEvenet = () => {
    vehicleModel().then((res: any) => {
      if (res.data.data) {
        const vehicleModel = res.data.data.map((e: any) => {
          return {
            value: e.value,
            label: e.name,
          };
        });
        setcarType(vehicleModel);
      }
    });
  };
  useEffect(() => {
    getPageListEvent();
    vehicleModelEvenet();
    if (props.location.query) {
      globalState.carModel.vehicleUpdateId = props.location.query.id;
    }
  }, []);
  const foldEvent = () => {
    if (showOrNot) {
      setshowOrNot(false);
    } else {
      setshowOrNot(true);
    }
  };
  const goModel = () => {
    props.history.push({
      pathname: '/model-select',
    });
  };
  const carList = () => {
    props.history.push({
      pathname: '/my-car',
    });
  };

  return {
    goModel,
    setCarNumber,
    carType,
    showOrNot,
    foldEvent,
    carTypeEvenet,
    registrationDate,
    setVIN,
    setEngine,
    submit,
    carList,
  };
};

export default useViewModel;
