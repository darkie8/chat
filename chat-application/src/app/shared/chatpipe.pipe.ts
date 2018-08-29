import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'chatpipe'
})
export class ChatpipePipe implements PipeTransform {

  transform(value: any, args?: any): any {
    return null;
  }

}
