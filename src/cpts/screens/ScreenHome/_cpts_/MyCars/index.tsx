import React, { memo } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { EffectCoverflow } from 'swiper/core';
import useViewModel from './view.model';
import { API_STORE, API_Common } from '@src/entites/index';
import './index.less';
// Import Swiper styles from index.less

SwiperCore.use([EffectCoverflow]);

export interface Props {
  data: API_STORE.ResBindCar[];
  callback?: (data: API_STORE.ResBindCar) => void;
}
const Index: React.FC<Props> = (props) => {
  const { data, handleClick, handleAddClick } = useViewModel(props);

  const CarCard: React.FC<{ data: API_STORE.ResBindCar }> = (props) => {
    const { data } = props;
    return (
      <div className="car-card-item">
        <div className="car-card-info">
          <img className="car-card-ico" src={data?.pic} />
          <div className="car-card-no">{data?.carNumber}</div>
        </div>
        <div className="car-card-btn" onClick={() => handleClick(data)}>
          详情
        </div>
      </div>
    );
  };

  return (
    <div className="cars-cards-wrap">
      {data?.length > 0 && (
        <Swiper
          centeredSlides={true}
          slidesPerView={'auto'}
          centeredSlidesBounds={false}
          spaceBetween={9}
          className="my-swiper-con"
        >
          {data.length > 1 &&
            data?.map((o) => (
              <SwiperSlide
                key={o?.id}
                style={{ width: '89%' }}
                className="my-swiper-slide-item"
              >
                <CarCard data={o} />
              </SwiperSlide>
            ))}
          {data.length === 1 &&
            data?.map((o) => (
              <SwiperSlide
                key={o?.id}
                style={{ width: '93.6%' }}
                className="my-swiper-slide-item"
              >
                <CarCard data={o} />
              </SwiperSlide>
            ))}
        </Swiper>
      )}

      {data?.length === 0 && (
        <div className="no-car-wrap">
          <div onClick={handleAddClick} className="add-car-btn">
            +{'  '}添加爱车
          </div>
        </div>
      )}
    </div>
  );
};
export default memo(Index);
