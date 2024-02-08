import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'gasolineFormatter',
  standalone: true
})
export class GasolineFormatterPipe implements PipeTransform {

  transform(gasolineType: string | null| undefined, data?: any, args?: string): string | Number {
    switch(args) {
      case 'getPrice':
        return this.getPrice(data, gasolineType);
      default:
        return this.formatGasolineType(gasolineType);
    }
  }

  getPrice(data: any, gasolineType: string | null| undefined): Number {
    return data[`${gasolineType}_prix`];
  }

  formatGasolineType(gasolineType: string | null| undefined): string {
    switch(gasolineType) {
      case "sp95":
        return "Super 95";
      case "e10":
        return "Super 95 (E10)";
      case "sp98":
        return "Super 98";
      case "gazole":
        return "Gazole";
      case "gplc":
        return "GPL";
      default:
        return "";
    }
  }
}
