import * as apis from './apis';
import * as mockApis from './mock';

const exportApis = process.env.MOCK_WX === 'true' ? mockApis : apis;
export default exportApis;
