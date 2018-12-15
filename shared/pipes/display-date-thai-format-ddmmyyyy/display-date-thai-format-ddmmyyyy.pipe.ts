import { Pipe, PipeTransform } from '@angular/core';

const padNumber = num => (num > 9 ? num : `0${num}`);
@Pipe({
  name: 'displayDateThaiFormatDDMMYYYY'
})
export class DisplayDateThaiFormatDDMMYYYYPipe implements PipeTransform {
  transform(value: string | number, args?: any) {
    // console.log('value-->', value);

    let date, month, beYear;
    if (!!value) {
      if (typeof value === 'number') {
        date = padNumber(new Date(value).getDate());
        month = padNumber(new Date(value).getMonth() + 1);
        beYear = new Date(value).getFullYear() + 543;
      } else {
        value = value.replace(/-/g, '');
        date = parseInt(value.substr(6, 2), 10);
        month = value.substr(4, 2);
        beYear = parseInt(value.substr(0, 4), 10) + 543;
      }
      return date + '/' + month + '/' + beYear;
    } else {
      return '';
    }
  }
}
