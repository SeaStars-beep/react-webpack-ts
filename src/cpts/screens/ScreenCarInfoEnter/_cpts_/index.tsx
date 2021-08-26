import React from 'react';

const Public = (props: any) => {
  return (
    <div className="line">
      <span className={props.tagging ? '' : 'other-span'}>
        <span className="Tips">{props.tagging ? '*' : ''}</span>
        {props.title}
      </span>
      {props.children}
    </div>
  );
};

export default Public;
