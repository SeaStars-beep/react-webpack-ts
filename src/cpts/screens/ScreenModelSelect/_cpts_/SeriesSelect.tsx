import React from 'react';
import { CarComponent } from '../view.model';
import { API_Car } from '@src/entites/index';

// 汽车类别选择
interface Props {
  seriesList: API_Car.ResListRecord[];
  handleSeriesClick: (data: API_Car.ResListRecord) => Promise<void>;
  setCurComponent: React.Dispatch<React.SetStateAction<CarComponent>>;
}

const Index: React.FC<Props> = (props) => {
  const { seriesList, handleSeriesClick, setCurComponent } = props;

  const [first] = seriesList;
  return (
    <div className="car-class-select-wrap">
      <div className={'car-class-select-tit'}>
        已选品牌{' '}
        <span
          className={'car-class-select-tit-back'}
          onClick={() => setCurComponent(CarComponent.brand)}
        >
          {'<'} 返回上一级
        </span>
      </div>
      <div className={'class-general-wrap'}>
        <div className={'cur-brand-info'}>
          <img className={'cur-brand-ico'} src={first?.img} />
          <span className={'cur-brand-name'}>{first?.brandName}</span>
        </div>
        <div className={'car-class-item-wrap'}>
          {seriesList?.map((o) => (
            <div
              key={`series_${o?.seriesId}`}
              className={'car-class-item'}
              onClick={() => handleSeriesClick(o)}
            >
              {o?.seriesName}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Index;
