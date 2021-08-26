import React from 'react';

type Component = React.FunctionComponent<any> | React.ComponentClass<any, any>;
export interface ScreenConfig {
  Screen: Component;
}
