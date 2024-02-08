import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'scheduleFormatter',
  standalone: true,
})
export class ScheduleFormatterPipe implements PipeTransform {
  transform(jour: any): string {
    let horaires: string = 'Ouvert';

    if (jour.horaire != undefined && jour['@ferme'] === '1') {
      horaires =
        jour.horaire['@ouverture'] === jour.horaire['@fermeture']
          ? 'Ouvert 24/24'
          : `Ouvert de ${jour.horaire['@ouverture']} à ${jour.horaire['@fermeture']}`;
    }

    return `${jour['@nom']}: ${horaires}`;
  }
}
