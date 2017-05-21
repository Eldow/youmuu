import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
 name: 'orderByDate'
})
export class OrderByDate implements PipeTransform{

 transform(array: Array<string>, args: string): Array<string> {

  if(!array || array === undefined) return null;

    array.sort((a: any, b: any) => {
      if (a.updated < b.updated) {
        return 1;
      } else if (a.updated > b.updated) {
        return -1;
      } else {
        return 0;
      }
    });
    return array;
  }

}
