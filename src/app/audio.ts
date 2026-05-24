import { Injectable, signal } from '@angular/core';

// 1. Definimos el plano de cómo luce una canción
export interface Cancion {
  id: number;
  titulo: string;
  artista: string;
  url: string;
}

@Injectable({
  providedIn: 'root'
})
export class AudioService {
  private unAudioNativo = new Audio();

  // Signals para el estado del reproductor
  isPlaying = signal<boolean>(false);
  currentTime = signal<number>(0);
  duration = signal<number>(0);
  
  // Signal para saber qué canción está sonando ahora mismo
  cancionActual = signal<Cancion | null>(null);

  // Nuestra lista oficial de canciones (Playlist)
  playlist: Cancion[] = [
    {
      id: 1,
      titulo: 'Explorando el Cosmos',
      artista: 'Podcast de Ciencia',
      url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3'
    },
    {
      id: 2,
      titulo: 'El Futuro de la IA',
      artista: 'Tech Talks',
      url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3'
    },
    {
      id: 3,
      titulo: 'Aprender Angular en 2026',
      artista: 'Dev Academy',
      url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3'
    }
  ];

  private readonly STORAGE_KEY_TIME = 'reproductor_progreso_segundos';
  private readonly STORAGE_KEY_TRACK = 'reproductor_cancion_id';

  constructor() {
    this.unAudioNativo.addEventListener('timeupdate', () => {
      const tiempoActual = this.unAudioNativo.currentTime;
      this.currentTime.set(tiempoActual);
      localStorage.setItem(this.STORAGE_KEY_TIME, tiempoActual.toString());
    });

    this.unAudioNativo.addEventListener('loadedmetadata', () => {
      this.duration.set(this.unAudioNativo.duration);
      this.recuperarProgresoGuardado();
    });

    // Si la canción termina, reproduce automáticamente la siguiente
    this.unAudioNativo.addEventListener('ended', () => {
      this.siguiente();
    });
  }

  // hora cargamos una canción completa, no solo una URL de texto
  seleccionarCancion(cancion: Cancion, iniciarReproduccion: boolean = true) {
    this.cancionActual.set(cancion);
    this.unAudioNativo.src = cancion.url;
    this.unAudioNativo.load();
    
    // Guardamos el ID de la canción actual para recordarla al recargar
    localStorage.setItem(this.STORAGE_KEY_TRACK, cancion.id.toString());

    if (iniciarReproduccion) {
      this.reproducir();
    }
  }

  private recuperarProgresoGuardado() {
    const progresoGuardado = localStorage.getItem(this.STORAGE_KEY_TIME);
    if (progresoGuardado) {
      const segundos = Number(progresoGuardado);
      if (!isNaN(segundos) && segundos < this.unAudioNativo.duration) {
        this.unAudioNativo.currentTime = segundos;
        this.currentTime.set(segundos);
      }
    }
  }

  // Al encender la app, recuperamos la última canción que escuchaba el usuario
  inicializarReproductor() {
    const trackIdGuardado = localStorage.getItem(this.STORAGE_KEY_TRACK);
    
    if (trackIdGuardado) {
      const cancionEncontrada = this.playlist.find(c => c.id === Number(trackIdGuardado));
      if (cancionEncontrada) {
        // La cargamos pero sin darle PLAY automáticamente para no asustar al usuario
        this.seleccionarCancion(cancionEncontrada, false);
        return;
      }
    }
    
    // Si no había nada guardado, cargamos la primera por defecto
    this.seleccionarCancion(this.playlist[0], false);
  }

  reproducir() {
    this.unAudioNativo.play();
    this.isPlaying.set(true);
  }

  pausar() {
    this.unAudioNativo.pause();
    this.isPlaying.set(false);
  }

  cambiarSegundo(segundo: number) {
    this.unAudioNativo.currentTime = segundo;
    localStorage.setItem(this.STORAGE_KEY_TIME, segundo.toString());
  }

  // Lógica para avanzar de canción
  siguiente() {
    const actual = this.cancionActual();
    if (!actual) return;

    const indiceActual = this.playlist.findIndex(c => c.id === actual.id);
    // Si es la última canción, vuelve a la primera (bucle index % longitud)
    const siguienteIndice = (indiceActual + 1) % this.playlist.length;
    
    this.seleccionarCancion(this.playlist[siguienteIndice]);
  }

  // Lógica para retroceder de canción
  anterior() {
    const actual = this.cancionActual();
    if (!actual) return;

    const indiceActual = this.playlist.findIndex(c => c.id === actual.id);
    // Si es la primera, va a la última
    const anteriorIndice = (indiceActual - 1 + this.playlist.length) % this.playlist.length;
    
    this.seleccionarCancion(this.playlist[anteriorIndice]);
  }
  // Permite añadir un MP3 externo a la lista
  agregarCancionPorUrl(titulo: string, url: string) {
    // Si están vacíos, no hacemos nada
    if (!titulo.trim() || !url.trim()) return;

    // Creamos el nuevo objeto con un ID basado en el tiempo actual para que sea único
    const nuevaCancion: Cancion = {
      id: Date.now(), 
      titulo: titulo,
      artista: 'Enlace Externo',
      url: url
    };

    // La agregamos al principio de nuestra playlist para que el usuario la vea de inmediato
    this.playlist.unshift(nuevaCancion);

    // Automáticamente seleccionamos y reproducimos la canción que acaba de subir
    this.seleccionarCancion(nuevaCancion);
  }
}