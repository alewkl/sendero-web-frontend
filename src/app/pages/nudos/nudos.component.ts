import { Component, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-nudos',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './nudos.component.html',
  styleUrl: './nudos.component.scss'
})
export class NudosComponent {

  activeCategory = signal('union');

  categories = [
    { id: 'union',   label: 'Unión',    icon: '🔗' },
    { id: 'amarre',  label: 'Amarre',   icon: '🪵' },
    { id: 'gaza',    label: 'Gazas',    icon: '🔵' },
    { id: 'rescate', label: 'Rescate',  icon: '🆘' },
  ];

  knots: Record<string, any[]> = {
    union: [
      {
        name: 'Nudo de rizo (cuadrado)',
        use: 'Unir dos cuerdas del mismo grosor',
        steps: ['Cruzá los cabos: izquierdo sobre derecho', 'Luego derecho sobre izquierdo', 'Apretá tirando de ambos extremos'],
        warning: 'No usar para cargas de rescate — puede zafarse con tensión lateral.',
        icon: '🔗'
      },
      {
        name: 'Nudo de pescador doble',
        use: 'Unir cuerdas de distinto diámetro o material resbaladizo',
        steps: ['Hacé un nudo de pescador simple con el primer cabo', 'Repetí con el segundo cabo', 'Deslizá ambos nudos hasta que queden juntos y apretá'],
        warning: null,
        icon: '🎣'
      },
      {
        name: 'Nudo de ocho doble (unión)',
        use: 'Unión de alta resistencia para actividades con carga',
        steps: ['Formá un seno con los dos cabos juntos', 'Hacé un ocho con la cuerda doble', 'Pasá los cabos a través del ocho y ajustá'],
        warning: null,
        icon: '8️⃣'
      },
    ],
    amarre: [
      {
        name: 'Amarre cuadrado',
        use: 'Unir dos palos en ángulo recto',
        steps: ['Iniciá con un nudo de vuelta de escota en un palo', 'Doblá cuatro veces alrededor de ambos palos', 'Tensá con dos vueltas entre los palos (friadas)', 'Terminá con dos medios cotes'],
        warning: null,
        icon: '➕'
      },
      {
        name: 'Amarre diagonal',
        use: 'Unir dos palos en ángulo oblicuo',
        steps: ['Igual al cuadrado pero las friadas siguen el ángulo de los palos', 'Las vueltas deben tensar en la dirección de la diagonal'],
        warning: 'Menos resistente que el cuadrado; usarlo solo cuando el ángulo lo requiere.',
        icon: '✖️'
      },
      {
        name: 'Vuelta de escota',
        use: 'Nudo base para iniciar y terminar amarres',
        steps: ['Pasá el cabo por detrás del palo', 'Cruzalo sobre sí mismo', 'Pasá el extremo bajo las dos vueltas y ajustá'],
        warning: null,
        icon: '🔄'
      },
    ],
    gaza: [
      {
        name: 'As de guía (bowline)',
        use: 'Gaza fija que no se corre; la más importante de todas',
        steps: ['Formá un pequeño círculo con la cuerda', 'Pasá el extremo por el círculo de abajo hacia arriba', 'Rodeá el seno principal y volvé a bajar por el círculo', 'Ajustá manteniendo el seno del tamaño deseado'],
        warning: null,
        icon: '⭕'
      },
      {
        name: 'Nudo de ocho en seno',
        use: 'Gaza de alta resistencia para escalada y rescate',
        steps: ['Doblá la cuerda formando un seno', 'Con el seno hacé un ocho completo', 'Pasá el seno por la argolla y ajustá'],
        warning: null,
        icon: '8️⃣'
      },
      {
        name: 'Presilla de alondra',
        use: 'Sujetar una cuerda a un soporte, poste o argolla',
        steps: ['Doblá la cuerda por la mitad', 'Pasá el seno por detrás del soporte', 'Abrí el seno y pasalo por encima del extremo', 'Ajustá tirando de los dos cabos'],
        warning: null,
        icon: '🔁'
      },
    ],
    rescate: [
      {
        name: 'Silla de bombero',
        use: 'Arnés de emergencia para evacuar una persona',
        steps: ['Hacé dos senos de igual tamaño en el centro de la cuerda', 'Cruzalos formando dos lazos', 'El rescatado pasa una pierna en cada lazo', 'Los dos extremos se atan al frente y se sujetan'],
        warning: 'Solo para emergencias. Un arnés técnico es siempre más seguro.',
        icon: '🧑‍🚒'
      },
      {
        name: 'Nudo mariposa alpino',
        use: 'Gaza en el centro de una cuerda para anclaje o punto de tracción',
        steps: ['Formá dos vueltas con la cuerda sobre la mano', 'Pasá la vuelta delantera por detrás de la trasera', 'Sacá la vuelta trasera por el frente formando un lazo', 'Ajustá tirando de los extremos'],
        warning: null,
        icon: '🦋'
      },
    ],
  };

  get activeKnots() {
    return this.knots[this.activeCategory()];
  }
}
