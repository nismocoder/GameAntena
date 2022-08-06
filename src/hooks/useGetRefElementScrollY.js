import * as React from "react";

const useGetRefElementScrollY = (ref) => {
  const [scrollY, setScrollY] = React.useState(0);
  const [element, setElement] = React.useState(null);

  const listenToScroll = (el = "") => {
    setScrollY(el.scrollTop);
  };

  React.useEffect(() => {
    if (ref && ref.current) {
      ref.current.addEventListener("scroll", () => listenToScroll(ref.current));
      setElement(ref.current);
    }
  }, [ref]);

  return { scrollY, element };
};

export default useGetRefElementScrollY;
