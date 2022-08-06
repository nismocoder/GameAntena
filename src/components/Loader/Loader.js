import * as React from "react";

import "./Loader.css";

function Loader({ className, style = {} }) {
  return (
    <div className={`loader-wrapper ${className}`}>
      <div className="lds-ripple" style={style}>
        <div />
        <div />
      </div>
    </div>
  );
}

export default Loader;
