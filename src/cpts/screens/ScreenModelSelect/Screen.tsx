import React from 'react';
import './index.less';
import useViewModel from './view.model';
import BrandSelect from './_cpts_/BrandSelect';
import SeriesSelect from './_cpts_/SeriesSelect';
import ModelSelect from './_cpts_/ModelSelect';

const ScreenModelSelect = () => {
  const {
    CarComponent,
    curComponent,
    LETTERS,
    handleScrollInto,
    oftenList,
    allList,
    handleBrandClick,
    seriesList,
    handleSeriesClick,
    modelList,
    handleModelClick,
    handleSearch,
    setCurComponent,
  } = useViewModel();

  return (
    <div className="screen-car-model-select">
      {CarComponent.brand === curComponent && (
        <BrandSelect
          LETTERS={LETTERS}
          handleScrollInto={handleScrollInto}
          oftenList={oftenList}
          allList={allList}
          handleBrandClick={handleBrandClick}
          handleSearch={handleSearch}
        />
      )}
      {CarComponent.series === curComponent && (
        <SeriesSelect
          seriesList={seriesList}
          handleSeriesClick={handleSeriesClick}
          setCurComponent={setCurComponent}
        />
      )}
      {CarComponent.model === curComponent && (
        <ModelSelect
          modelList={modelList}
          handleModelClick={handleModelClick}
          setCurComponent={setCurComponent}
        />
      )}
    </div>
  );
};

export default ScreenModelSelect;
