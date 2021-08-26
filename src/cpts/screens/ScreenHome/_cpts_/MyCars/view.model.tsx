import { useHistory } from 'react-router-dom';
import { Props } from './index';
import { useStores } from '@src/store';
import { API_STORE } from '@src/entites/index';

const useViewModel = (props: Props) => {
  const { callback, data } = props;
  const { globalState } = useStores();
  const history = useHistory();
  const handleClick = (data: API_STORE.ResBindCar) => {
    if (callback) {
      callback(data);
    }
    const {
      id,
      carNumber,
      fullName,
      carId,
      carType,
      registerDate,
      frameNumber,
      engineNumber,
    } = data;
    globalState.carModel = {
      carNumber,
      selctModel: {
        fullName,
        id: carId,
      },

      registrationDate: registerDate
        ? new Date(registerDate.substr(0, 10))
        : '',
      VIN: frameNumber,
      engine: engineNumber,
      vehicleUpdateId: id,
    };
    globalState.carType = [carType];
    history.push({
      pathname: '/car-center',
    });
  };
  const handleAddClick = () => {
    history.push({
      pathname: '/car-center',
    });
  };
  return {
    handleClick,
    handleAddClick,
    data,
  };
};

export default useViewModel;
