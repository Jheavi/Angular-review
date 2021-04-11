import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'firstupper'
})
export class FirstupperPipe implements PipeTransform {

  transform(value: string): string {
    return value.slice(0, 1).toLocaleUpperCase() + value.slice(1).toLocaleLowerCase();
  }

}
