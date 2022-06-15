export const numberFormatter = (number) => {
  if (number > 999 && number < 1000000) {
    return (number / 1000).toFixed(1) + 'K'; // convert to K for number from > 1000 < 1 million
  } else if (number > 1000000) {
    return (number / 1000000).toFixed(1) + 'M'; // convert to M for number from > 1 million
  } else if (number < 900) {
    return number; // if value < 1000, nothing to do
  }
};
