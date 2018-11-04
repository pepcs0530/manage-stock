import { Pipe, PipeTransform } from '@angular/core';
import { addComma } from '@shared/utils/add-comma';
import { removeComma } from '@shared/utils/remove-comma';

@Pipe({ name: 'thaiBathCurrencyPipe' })
export class ThaiBathCurrencyPipe implements PipeTransform {
  /* transform(value: number): string {
    const format = removeComma(value.toString());
    return parseFloat(format)
      .toFixed(2)
      .replace(/\d(?=(\d{3})+\.)/g, '$&,');
  } */
  transform(value) {
    return addComma(removeComma(value));
  }
}
