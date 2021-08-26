import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useStores } from '@src/store';
import { API_Car } from '@src/entites/index';
import { getCarList } from '@src/services/carSelect';
import { codefans_net_CC2PY } from './letter';

const LETTERS = Array(26)
  .fill(1)
  .map((_, index) => String.fromCharCode(+index + 65));

export interface ListDTO {
  letter: string;
  children: API_Car.ResListRecord[];
}
const LIST_ALL = LETTERS?.map((o) => {
  const obj: ListDTO = {
    letter: o,
    children: [],
  };
  return obj;
});

export enum CarComponent {
  brand = 'brand',
  series = 'series',
  model = 'model',
}

const useViewModel = () => {
  const history = useHistory();
  const { globalState } = useStores();
  const { carModel } = globalState;
  const [curComponent, setCurComponent] = useState(CarComponent.brand);
  // 汽车品牌
  const [oftenList, setOfenList] = useState<API_Car.ResListRecord[]>([]);
  const [allList, setAllList] = useState<ListDTO[]>([]);
  // 汽车车系
  const [seriesList, setSeriesList] = useState<API_Car.ResListRecord[]>([]);
  // 汽车车型
  const [modelList, setModelList] = useState<API_Car.ResListRecord[]>([]);

  /**
   *
   * @param letter  车型列表id 首字母
   * 统一的id `${letter}_CAR_LETTER`
   *
   */
  const handleScrollInto = (letter: string) => {
    const cur = document.getElementById(`${letter}_CAR_LETTER`);
    cur.scrollIntoView();
  };

  /**
   *
   * @param data  API_Car.ResListRecord   车牌点击事件
   */
  const handleBrandClick = async ({ brandId }: API_Car.ResListRecord) => {
    const params = {
      level: API_Car.Enum_Level.series,
      brandId,
      pageSize: 500,
    };
    const { data } = await getCarList(params);
    setSeriesList(data?.data?.records ?? []);
    setCurComponent(CarComponent.series);
  };
  /**
   *
   * @param param0  车系点击事件
   */
  const handleSeriesClick = async ({
    brandId,
    seriesId,
  }: API_Car.ResListRecord) => {
    const params = {
      level: API_Car.Enum_Level.model,
      brandId,
      seriesId,
      pageSize: 500,
    };
    const { data } = await getCarList(params);
    setModelList(data?.data?.records ?? []);
    setCurComponent(CarComponent.model);
  };

  const handleModelClick = async (data: API_Car.ResListRecord) => {
    carModel.selctModel = data;
    history.push('/car-center');
  };
  const getBrandList = (records: API_Car.ResListRecord[]) => {
    // 后续使用web workers优化
    const copyList: ListDTO[] = JSON.parse(JSON.stringify(LIST_ALL));
    records?.map((o) => {
      const firstLetter = codefans_net_CC2PY(o?.brandName);
      copyList.forEach((i) => {
        const isHas = i.children.find((item) => item?.brandId === o.brandId);
        if (!isHas && firstLetter === i?.letter) {
          i.children.push(o);
        }
      });
    });
    const final = copyList?.reduce((total, cur) => {
      if (cur?.children.length > 0) {
        return [...total, cur];
      } else return total;
    }, []);
    setAllList(final);
  };

  /**
   *
   * @param e  搜索
   */
  const handleSearch = async (e: any) => {
    if (e?.key === 'Enter') {
      // 键盘确定事件
      const params = {
        level: API_Car.Enum_Level.brand,
        pageSize: 500,
        brandName: e?.target.value.trim(),
      };
      const { data } = await getCarList(params);
      const { records } = data?.data;
      getBrandList(records);
    }
  };

  const init = async () => {
    const { data: oftenData } = await getCarList({
      level: API_Car.Enum_Level.often,
      pageSize: 500,
    });
    setOfenList(oftenData?.data?.records ?? []);
    const { data: allData } = await getCarList({
      level: API_Car.Enum_Level.brand,
      pageSize: 500,
    });
    const { records } = allData?.data;
    getBrandList(records);
  };

  useEffect(() => {
    init();
  }, []);

  return {
    LETTERS,
    handleScrollInto,
    CarComponent,
    curComponent,
    oftenList,
    allList,
    LIST_ALL,
    handleBrandClick,
    seriesList,
    handleSeriesClick,
    modelList,
    handleModelClick,
    handleSearch,
    setCurComponent,
  };
};

export default useViewModel;
