import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'timeFormat',
  standalone: true
})
export class TimeFormatPipe implements PipeTransform {
  transform(segundosTotales: number): string {
    if (!segundosTotales || isNaN(segundosTotales)) return '00:00';
    const minutos = Math.floor(segundosTotales / 60);
    const segundos = Math.floor(segundosTotales % 60);
    return `${minutos.toString().padStart(2, '0')}:${segundos.toString().padStart(2, '0')}`;
  }
}