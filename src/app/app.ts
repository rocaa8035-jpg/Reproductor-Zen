import { Component, inject, OnInit } from '@angular/core';
import { AudioService } from './audio';
import { TimeFormatPipe } from './time-format-pipe';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [TimeFormatPipe],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class AppComponent implements OnInit {
  audioService = inject(AudioService);

  // Enlazamos las variables para usarlas cómodamente en el HTML
  playlist = this.audioService.playlist;
  cancionActual = this.audioService.cancionActual;
  isPlaying = this.audioService.isPlaying;
  currentTime = this.audioService.currentTime;
  duration = this.audioService.duration;

  ngOnInit() {
    // Dejamos que el servicio decida qué pista cargar (la guardada o la primera)
    this.audioService.inicializarReproductor();
  }

  alArrastrarBarra(evento: Event) {
    const elementoHtml = evento.target as HTMLInputElement;
    this.audioService.cambiarSegundo(Number(elementoHtml.value));
  }
  // Puente entre el formulario HTML y el servicio
  onAgregarTrack(tituloInput: HTMLInputElement, urlInput: HTMLInputElement) {
    this.audioService.agregarCancionPorUrl(tituloInput.value, urlInput.value);
    
    // Limpiamos los cuadros de texto para que queden listos para otra canción
    tituloInput.value = '';
    urlInput.value = '';
  }
}
