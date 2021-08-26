import React from 'react';
import { CarComponent } from '../view.model';
import { API_Car } from '@src/entites/index';

// 汽车类型选择
interface Props {
  modelList: API_Car.ResListRecord[];
  handleModelClick: ({
    brandId,
    seriesId,
    groupId,
  }: API_Car.ResListRecord) => Promise<void>;
  setCurComponent: React.Dispatch<React.SetStateAction<CarComponent>>;
}

const Index: React.FC<Props> = (props) => {
  const { modelList, handleModelClick, setCurComponent } = props;

  const [first] = modelList;

  return (
    <div className="car-class-select-wrap">
      <div className={'car-class-select-tit'}>已选品牌</div>
      <div className={'class-general-wrap'}>
        <div className={'cur-brand-info'}>
          <img className={'cur-brand-ico'} src={first?.img} />
          <span
            className={'cur-brand-name'}
            onClick={() => setCurComponent(CarComponent.series)}
          >{`${first?.brandName} > ${first?.seriesName}`}</span>
        </div>
        <div className={'car-class-item-wrap'}>
          {modelList?.map((o) => (
            <div
              key={`id${o?.id}`}
              className={'car-class-item'}
              onClick={() => handleModelClick(o)}
            >
              {o?.fullName}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Index;
