import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'thousandSeparator'
})
export class ThousandSeparatorPipe implements PipeTransform {

  transform(value: number): string {    // koostasime selle ise
    return value.toLocaleString("fi", {minimumFractionDigits: 2, maximumFractionDigits: 2}).replace(",",".") + " €";
  }

}
