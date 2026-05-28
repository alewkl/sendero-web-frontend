import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-supervivencia',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './supervivencia.component.html',
  styleUrl: './supervivencia.component.scss'
})
export class SupervivenciaComponent {
  pillars = [
    {
      num: '01', icon: '🧠', title: 'Actitud Mental',
      desc: 'El factor psicológico es el más determinante. El pánico mata más que el frío.',
      tips: ['Controlá la respiración', 'Establecé prioridades', 'Actuá con calma y determinación']
    },
    {
      num: '02', icon: '🔥', title: 'Fuego',
      desc: 'Calor, luz, señal y moral. El fuego es la herramienta más poderosa en el campo.',
      tips: ['Siempre llevá encendedor de respaldo', 'Practicá métodos alternativos', 'Protegé el fuego del viento y la humedad']
    },
    {
      num: '03', icon: '🏕️', title: 'Refugio',
      desc: 'La hipotermia puede matarte en horas. El refugio es la prioridad ante el frío o la lluvia.',
      tips: ['Buscá o construí antes de que oscurezca', 'Aislate del suelo, no solo del viento', 'Pequeño = más caliente']
    },
    {
      num: '04', icon: '💧', title: 'Agua',
      desc: 'Sin agua el cuerpo falla en días. Aprendé a encontrarla, obtenerla y purificarla.',
      tips: ['Nunca bebas agua sin tratar en campo', 'Hervirla es el método más seguro', 'Seguí el terreno hacia abajo para encontrar agua']
    }
  ];

  ruleOfThree = [
    { time: '3 minutos', label: 'aire (o sangrado grave)' },
    { time: '3 horas', label: 'frío extremo (hipotermia)' },
    { time: '3 días', label: 'agua' },
    { time: '3 semanas', label: 'comida' },
  ];

  fireMethods = [
    {
      name: 'Encendedor / Fósforos',
      level: 'easy', levelLabel: 'Básico',
      desc: 'Siempre el primer recurso. Llevá dos encendedores en lugares distintos y fósforos impermeables.'
    },
    {
      name: 'Pedernal y Eslabón',
      level: 'medium', levelLabel: 'Intermedio',
      desc: 'Confiable en humedad. No requiere combustible. Funciona incluso mojado con práctica.'
    },
    {
      name: 'Arco y Taladro (Fricción)',
      level: 'hard', levelLabel: 'Avanzado',
      desc: 'Método primitivo de alta eficiencia cuando se domina. Requiere materiales secos y práctica constante.'
    },
    {
      name: 'Lupa / Espejo Solar',
      level: 'medium', levelLabel: 'Situacional',
      desc: 'Efectivo solo con sol directo. Ideal como complemento. También sirve para señalización.'
    },
  ];
}
