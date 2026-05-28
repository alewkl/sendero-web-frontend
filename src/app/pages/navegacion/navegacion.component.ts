import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navegacion',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './navegacion.component.html',
  styleUrl: './navegacion.component.scss'
})
export class NavegacionComponent {

  compassParts = [
    { name: 'Aguja magnética', desc: 'Siempre apunta al norte magnético. El extremo rojo es el norte.' },
    { name: 'Cápsula líquida', desc: 'Amortigua el movimiento de la aguja para lecturas más rápidas y precisas.' },
    { name: 'Limbo graduado', desc: 'Disco de 0° a 360° que gira para configurar rumbos.' },
    { name: 'Líneas de orientación', desc: 'Líneas en la base de la cápsula que se alinean con los meridianos del mapa.' },
    { name: 'Flecha de dirección', desc: 'Marcada en la base; indica hacia dónde moverse una vez configurado el rumbo.' },
    { name: 'Regla de escala', desc: 'Permite medir distancias directamente sobre el mapa.' },
  ];

  azimuthSteps = [
    { num: '01', title: 'Apuntar al objetivo', desc: 'Sostené la brújula a la altura del pecho, nivelada. Apuntá la flecha de dirección hacia el punto al que querés ir.' },
    { num: '02', title: 'Girar el limbo', desc: 'Rotá el limbo hasta que las líneas de orientación queden paralelas a los meridianos del mapa, con el "N" del limbo hacia el norte del mapa.' },
    { num: '03', title: 'Leer el azimut', desc: 'El número que queda bajo la línea índice es tu azimut. Anotalo.' },
    { num: '04', title: 'Seguir el rumbo', desc: 'Sosteniendo la brújula, girá tu cuerpo hasta que la aguja roja coincida con la flecha de orientación. La flecha de dirección marca tu camino.' },
  ];

  mapConcepts = [
    { icon: '〰️', title: 'Curvas de nivel', desc: 'Líneas que unen puntos de igual altitud. Cuanto más juntas, más empinado el terreno.' },
    { icon: '📏', title: 'Escala', desc: 'Relación entre la distancia en el mapa y la real. 1:25.000 significa 1 cm = 250 m en terreno.' },
    { icon: '🔺', title: 'Curva maestra', desc: 'Cada quinta curva se dibuja más gruesa y suele tener su cota indicada.' },
    { icon: '🏔️', title: 'Cimas y valles', desc: 'En una cima las curvas son círculos concéntricos. En un valle apuntan hacia la parte alta.' },
    { icon: '🔵', title: 'Hidrografía', desc: 'Ríos, lagos y humedales en azul. Seguir el agua cuesta abajo siempre lleva a zonas habitadas.' },
    { icon: '🟩', title: 'Vegetación', desc: 'Verde para bosque, blanco para terreno abierto en mapas militares y topográficos estándar.' },
  ];

  naturalMethods = [
    {
      title: 'El sol',
      icon: '☀️',
      desc: 'Sale aproximadamente por el este y se pone por el oeste. Al mediodía (solar) está al norte en el hemisferio sur. Con un reloj analógico: apuntá el 12 al sol — la bisectriz entre el 12 y la hora local marca el norte.'
    },
    {
      title: 'Las estrellas',
      icon: '⭐',
      desc: 'En el hemisferio sur, la Cruz del Sur apunta al polo sur celeste. Extendé el eje mayor de la Cruz 4,5 veces: ese punto en el horizonte es el sur geográfico.'
    },
    {
      title: 'La vegetación',
      icon: '🌿',
      desc: 'El musgo crece preferentemente en el lado sur de los troncos (menos sol). Las ramas de los árboles suelen ser más densas hacia el norte. Son indicadores aproximados, no exactos.'
    },
    {
      title: 'Hormigueros y termiteros',
      icon: '🐜',
      desc: 'En el hemisferio sur los termiteros suelen orientar su cara mayor hacia el norte para aprovechar el calor solar. Útil como referencia secundaria.'
    },
  ];

  errors = [
    { label: 'Declinación magnética', desc: 'El norte magnético no coincide con el norte geográfico. La diferencia (declinación) varía según la zona y el año. Siempre corregila.' },
    { label: 'No verificar el mapa', desc: 'Un mapa desactualizado puede mostrar caminos, puentes o refugios que ya no existen. Verificá la fecha de edición.' },
    { label: 'Solo mirar la brújula', desc: 'La navegación es continua: tomá el rumbo, buscá un punto de referencia lejano en esa dirección y avanzá hacia él sin mirar la brújula.' },
    { label: 'Ignorar el terreno', desc: 'El mapa muestra el terreno ideal. En campo hay vegetación densa, barrancos y agua. Aprendé a rodear obstáculos manteniendo el rumbo general.' },
  ];
}
