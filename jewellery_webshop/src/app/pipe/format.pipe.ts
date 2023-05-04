import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'format'
})
export class FormatPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return (value === null || value === undefined || value ===" ") ? '-' : value + " FT"; 
  }

}
