import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  sections = [
    {
      icon: '🔥',
      title: 'Supervivencia',
      desc: 'Técnicas esenciales para sobrevivir en la naturaleza: fuego, refugio, agua y señalización.',
      path: '/supervivencia',
      wip: false
    },
    {
      icon: '⛺',
      title: 'Campismo',
      desc: 'Todo sobre acampar: elección del sitio, armado de carpas, organización del campamento.',
      path: '/campismo',
      wip: true
    },
    {
      icon: '🧭',
      title: 'Navegación',
      desc: 'Orientación con mapa y brújula, lectura del terreno y técnicas de navegación nocturna.',
      path: '/navegacion',
      wip: true
    },
    {
      icon: '🪢',
      title: 'Nudos y Amarres',
      desc: 'Biblioteca de nudos, gazas, amarres y aplicaciones prácticas en el campo.',
      path: '/nudos',
      wip: true
    },
    {
      icon: '🩹',
      title: 'Primeros Auxilios',
      desc: 'Protocolos básicos de atención, manejo de heridas, fracturas y emergencias en el campo.',
      path: '/primeros-auxilios',
      wip: true
    },
    {
      icon: '🍳',
      title: 'Cocina y Fogón',
      desc: 'Recetas y técnicas de cocción al aire libre con lo mínimo y máximo sabor.',
      path: '/cocina',
      wip: true
    }
  ];

  skills = [
    { icon: '🌿', label: 'Botánica silvestre' },
    { icon: '⭐', label: 'Astronomía básica' },
    { icon: '🪵', label: 'Tallado de madera' },
    { icon: '🐾', label: 'Rastreo animal' },
    { icon: '🌧️', label: 'Lectura del tiempo' },
    { icon: '🏕️', label: 'Vida al aire libre' },
  ];
}
