import { Pipe, PipeTransform } from '@angular/core';
import { searchPerson } from 'src/app/core/model/dropdow-searchperson/dropdown-search-person.model';

@Pipe({
  name: 'filterListPerson'
})
export class FilterListPersonPipe implements PipeTransform {

  transform(
    value: any,
    search: string
  ) : any{

    // return empty array if array is falsy
    if (!value) { return []; }

    // return the original array if search text is empty
    if (!search) { return value; }

    if (value && value.length > 0) {
      const regexp = new RegExp(search, 'i');
      const properties = Object.keys(value[0]);
      return [
        ...value.filter((item: any) => {          
          return properties.some((property) => regexp.test(item['name']));
        }),
      ];
    }
  }

}
