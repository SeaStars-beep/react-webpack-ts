import './global.less';
import 'antd-mobile/dist/antd-mobile.css';
import VConsole from 'vconsole';

import React from 'react';
import ReactDOM from 'react-dom';
import { App } from './cpts/App';

import customParseFormat from 'dayjs/plugin/customParseFormat';
import dayjs from 'dayjs';

dayjs.extend(customParseFormat);

if (window.location.href.indexOf('.dev') > -1) {
  const vconsole = new VConsole();
  console.log('__vconsole_start__');
}

ReactDOM.render(<App />, document.getElementById('app'));
