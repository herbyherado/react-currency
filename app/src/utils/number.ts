import Big from 'big.js';

export function times(base: string, value: number) {
  Big.PE = 100;
  let result = Big(base)
    .times(value)
    .toString();
  return thousandSeparator(result);
}

function thousandSeparator(str: string) {
  str += '';
  let x = str.split('.');
  let x1 = x[0];
  let x2 = x.length > 1 ? '.' + x[1] : '';
  var regex = /(\d+)(\d{3})/;
  while (regex.test(x1)) {
    x1 = x1.replace(regex, '$1' + ',' + '$2');
  }
  return x1 + x2;
}
