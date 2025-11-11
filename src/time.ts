function padNumber(value: number, padding: number): string {
  let ret = value.toString();
  if (ret.length < padding) {
    ret = "0".repeat(padding - ret.length) + ret;
  }
  return ret;
}
export function timeToString(date: Date): string {
  const day = padNumber(date.getDate(), 2);
  const month = padNumber(date.getMonth(), 2);
  const year = padNumber(date.getFullYear(), 4);
  const hour = padNumber(date.getHours(), 2);
  const minute = padNumber(date.getMinutes(), 2);
  const second = padNumber(date.getSeconds(), 2);
  return `${hour}:${minute}:${second} - ${day}.${month}.${year}`;
}
