import { useState, useEffect, useRef } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { useStores } from '@src/store';
import { Modal } from 'antd-mobile';
import {
  getAreaList,
  getCategoryList,
  getCartypeList,
  getBindCarList,
  getConfigure,
} from '@src/services/home';
import { API_STORE, API_Common } from '@src/entites/index';

const alert = Modal.alert;
const useViewModel = () => {
  const childRef = useRef<any>();
  const history = useHistory();
  const location = useLocation();
  const [allAreas, setAllAreas] = useState<API_Common.LabelValue[]>([]);
  // global state
  const { globalState } = useStores();
  const { codeInfo } = globalState.curCityInfo;

  const [_, cityCode] = codeInfo;
  // 服务列表
  const [categoryList, setCategoryList] = useState<API_STORE.ResCategory[]>([]);
  const [carTypeList, setCarTypeList] = useState<API_Common.LabelValue[]>([]);
  // 绑定车辆
  const [bindCarData, setBindCarData] = useState<API_STORE.ResBindCar[]>([]);
  // 热门精选
  const [popularData, setPopular] = useState<API_STORE.ResConfig>(null);
  // 其他应用
  const [appsData, setAppsData] = useState<API_STORE.ResConfig>(null);
  //banner
  const [advBanner, setAdvBanner] = useState<API_STORE.ResConfig>(null);
  /**
   * appid
   */
  const APPID = localStorage.getItem('selfId');

  /**
   *
   * @param cityCode 获取城市区域数据
   */
  const getAreas = async (cityCode: string) => {
    const { data } = await getAreaList({ cityCode });
    const { areasList } = data?.data;
    const arr = areasList?.map((o) => ({ label: o?.area, value: o?.areaCode }));
    const allItem = { label: '全市', value: '' };
    setAllAreas([allItem, ...arr]);
  };

  /**
   *
   * @param data 城市筛选回调
   */
  const handleCitySelect = (data: string) => {
    childRef.current.common({ areaCode: data });
  };
  /**
   *
   * @param data 门店状态筛选回调
   */
  const handleStatusSelect = (data: string) => {
    childRef.current.common({ status: data });
  };
  /**
   *
   * @param  车型数据获取
   */
  const initModelData = async () => {
    const { data } = await getCartypeList({ appId: APPID });
    if (!data?.success) {
      alert('', data?.msg ?? '车型数据获取错误');
      return;
    }
    const allItem = { label: '全部车型', value: '' };
    const list = data?.data;
    const final: API_Common.LabelValue[] = list?.map((o) => ({
      label: o?.name,
      value: o?.value,
    }));
    setCarTypeList([allItem, ...final]);
  };
  /**
   *
   * @param data 车型状态筛选回调
   */
  const handleModelSelect = (data: string) => {
    childRef.current.common({ carType: data });
  };
  /**
   * 品质优选
   */
  const handleQualitySelect = async (channel: any) => {
    childRef.current.common({ channel });
  };
  /**
   * 门店列表initial
   */
  const init = () => {
    childRef.current.common({});
  };
  /**
   * 服务列表init
   */
  const initCategory = async () => {
    const params = {
      pageIndex: 1,
      pageSize: 10,
      appId: APPID,
    };
    const { data } = await getCategoryList(params);
    if (!data?.success) {
      return;
    }
    const all: API_STORE.ResCategory = {
      id: null,
      name: '全部',
      level: 1,
    };
    setCategoryList([all, ...(data?.data?.records ?? [])]);
  };
  /**
   * 跳转搜索页面
   */
  const handleToPage = () => {
    history.push({ pathname: '/store-search' });
  };
  /**
   *
   * @param data 服务筛选
   */
  const handleCategorySelect = async (data: any) => {
    const productCategoryId = data?.id;
    childRef.current.common({ productCategoryId });
  };

  /**
   *
   * @param e  列表滚动
   */
  const handleScroll = (e: any) => childRef.current.scroll(e);
  /**
   *
   * @returns  获取绑定汽车数据接口
   */
  const initBindCars = async () => {
    const params = {
      pageIndex: 1,
      pageSize: 10,
      appId: APPID,
    };
    const { data } = await getBindCarList(params);
    if (!data?.success) {
      return;
    }
    setBindCarData(data?.data?.records ?? []);
  };
  /**
   * 初始化配置
   */
  const initConfig = async () => {
    const types = [
      API_Common.Enum_Active.column_icon,
      API_Common.Enum_Active.popular_choice,
      API_Common.Enum_Active.index_banner,
    ];
    const { data } = await getConfigure({
      types: JSON.stringify(types),
      appId: APPID,
    });
    if (!data?.success || !data?.data || data?.data.length === 0) {
      return;
    }
    data?.data?.forEach((item) => {
      if (item?.type === API_Common.Enum_Active.column_icon) {
        setAppsData(item);
      }
      if (item?.type === API_Common.Enum_Active.index_banner) {
        setAdvBanner(item);
      }
      if (item?.type === API_Common.Enum_Active.popular_choice) {
        setPopular(item);
      }
    });
  };

  useEffect(() => {
    if (globalState?.curCityInfo?.codeInfo?.length > 0) {
      initConfig();
      initBindCars();
      initModelData();
      initCategory();
      getAreas(cityCode);
      init();
    }
  }, [globalState?.curCityInfo]);

  return {
    allAreas,
    handleCitySelect,
    handleStatusSelect,
    handleModelSelect,
    handleQualitySelect,
    handleScroll,
    categoryList,
    handleCategorySelect,
    handleToPage,
    carTypeList,
    bindCarData,
    popularData,
    appsData,
    advBanner,
    childRef,
  };
};

export default useViewModel;
