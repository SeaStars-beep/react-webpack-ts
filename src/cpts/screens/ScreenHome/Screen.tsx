import React from 'react';
import { observer } from 'mobx-react';
import useViewModel from './view.model';
import MyCars from './_cpts_/MyCars';
import MicroApp from './_cpts_/MicroApps';
import FeatureSearch from './_cpts_/FeatureSearch';
import FilterTab from './_cpts_/FilterTab';
import Recommend from './_cpts_/Recommend';
import AdverBanner from './_cpts_/AdverBanner';
import Scroll from '@src/common-cpts/Scroll';
import './index.less';

const ScreenHome = () => {
  const {
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
  } = useViewModel();
  const storeStyle = {
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    marginBottom: 3,
  };
  return (
    <div className="screen-home" onScroll={handleScroll}>
      <div className="screen-home-top-wrap">
        <div className="my-cars-wrap">
          <MyCars data={bindCarData} />
        </div>
        {(advBanner || appsData || popularData) && (
          <div className="screen-home-active-wrap">
            <div className="screen-home-active">
              {advBanner && <AdverBanner data={advBanner} />}
              {appsData && (
                <div className="screen-micro-app-wrap">
                  <MicroApp data={appsData} />
                </div>
              )}
              {popularData && <Recommend data={popularData} />}
            </div>
          </div>
        )}
      </div>

      <div className="screen-home-wrap">
        <div className="feature-search-wrap">
          <FeatureSearch
            data={categoryList}
            callback={handleCategorySelect}
            extraCallback={handleToPage}
          />
        </div>
        <div className="store-content-wrap">
          <div className="filter-wrap">
            <FilterTab
              carTypeData={carTypeList}
              areaData={allAreas}
              areaCallback={handleCitySelect}
              statusCallback={handleStatusSelect}
              modelCallback={handleModelSelect}
              quailtyCallback={handleQualitySelect}
            />
          </div>
          <div className="home-store-list-wrap">
            <Scroll ref={childRef} storeStyle={storeStyle} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default observer(ScreenHome);
