import React from 'react';
import './index.less';
import useViewModel from './view.model';
import { Modal, Toast } from 'antd-mobile';
import { remove } from 'mobx';
const alert = Modal.alert;
const ScreenMyCar = (props: any) => {
  const { addVehicle, removeEvent, pageList, editCar } = useViewModel(props);
  return (
    <div className="screen-my-car">
      {pageList &&
        pageList.map((val: any, key: any) => {
          return (
            <div className="my-car-map" key={key}>
              <img src={val.pic} />
              <div className="my-car-content">
                <div className="license-plate">{val.carNumber}</div>
                <div className="may-car-type">{val.fullName}</div>
              </div>
              <div className="my-car-edit">
                <span onClick={() => editCar(val)}></span>
                <span
                  onClick={() =>
                    alert('', '确定删除车辆', [
                      { text: '取消' },
                      {
                        text: '确认',
                        onPress: () => removeEvent(val),
                      },
                    ])
                  }
                ></span>
              </div>
            </div>
          );
        })}

      <div
        className="add-vehicle"
        onClick={() => {
          addVehicle();
        }}
      >
        添加车辆
      </div>
    </div>
  );
};

export default ScreenMyCar;
