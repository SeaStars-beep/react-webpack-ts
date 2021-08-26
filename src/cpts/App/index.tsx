import React, { useEffect, lazy, Suspense } from 'react';
import { observer } from 'mobx-react';
import {
  HashRouter as Router,
  Switch,
  Route,
  useLocation,
} from 'react-router-dom';
import './index.less';

import useViewModel from './view.model';
// import ScreenHome from '@src/cpts/screens/ScreenHome';
// import ScreenStoreSearch from '@src/cpts/screens/ScreenStoreSearch';
// import ScreenMyCar from '@src/cpts/screens/ScreenMyCar';
// import ScreenCarInfoEnter from '@src/cpts/screens/ScreenCarInfoEnter';
// import ScreenModelSelect from '@src/cpts/screens/ScreenModelSelect';

const ScreenHome = lazy(() => import('@src/cpts/screens/ScreenHome/Screen'));
const ScreenStoreSearch = lazy(
  () => import('@src/cpts/screens/ScreenStoreSearch/Screen')
);
const ScreenMyCar = lazy(() => import('@src/cpts/screens/ScreenMyCar/Screen'));
const ScreenCarInfoEnter = lazy(
  () => import('@src/cpts/screens/ScreenCarInfoEnter/Screen')
);
const ScreenModelSelect = lazy(
  () => import('@src/cpts/screens/ScreenModelSelect/Screen')
);

export const rounters = [
  {
    component: ScreenHome,
    path: '/',
    title: '车生活',
  },
  {
    component: ScreenCarInfoEnter,
    path: '/car-center',
    title: '我的爱车',
  },
  {
    component: ScreenModelSelect,
    path: '/model-select',
    title: '我的爱车',
  },
  {
    component: ScreenStoreSearch,
    path: '/store-search',
    title: '车主服务',
  },
  {
    component: ScreenMyCar,
    path: '/my-car',
    title: '我的爱车',
  },
];

export const App = observer(() => {
  const { loading } = useViewModel();
  /**
   *
   * @returns Route   路由守卫
   */
  const RouteGuard = () => {
    const location = useLocation();
    const { pathname } = location;
    useEffect(() => {
      const curPage = rounters.find((o) => pathname === o?.path);
      if (curPage) document.title = curPage.title;
    }, [pathname]);
    return (
      <>
        {rounters?.map((route) => {
          return (
            <Route
              key={route.path}
              component={route?.component}
              path={route.path}
              exact
            />
          );
        })}
      </>
    );
  };
  /**
   * loading
   */
  const Loading = (
    <div className="spinner">
      <div className="rect1"></div>
      <div className="rect2"></div>
      <div className="rect3"></div>
      <div className="rect4"></div>
      <div className="rect5"></div>
    </div>
  );
  return (
    <Suspense fallback={Loading}>
      <Router>
        <Switch>
          <RouteGuard />
        </Switch>
      </Router>
    </Suspense>
  );
});
