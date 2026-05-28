import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-campismo',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './campismo.component.html',
  styleUrl: './campismo.component.scss'
})
export class CampismoComponent {

  siteChecklist = [
    { icon: '🌊', label: 'Alejado de cursos de agua', desc: 'Al menos 60 metros de ríos o lagos para evitar crecidas y proteger el entorno.' },
    { icon: '💨', label: 'Protección del viento', desc: 'Buscá una barrera natural: árboles, rocas o una loma que corte el viento dominante.' },
    { icon: '🌳', label: 'Sin ramas colgantes', desc: 'Revisá el dosel. Las ramas secas o sobrecargadas pueden caer durante la noche.' },
    { icon: '📐', label: 'Terreno nivelado', desc: 'Una inclinación de pocos grados ya arruina el sueño. Dormí con la cabeza cuesta arriba si hay pendiente.' },
    { icon: '☀️', label: 'Orientación al sol', desc: 'Hacia el este para recibir sol temprano y secar el rocío de madrugada.' },
    { icon: '🚶', label: 'Vías de escape', desc: 'Conocé al menos dos salidas del área antes de instalarte.' },
  ];

  shelterTypes = [
    {
      name: 'Carpa de cúpula',
      icon: '⛺',
      level: 'Principiante',
      levelClass: 'easy',
      pros: ['Fácil de montar', 'Buena ventilación', 'Estable con viento'],
      cons: ['Volumen de empaque mayor', 'Más peso']
    },
    {
      name: 'Carpa tipo túnel',
      icon: '🏕️',
      level: 'Principiante',
      levelClass: 'easy',
      pros: ['Excelente relación peso/espacio', 'Aerodinámica'],
      cons: ['Necesita vientos bien tensados', 'Menos estable sin anclar']
    },
    {
      name: 'Tarp / Lona',
      icon: '🔺',
      level: 'Intermedio',
      levelClass: 'medium',
      pros: ['Muy ligero', 'Versátil', 'Rápido de instalar'],
      cons: ['No protege de insectos', 'Requiere práctica con los nudos']
    },
    {
      name: 'Refugio natural',
      icon: '🌿',
      level: 'Avanzado',
      levelClass: 'hard',
      pros: ['Sin equipo necesario', 'Camuflaje total'],
      cons: ['Tiempo de construcción alto', 'Requiere materiales adecuados en el entorno']
    },
  ];

  campLayout = [
    { zone: 'Zona de dormir', icon: '😴', desc: 'El lugar más alto y resguardado. Alejada de la cocina para evitar olores que atraigan animales.' },
    { zone: 'Zona de cocina', desc: 'Bajo techo o paraviento, sobre tierra o roca. Nunca cocines dentro de la carpa.', icon: '🔥' },
    { zone: 'Zona de agua y aseo', icon: '💧', desc: 'A 60m mínimo de fuentes naturales. Usá jabón biodegradable.' },
    { zone: 'Zona de basura', icon: '🗑️', desc: 'Todo lo que entra al campamento, sale con vos. Pack it in, pack it out.' },
  ];

  leaveNoTrace = [
    'Planificá con anticipación y preparate bien',
    'Viajá y acampá sobre superficies resistentes',
    'Gestioná los residuos correctamente',
    'Dejá lo que encontrás — no muevas rocas, plantas ni artefactos',
    'Minimizá el impacto de las fogatas',
    'Respetá la fauna silvestre — no alimentes animales',
    'Considerá a los demás visitantes',
  ];
}
