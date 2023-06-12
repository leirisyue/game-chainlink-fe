import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'separator'
})
export class SeparatorPipe implements PipeTransform {
  transform(value: number): string | number{
    try {
      return isNaN(value) ? value : value.toLocaleString()
    } catch (error) { }
  }
}
