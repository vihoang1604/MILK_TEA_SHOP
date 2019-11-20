export const NumberFormat = (data) => {
  var number = new Intl.NumberFormat();
  return number.format(data);
}

