import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'addressFormatter',
  standalone: true,
})
export class AddressFormatterPipe implements PipeTransform {
  transform(data: any): string {
    const regexp = /^(le|la|les|de|du|des|à|au)$/;

    const address = data.adresse
      .toLowerCase()
      .replace(/[,]/, '')
      .split(' ')
      .map((word: string) =>
        word.match(regexp) ? word : word.charAt(0).toUpperCase() + word.slice(1)
      )
      .join(' ');

    return address + ' - ' + data.cp + ' ' + data.ville.toUpperCase();
  }
}
