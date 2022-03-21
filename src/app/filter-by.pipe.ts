import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterBy'
})
export class FilterByPipe implements PipeTransform {

  // @ts-ignore
  transform(objects: any[], filterWord: string): any[] {
    if(objects) {
      return objects.filter(object => {
        return object.room_id === filterWord;
      });
    }
  }

}
