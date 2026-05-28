import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-primeros-auxilios',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './primeros-auxilios.component.html',
  styleUrl: './primeros-auxilios.component.scss'
})
export class PrimerosAuxiliosComponent {

  priorities = [
    { num: '01', icon: '🧠', title: 'Evaluá la escena', desc: 'Antes de tocar al herido, verificá que el entorno sea seguro para vos. Un segundo herido complica todo.' },
    { num: '02', icon: '📢', title: 'Pedí ayuda', desc: 'Gritá o enviá a alguien a buscar asistencia. Si hay radio o teléfono, úsalos antes de cualquier otra acción.' },
    { num: '03', icon: '🩸', title: 'Controlá el sangrado', desc: 'La hemorragia severa mata en minutos. Es la primera prioridad física antes que cualquier otra lesión.' },
    { num: '04', icon: '🫁', title: 'Verificá la vía aérea', desc: 'Persona inconsciente: incliná la cabeza y elevá el mentón. Si no respira, iniciá RCP.' },
    { num: '05', icon: '🌡️', title: 'Prevenís el shock', desc: 'Abrigá al herido, elevá las piernas (si no hay lesión espinal), hablale constantemente para mantenerlo consciente.' },
  ];

  emergencies = [
    {
      title: 'Hemorragia',
      icon: '🩸',
      color: 'red',
      steps: [
        'Aplicá presión directa y firme con tela limpia',
        'No levantes la compresión para verificar — seguí apretando',
        'Si la sangre empapa sin parar y es en un miembro, usá torniquete 5–7 cm por encima de la herida',
        'Anotá la hora de aplicación del torniquete',
      ]
    },
    {
      title: 'Hipotermia',
      icon: '🥶',
      color: 'blue',
      steps: [
        'Retirá a la persona del frío y el viento de inmediato',
        'Quitá la ropa mojada sin frotar la piel',
        'Cubrí con mantas o bolsa de dormir, especialmente cabeza y cuello',
        'Bebidas calientes (no alcohol) si está consciente y puede tragar',
        'No frotés las extremidades — puede causar paro cardíaco',
      ]
    },
    {
      title: 'Fractura',
      icon: '🦴',
      color: 'brown',
      steps: [
        'No intentes reducir la fractura (poner el hueso en su lugar)',
        'Inmovilizá la zona con lo que tengas: ramas, bastones, cartón duro',
        'El entablillado debe cubrir la articulación de arriba y la de abajo',
        'Revisá circulación, sensibilidad y movimiento distal cada 15 min',
      ]
    },
    {
      title: 'Quemaduras',
      icon: '🔥',
      color: 'orange',
      steps: [
        'Enfriá con agua corriente fría (no helada) por al menos 10 minutos',
        'No apliques pasta dental, manteca ni ningún remedio casero',
        'Cubrí con apósito húmedo no adherente',
        'Quemaduras en cara, manos, genitales o más del 10% del cuerpo: evacuación urgente',
      ]
    },
  ];

  kitItems = [
    { item: 'Gasas estériles (varios tamaños)', essential: true },
    { item: 'Vendas elásticas', essential: true },
    { item: 'Torniquete CAT o similar', essential: true },
    { item: 'Guantes de nitrilo (x4 pares mínimo)', essential: true },
    { item: 'Tijera de trauma', essential: true },
    { item: 'Cinta médica', essential: true },
    { item: 'Manta de emergencia (isotérmica)', essential: true },
    { item: 'Antiinflamatorio y analgésico', essential: false },
    { item: 'Antihistamínico', essential: false },
    { item: 'Solución salina para irrigación', essential: false },
    { item: 'Termómetro', essential: false },
    { item: 'Nota de alergias y medicamentos del grupo', essential: false },
  ];
}
