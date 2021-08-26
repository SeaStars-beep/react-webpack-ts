import React from 'react';

import 'antd-mobile/dist/antd-mobile.css';
import { ListDTO } from '../view.model';
import { API_Car } from '@src/entites/index';

// 汽车品牌选择
interface Props {
  LETTERS: string[];
  handleScrollInto: (letter: string) => void;
  oftenList: API_Car.ResListRecord[];
  allList: ListDTO[];
  handleBrandClick: (data: API_Car.ResListRecord) => Promise<void>;
  handleSearch: (data: any) => Promise<void>;
}

const Index: React.FC<Props> = (props) => {
  const {
    LETTERS,
    handleScrollInto,
    oftenList,
    allList,
    handleBrandClick,
    handleSearch,
  } = props;

  return (
    <div className="car-brand-select-wrap">
      <div className={'model-serarch-wrap'}>
        <span className={'am-search-synthetic-ph-icon'}></span>
        <input
          type="text"
          onKeyDown={handleSearch}
          className={'model-serarch'}
          placeholder="快速搜索"
        />
      </div>
      <div className={'model-general-wrap'}>
        {oftenList?.map((o) => (
          <div
            key={o?.brandId}
            className={'model-general-item'}
            onClick={() => handleBrandClick(o)}
          >
            <img
              className={'model-general-item-img'}
              src={o?.img}
              alt={o?.brandName}
            />
            <div className={'model-general-item-name'}>{o?.brandName}</div>
          </div>
        ))}
      </div>
      <div className={'model-detail-wrap'}>
        <div className={'model-detail-item-wrap'}>
          {allList?.map((item) => (
            <div
              className={'model-detail-item'}
              key={`${item.letter}_CAR_LETTER`}
              id={`${item.letter}_CAR_LETTER`}
            >
              <div className={'car-model-first-letter'}>{item.letter}</div>
              {item?.children?.map((child) => (
                <div
                  className={'car-model-info'}
                  key={`brandId_${child?.brandId}`}
                  onClick={() => handleBrandClick(child)}
                >
                  <img className={'car-model-ico'} src={child?.img} />
                  <span className={'car-model-name'}>{child?.brandName}</span>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
      <div className={'model-slide-wrap'}>
        <div className={'model-slide-wrap-inner'}>
          {LETTERS?.map((o) => (
            <span onClick={() => handleScrollInto(o)} key={o}>
              {o}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Index;
