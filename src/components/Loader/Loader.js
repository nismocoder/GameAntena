import React from 'react';

import './Loader.css';

const Loader = ({ className, style = {} }) => (
  <div className={`loader-wrapper ${className}`}>
    <div className='lds-ripple' style={style}><div></div><div></div></div>
  </div>
);


export default Loader;
