import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { QuizComponent } from '../quiz/quiz.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, QuizComponent],
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
      wip: false
    },
    {
      icon: '🧭',
      title: 'Navegación',
      desc: 'Orientación con mapa y brújula, lectura del terreno y técnicas de navegación nocturna.',
      path: '/navegacion',
      wip: false
    },
    {
      icon: '🪢',
      title: 'Nudos y Amarres',
      desc: 'Biblioteca de nudos, gazas, amarres y aplicaciones prácticas en el campo.',
      path: '/nudos',
      wip: false
    },
    {
      icon: '🩹',
      title: 'Primeros Auxilios',
      desc: 'Protocolos básicos de atención, manejo de heridas, fracturas y emergencias en el campo.',
      path: '/primeros-auxilios',
      wip: false
    },
    {
      icon: '🍳',
      title: 'Cocina al Fuego',
      desc: 'Recetas y técnicas de cocción al aire libre con lo mínimo y máximo sabor.',
      path: '/cocina',
      wip: false
    },
    {
      icon: '🌿',
      title: 'Botánica y Meteorología',
      desc: 'Plantas silvestres y lectura del tiempo. Disponibles como sub-secciones dentro de Supervivencia.',
      path: '/supervivencia',
      wip: false
    }
  ];

  skills = [
    { icon: '⭐', label: 'Astronomía básica' },
    { icon: '🪵', label: 'Tallado de madera' },
    { icon: '🐾', label: 'Rastreo animal' },
    { icon: '🌧️', label: 'Meteorología de campo' },
    { icon: '🏕️', label: 'Vida al aire libre' },
    { icon: '🎒', label: 'Checklist de mochila' },
  ];
}
