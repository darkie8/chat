import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'chatpipe'
})
export class ChatpipePipe implements PipeTransform {

  transform(value: string, character?: string): string {
    return value.replace(character, '');
  }

}
