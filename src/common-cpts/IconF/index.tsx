import { Wrapper } from './styled';
import React from 'react';
import { IconFont } from '@src/common-cpts/IconF/meta';

export function IconF(props: {
  type: IconFont;
  className?: string;
}): JSX.Element {
  const { type: iconfontType, className } = props;
  return (
    <Wrapper
      className={`iconfont ${className || ''}`}
      dangerouslySetInnerHTML={{ __html: `&#x${iconfontType};` }}
    />
  );
}
