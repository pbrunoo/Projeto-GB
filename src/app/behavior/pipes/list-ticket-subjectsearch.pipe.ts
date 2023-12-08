import { Pipe, PipeTransform } from '@angular/core';
import { ListTicketModel } from 'src/app/core/model/ticket/ticket.model';

@Pipe({
  name: 'filterListTicket',
})
export class FilterListTicketPipe implements PipeTransform {
  transform(value: ListTicketModel[], search: string): any {
    if (value && value.length > 0) {
      if (!search) return value;
      if (!isNaN(Number(search)))
        return value.filter((item: any) => {
          console.log('item', item.status)
          return item.status === Number(search);
        });

      const regexp = new RegExp(search, 'i');
      const properties = Object.keys(value[0]);

      return value.filter((item: any) => {
        console.log(regexp, item.status, regexp.test(item['status']));
        return (
          properties.some((property) => regexp.test(item['subject'])) ||
          properties.some((property) => regexp.test(item['status']))
        );
      });
    }
  }
}
