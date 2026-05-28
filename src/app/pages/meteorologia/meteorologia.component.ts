import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-meteorologia',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './meteorologia.component.html',
  styleUrl: './meteorologia.component.scss'
})
export class MeteorologiaComponent {

  clouds = [
    {
      name: 'Cúmulus',
      altitude: 'Baja – media',
      icon: '⛅',
      look: 'Masas blancas algodonosas de base plana y tope redondeado.',
      signal: 'Buen tiempo. Si crecen verticalmente hacia la tarde, posible tormenta.',
      danger: 'low'
    },
    {
      name: 'Cumulonimbus',
      altitude: 'Baja hasta la alta',
      icon: '⛈️',
      look: 'Torre gigante de tope en forma de yunque o cúpula. Color gris oscuro en la base.',
      signal: 'Tormenta eléctrica inminente. Granizo y vientos fuertes posibles. Buscá refugio inmediatamente.',
      danger: 'critical'
    },
    {
      name: 'Stratus',
      altitude: 'Baja',
      icon: '🌫️',
      look: 'Capa gris uniforme y continua que cubre el cielo. Parecida a niebla elevada.',
      signal: 'Llovizna o lluvia leve continua. Visibilidad reducida. Tiempo estable pero húmedo.',
      danger: 'medium'
    },
    {
      name: 'Nimbostratus',
      altitude: 'Baja – media',
      icon: '🌧️',
      look: 'Capa gris oscura densa que oculta totalmente el sol. Base difusa.',
      signal: 'Lluvia o nieve continua y persistente. Puede durar horas o días.',
      danger: 'high'
    },
    {
      name: 'Altostratus',
      altitude: 'Media',
      icon: '🌥️',
      look: 'Velo gris azulado que difumina el sol sin ocultarlo. El sol se ve como a través de un vidrio esmerilado.',
      signal: 'Lluvia en camino, generalmente en 12–24 horas. Señal de sistema frontal acercándose.',
      danger: 'medium'
    },
    {
      name: 'Altocumulus',
      altitude: 'Media',
      icon: '🌤️',
      look: 'Parches o filas de bolas blancas o grises. Patrón organizado.',
      signal: 'Tiempo generalmente estable. Si aparecen torres sobre ellos, puede haber tormentas por la tarde.',
      danger: 'low'
    },
    {
      name: 'Cirrus',
      altitude: 'Alta',
      icon: '🌬️',
      look: 'Filamentos blancos delgados, como cabello o plumas, en cielos azules.',
      signal: 'Buen tiempo inmediato. Si aumentan y se esparcen en velo, sistema frontal en 24–48 horas.',
      danger: 'low'
    },
    {
      name: 'Cirrocumulus',
      altitude: 'Alta',
      icon: '🐟',
      look: 'Pequeñas manchas blancas muy juntas, como escamas de pez o gránulos de arroz. "Cielo aborregado".',
      signal: 'Cambio de tiempo en las próximas 24 horas. Puede preceder lluvia o viento.',
      danger: 'medium'
    },
  ];

  windSigns = [
    {
      icon: '🌀',
      title: 'Remolinos de polvo',
      desc: 'Columnas de aire caliente ascendente. Indican inestabilidad atmosférica y posibles tormentas por la tarde en días cálidos.'
    },
    {
      icon: '🌊',
      title: 'Olas de lago o laguna',
      desc: 'Si el agua de una laguna tranquila empieza a rizarse sin viento aparente, hay viento en altura que pronto bajará.'
    },
    {
      icon: '🍃',
      title: 'Hojas al revés',
      desc: 'Muchos árboles muestran el envés claro de sus hojas cuando el viento húmedo antecede la lluvia. Señal confiable.'
    },
    {
      icon: '🔊',
      title: 'Sonidos lejanos más claros',
      desc: 'Cuando escuchás sonidos distantes (autos, trenes, animales) con más claridad que lo habitual, la presión está bajando.'
    },
    {
      icon: '💨',
      title: 'Cambio brusco de dirección',
      desc: 'Un viento que rota rápidamente de dirección indica el paso de un frente. Prepararse para lluvia en 1–3 horas.'
    },
    {
      icon: '🌬️',
      title: 'Viento del norte persistente',
      desc: 'En el cono sur, viento norte cálido y húmedo suele preceder sistemas de lluvia del oeste o sudoeste.'
    },
  ];

  natureSigns = [
    {
      icon: '🐦',
      title: 'Aves bajando de altura',
      desc: 'Las aves vuelan más bajo cuando la presión baja. Si las aves dejan de elevarse o buscan refugio, se viene mal tiempo.'
    },
    {
      icon: '🐜',
      title: 'Hormigas cerrando entradas',
      desc: 'Las colonias de hormigas tapan sus entradas antes de la lluvia. Un indicador sorprendentemente confiable.'
    },
    {
      icon: '🌸',
      title: 'Flores que se cierran',
      desc: 'Muchas flores silvestres cierran sus pétalos antes de la lluvia para proteger el polen. Diente de León y margaritas son ejemplos comunes.'
    },
    {
      icon: '🌲',
      title: 'Pinos y coníferas',
      desc: 'Los piñones y conos de pino se cierran con humedad alta. Si estaban abiertos y se cierran, hay lluvia en camino.'
    },
    {
      icon: '🐸',
      title: 'Ranas y sapos activos',
      desc: 'La actividad de anfibios aumenta antes de la lluvia, especialmente sus cantos. Un coro nocturno inesperado suele anticipar lluvia.'
    },
    {
      icon: '🌿',
      title: 'Olor a tierra húmeda',
      desc: 'La petricor (el olor a tierra mojada) puede sentirse antes de la lluvia cuando el viento trae humedad del suelo a distancia.'
    },
  ];

  rules = [
    {
      num: '01',
      title: 'Rojo al atardecer, buen tiempo el día siguiente',
      detail: 'Cielo rojizo al oeste al atardecer indica atmósfera seca en la dirección desde donde llega el tiempo. Generalmente confiable.',
      reliable: true
    },
    {
      num: '02',
      title: 'Rojo al amanecer, tiempo tormentoso',
      detail: 'Cielo rojizo al este al amanecer indica humedad en esa dirección y el sistema viene hacia vos desde el oeste.',
      reliable: true
    },
    {
      num: '03',
      title: 'Halo alrededor de la luna',
      detail: 'El halo se forma por cristales de hielo en nubes altas (cirrus o cirrostratus). Suele preceder lluvia en 24–48 horas.',
      reliable: true
    },
    {
      num: '04',
      title: 'Nubes que crecen hacia arriba por la tarde',
      detail: 'Cúmulos que se desarrollan verticalmente entre mediodía y las 16 hs indican inestabilidad y posible tormenta eléctrica.',
      reliable: true
    },
    {
      num: '05',
      title: 'Niebla matinal, día despejado',
      detail: 'La niebla que se forma en valles durante la noche y disipa con el sol suele indicar buen tiempo para ese día.',
      reliable: true
    },
    {
      num: '06',
      title: 'El tiempo empeora con el viento del sur',
      detail: 'En el hemisferio sur, los sistemas de mal tiempo suelen venir del sudoeste. Viento sur frío y húmedo es señal de cambio.',
      reliable: true
    },
  ];

  dangerLabel: Record<string, string> = {
    low:      'Buen tiempo',
    medium:   'Atención',
    high:     'Mal tiempo',
    critical: 'Peligro',
  };

  dangerClass: Record<string, string> = {
    low:      'tag-low',
    medium:   'tag-medium',
    high:     'tag-high',
    critical: 'tag-critical',
  };
}
