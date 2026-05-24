# 🎵 Reproductor de Audio Minimalista - Angular Zen

Un reproductor de audio y podcasts web moderno, minimalista y responsivo construido desde cero con **Angular**. El proyecto destaca por implementar las últimas características del framework (componentes standalone, control flow y Signals) combinadas con una experiencia de usuario premium enfocada en la persistencia de datos.

<img width="314" height="581" alt="Captura de pantalla 2026-05-24 103305" src="https://github.com/user-attachments/assets/8d04915d-a281-4326-9faa-f2c6131646de" />
<img width="314" height="577" alt="Captura de pantalla 2026-05-24 103358" src="https://github.com/user-attachments/assets/0c5282ca-ff58-4f90-bb97-2ddb7e21b36c" />
<img width="294" height="574" alt="image" src="https://github.com/user-attachments/assets/cd008c57-0ab6-4370-9f50-1e2069e1e5d9" />

---

## ✨ Características Clave

* **Arquitectura Moderna de Angular:** Implementación 100% libre de `NgModules` utilizando componentes **Standalone**.
* **Gestión de Estado con Angular Signals:** Reactividad nativa, eficiente y de última generación para sincronizar el motor de audio y la interfaz gráfica sin sobrecargar el DOM.
* **Diseño Premium (Glassmorphic Dark Mode):** Interfaz fluida con efecto de vidrio esmerilado, animaciones de pulso y barras de progreso dinámicas optimizadas ópticamente (`tabular-nums`).
* **Persistencia de Progreso (UX Avanzada):** Utiliza `localStorage` para recordar de forma automática la última pista seleccionada y el segundo exacto donde se quedó el usuario al cerrar o refrescar el navegador.
* **Playlist Interactiva e Inyección Externa:** Permite navegar dinámicamente entre episodios incorporados o añadir tus propios archivos `.mp3` mediante URLs externas en tiempo real.
* **Pipes Personalizados:** Transformación limpia de datos en la vista a través de un filtro nativo que convierte segundos brutos a formato de tiempo humano (`MM:SS`).

---

## 🛠️ Tecnologías y Conceptos Demostrados

* **Framework:** Angular (v17+)
* **Reactividad:** Angular Signals (`signal`, `set`)
* **Estructuras de Control:** Nuevo Angular Control Flow (`@for`, `@if`)
* **APIs del Navegador:** HTML5 Audio Event Listeners (`timeupdate`, `loadedmetadata`, `ended`) y `Web Storage API` (`localStorage`)
* **Estilos:** CSS3 Avanzado (Variables nativas, pseudo-elementos para sliders personalizados y Flexbox)

---

## 🚀 Instalación y Despliegue Local

Sigue estos pasos para ejecutar el reproductor en tu entorno de desarrollo local:

### Prerequisites
Asegúrate de tener instalado [Node.js](https://nodejs.org/) en tu máquina.

1. **Clonar el repositorio:**
   ```bash
   git clone [https://github.com/rocaa8035-jpg/Reproductor-Zen.git](https://github.com/rocaa8035-jpg/Reproductor-Zen.git)
   cd reproductor-zen
   ```
2. **Instalar el Angular CLI (si no lo tienes instalado de forma global):**

```Bash
npm install -g @angular/cli
```
3. **Instalar las dependencias del proyecto:**

```Bash
npm install
```
4. **Iniciar el servidor de desarrollo:**

```Bash
ng serve
```
5. **Abrir la aplicación:**
Navega en tu navegador web a la dirección http://localhost:4200/.

## 📁 Estructura de Archivos Clave
El core lógico de la aplicación se distribuye de manera modular:

* **src/app/audio.service.ts:** El cerebro del sistema. Instancia el motor de audio nativo, escucha sus eventos y expone los estados globales reactivos mediante Signals.

* **src/app/time-format.pipe.ts:** Pipe standalone encargado de traducir los segundos del reproductor a formato de lectura cronometrada.

* **src/app/app.component.ts/.html/.css:** Componente raíz inteligente que unifica la vista del reproductor, el formulario de inserción externa y la grilla de la lista de reproducción.

## ✒️ Autor
Angelo Jair Roldan Roca - [LinkedIn](www.linkedin.com/in/angelo-jair-roldan-roca)

Proyecto desarrollado con fines prácticos para demostrar competencias sólidas en el ecosistema moderno de Angular.
