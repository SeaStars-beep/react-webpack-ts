import React from 'react';
import './index.less';
import { observer } from 'mobx-react';
import useViewModel from './view.model';
import { useStores } from '@src/store';
import { Picker } from 'antd-mobile';
import { DatePicker, List } from 'antd-mobile';
import Public from './_cpts_/index';

const ScreenCarInfoEnter = observer((props: any) => {
  const {
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
  } = useViewModel(props);

  const { globalState } = useStores();
  return (
    <div className="screen-car-info-enter">
      <div className="vehicle-information">
        <Public tagging={true} title={'车牌号码：'}>
          <input
            type="text"
            placeholder="请输入"
            className="license-plate"
            value={globalState.carModel.carNumber}
            onInput={(e: any) => setCarNumber(e.target.value)}
          />
        </Public>

        <Public tagging={true} title={'品牌型号：'}>
          <input
            type="text"
            placeholder="请选择"
            defaultValue={
              globalState.carModel.selctModel &&
              `${globalState.carModel.selctModel.fullName}`
            }
            readOnly={true}
            onClick={() => {
              goModel();
            }}
          />
          <span className="arrow-right"></span>
        </Public>
        <div className="line">
          <span className="justify-space-between">
            <span className="Tips">{'*'}</span>
            <span className="left-and-right-layout">
              <span>车</span>
              <span>型：</span>
            </span>
          </span>
          <div
            className={`car-type ${
              globalState.carType.length ? 'have-data' : 'no-data'
            }`}
          >
            <Picker
              title=""
              extra="SUV/MVP/5座轿车"
              data={carType}
              cols={1}
              value={globalState.carType}
              onChange={(e: any) => {
                carTypeEvenet(e);
              }}
            >
              <List.Item></List.Item>
            </Picker>
          </div>
          <span className="arrow-right arrow-right-model"></span>
        </div>

        <div className="line title">
          <span>其他信息</span>
          <span
            className={showOrNot ? 'showsapn' : 'hidespan'}
            onClick={() => foldEvent()}
          ></span>
        </div>
        {showOrNot && (
          <div className="other-information">
            <Public tagging={false} title={'注册日期：'}>
              <div
                className={`registration-time ${
                  globalState.carModel.registrationDate
                    ? 'have-data'
                    : 'no-data'
                }`}
              >
                <DatePicker
                  maxDate={new Date()}
                  mode="date"
                  extra="请选择"
                  value={globalState.carModel.registrationDate}
                  onChange={(e: any) => registrationDate(e)}
                >
                  <List.Item></List.Item>
                </DatePicker>
              </div>
              <span className="arrow-right"></span>
            </Public>

            <Public tagging={false} title={'车 架  号：'}>
              <input
                type="text"
                placeholder="请输入"
                value={globalState.carModel.VIN}
                onChange={(e) => setVIN(e.target.value)}
              />
            </Public>

            <Public tagging={false} title={'发动机号：'}>
              <input
                type="text"
                placeholder="请输入"
                value={globalState.carModel.engine}
                onChange={(e) => setEngine(e.target.value)}
              />
            </Public>
          </div>
        )}
      </div>

      <div
        className={`preservation ${
          globalState.carModel.carNumber ||
          globalState.carModel.selctModel ||
          globalState.carModel.registrationDate ||
          globalState.carModel.registrationDate ||
          globalState.carType.length ||
          globalState.carModel.VIN ||
          globalState.carModel.engine
            ? 'Highlight'
            : 'ash-setting'
        }`}
        onClick={() => submit()}
      >
        保存
      </div>

      <div className="me-car" onClick={carList}>
        我的爱车<span className="arrow-right"></span>
      </div>
    </div>
  );
});

export default ScreenCarInfoEnter;
