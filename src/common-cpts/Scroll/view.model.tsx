import { useState, useRef, useImperativeHandle } from 'react';
import { Modal, Toast } from 'antd-mobile';
import lodash from 'lodash';
import { useStores } from '@src/store';
import { getChannelStore } from '@src/services/home';
import { API_STORE, API_Common } from '@src/entites/index';
import { getCurEnv } from '@src/cpts/screens/ScreenHome/env';

const wx = require('weixin-js-sdk');

const alert = Modal.alert;
const PAGE_SIZE = 20;
const useViewModel = (props: any, comRef: any) => {
  /**
   * appid
   */
  const APPID = localStorage.getItem('selfId');
  const pageRef = useRef<any>(1);
  const [storeTotal, setStoreTotal] = useState(0);
  const [storeList, setStoreList] = useState<Array<API_STORE.ResStoreRecord>>(
    []
  );
  const [filterParam, setFilterParam] = useState<
    Partial<API_STORE.ReqStoreListParam>
  >({});
  // global state
  const { globalState } = useStores();
  const { codeInfo, latitude, longitude } = globalState.curCityInfo;
  const [_, cityCode] = codeInfo;
  /**
   *
   * @param p  门店列表
   * @returns
   */
  const getStoreList = async (p: Partial<API_STORE.ReqStoreListParam>) => {
    Toast.loading('Loading...', 10);
    const params = {
      latitude,
      longitude,
      cityCode,
      gpsType: 3,
      pageSize: PAGE_SIZE,
      appId: APPID,
      ...p,
    };
    const { data } = await getChannelStore(params);
    if (!data?.success) {
      alert('', data?.msg ?? '列表获取失败！');
      return;
    }
    Toast.hide();
    return data?.data;
  };
  const handleCommon = async (
    commonParam: Partial<API_STORE.ReqStoreListParam>
  ) => {
    setStoreList([]);
    pageRef.current = 1;
    const parmas = { ...commonParam, pageIndex: pageRef.current };
    const res = await getStoreList(parmas);
    setFilterParam({ ...filterParam, ...commonParam });
    const list = res?.records ?? [];
    setStoreTotal(res?.total ?? 0);
    setStoreList(list);
  };
  /**
   *
   * @param e  列表滚动
   */
  const handleScroll = async (e: any) => {
    try {
      const { scrollHeight, scrollTop, offsetHeight } = e?.target;
      const ABS = Math.abs(
        scrollHeight - (Math.round(scrollTop) + offsetHeight)
      );
      if (ABS <= 2 && pageRef.current * PAGE_SIZE < storeTotal) {
        const parmas = { ...filterParam, pageIndex: pageRef.current + 1 };
        const res = await getStoreList(parmas);
        pageRef.current = pageRef.current + 1;
        const list = res?.records ?? [];
        setStoreList((e) => [...e, ...list]);
      }
    } catch (err) {
      console.error('sroll-err', JSON.stringify(err));
    }
  };
  const doubanceScroll = lodash.debounce(handleScroll, 300);

  const handleCommonApplet = ({ storeNo = '', distance = 0 }) => {
    wx.miniProgram.navigateTo({
      url: `/pages/carService/detail/detail?storeNo=${storeNo}&distance=${distance}`,
    });
  };
  /**
   *
   * @param data
   * @returns 门店详情跳转
   */
  const handleDetail = async (data: API_STORE.StoreDTO) => {
    const { distance, storeNo, channel } = data;
    const curEnv = await getCurEnv();
    console.info('当前环境----', curEnv);
    handleCommonApplet({ storeNo, distance });
    if (curEnv === API_Common.Enum_App_Type.android) {
      (window as any)?.littleElephant?.toCarServeDetailPage(
        storeNo,
        distance,
        channel
      );
    }
  };

  /**
   *
   * @param data
   * @param store
   * @returns  确认订单跳转小程序
   */
  const handleSureBill = async (
    data: API_STORE.ProductItem,
    store: API_STORE.StoreDTO
  ) => {
    const { distance, storeNo } = store;
    const curEnv = await getCurEnv();
    console.info('当前环境----', curEnv);
    handleCommonApplet({ storeNo, distance });
    if (curEnv === API_Common.Enum_App_Type.android) {
      (window as any)?.littleElephant?.toCarServeConfirmOrderPage(
        JSON.stringify(store),
        JSON.stringify(data),
        null,
        false
      );
    }
  };

  useImperativeHandle(comRef, () => ({
    common: (commonParam: Partial<API_STORE.ReqStoreListParam>) =>
      handleCommon(commonParam),
    scroll: (e: any) => doubanceScroll(e),
  }));

  return {
    storeList,
    storeTotal,
    doubanceScroll,
    handleCommon,
    handleSureBill,
    handleDetail,
  };
};

export default useViewModel;
