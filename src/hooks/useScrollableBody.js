import * as React from "react";

const useScrollableBody = () => {
  React.useEffect(() => {
    document.body.style.overflow = "auto";

    return () => {
      document.body.style.overflow = "hidden";
      window.scrollTo({ top: 0 });
    };
  }, []);
};

export default useScrollableBody;
