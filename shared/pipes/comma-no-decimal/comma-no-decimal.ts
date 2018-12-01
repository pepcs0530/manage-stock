import { Pipe, PipeTransform } from '@angular/core';
import { removeComma } from '@shared/utils/remove-comma';
import { formatNumber } from '@angular/common';

@Pipe({ name: 'commaNoDecimalPipe' })
export class CommaNoDecimalPipe implements PipeTransform {
  transform(value) {
    if (value) {
      return formatNumber(parseFloat(removeComma(value)), 'en', '1.');
    } else {
      return null;
    }
  }
}
