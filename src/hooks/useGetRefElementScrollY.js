import React from 'react';

const useGetRefElementScrollY = (ref) => {
  const [scrollY, setScrollY] = React.useState(0);
  const [element, setElement] = React.useState(null);

  React.useEffect(() => {
    if (ref && ref.current) {
      ref.current.addEventListener('scroll', () => listenToScroll(ref.current));
      setElement(ref.current);
    }
  }, [ref]);

  const listenToScroll = (element) => {
    setScrollY(element.scrollTop);
  };

  return { scrollY, element };
};

export default useGetRefElementScrollY;
