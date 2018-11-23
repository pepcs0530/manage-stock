const padNumber = num => (num > 9 ? num : `0${num}`);
export function dateToStrYYYYMMDD(input: Date): string {
  if (input) {
    const d = input instanceof Date ? input : new Date(input);
    /*  return `${padNumber(d.getDate())}/${padNumber(
      d.getMonth() + 1
    )}/${d.getFullYear()}`; */
    return `${d.getFullYear()}${padNumber(d.getMonth() + 1)}${padNumber(
      d.getDate()
    )}`;
  } else {
    return null;
  }
}
