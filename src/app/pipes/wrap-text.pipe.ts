import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'wrapText'
})
export class WrapTextPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
