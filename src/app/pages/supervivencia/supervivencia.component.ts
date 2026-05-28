import { Component, signal, computed } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

type PlantCategory = 'todas' | 'comestible' | 'medicinal' | 'peligrosa';

interface Plant {
  name: string; scientific: string; icon: string;
  category: 'comestible' | 'medicinal' | 'peligrosa';
  habitat: string; description: string; use: string;
  warning?: string; parts: string[];
}

@Component({
  selector: 'app-supervivencia',
  standalone: true,
  imports: [RouterLink, CommonModule, FormsModule],
  templateUrl: './supervivencia.component.html',
  styleUrl: './supervivencia.component.scss'
})
export class SupervivenciaComponent {

  activeTab = signal<'supervivencia' | 'botanica' | 'meteorologia'>('supervivencia');

  // ── SUPERVIVENCIA ─────────────────────────────────────────────────
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
    { time: '3 horas',   label: 'frío extremo (hipotermia)' },
    { time: '3 días',    label: 'agua' },
    { time: '3 semanas', label: 'comida' },
  ];

  fireMethods = [
    { name: 'Encendedor / Fósforos', level: 'easy', levelLabel: 'Básico',
      desc: 'Siempre el primer recurso. Llevá dos encendedores en lugares distintos y fósforos impermeables.' },
    { name: 'Pedernal y Eslabón', level: 'medium', levelLabel: 'Intermedio',
      desc: 'Confiable en humedad. No requiere combustible. Funciona incluso mojado con práctica.' },
    { name: 'Arco y Taladro (Fricción)', level: 'hard', levelLabel: 'Avanzado',
      desc: 'Método primitivo de alta eficiencia cuando se domina. Requiere materiales secos y práctica constante.' },
    { name: 'Lupa / Espejo Solar', level: 'medium', levelLabel: 'Situacional',
      desc: 'Efectivo solo con sol directo. Ideal como complemento. También sirve para señalización.' },
  ];

  // ── BOTÁNICA ──────────────────────────────────────────────────────
  activeFilter = signal<PlantCategory>('todas');
  searchQuery  = signal('');

  filters: { id: PlantCategory; label: string; icon: string }[] = [
    { id: 'todas',      label: 'Todas',       icon: '🌿' },
    { id: 'comestible', label: 'Comestibles', icon: '🍃' },
    { id: 'medicinal',  label: 'Medicinales', icon: '💊' },
    { id: 'peligrosa',  label: 'Precaución',  icon: '☠️' },
  ];

  plants: Plant[] = [
    { name: 'Diente de León', scientific: 'Taraxacum officinale', icon: '🌼', category: 'comestible',
      habitat: 'Praderas, bordes de camino, suelos removidos',
      description: 'Una de las plantas silvestres más reconocibles. Toda la planta es comestible: hojas, flor y raíz.',
      use: 'Hojas jóvenes en ensalada o hervidas. Flores en infusión. Raíz tostada como sustituto del café.',
      parts: ['Hojas', 'Flores', 'Raíz'] },
    { name: 'Ortiga', scientific: 'Urtica dioica', icon: '🌱', category: 'comestible',
      habitat: 'Suelos húmedos y nitrogenados, bordes de ríos',
      description: 'Las hojas pierden su capacidad urticante al hervirlas o secarlas. Muy nutritiva.',
      use: 'Cocinada como espinaca, en sopas. Nunca consumir cruda. Usar guantes al cosechar.',
      warning: 'Nunca consumir cruda. Manipular con guantes.',
      parts: ['Hojas jóvenes', 'Brotes tiernos'] },
    { name: 'Berro', scientific: 'Nasturtium officinale', icon: '🌿', category: 'comestible',
      habitat: 'Orillas de arroyos y cursos de agua limpia',
      description: 'Crece en el agua o muy cerca. Sabor picante y fresco. Muy nutritivo.',
      use: 'En ensaladas, salsas o cocido. Solo cosechar de aguas limpias.',
      warning: 'No cosechar en aguas con contaminación o presencia de ganado aguas arriba.',
      parts: ['Hojas', 'Tallos tiernos'] },
    { name: 'Menta Silvestre', scientific: 'Mentha spp.', icon: '🍵', category: 'comestible',
      habitat: 'Suelos húmedos, bordes de agua, zonas sombreadas',
      description: 'Fácilmente reconocible por su aroma. Hay múltiples especies con propiedades similares.',
      use: 'Infusión para digestión. Aromatizar agua o comidas. Hojas frescas en ensaladas.',
      parts: ['Hojas', 'Tallos jóvenes', 'Flores'] },
    { name: 'Algarrobo', scientific: 'Prosopis spp.', icon: '🌳', category: 'comestible',
      habitat: 'Llanuras y monte bajo del centro y norte de Argentina',
      description: 'Sus vainas dulces son altamente calóricas y nutritivas.',
      use: 'Vainas maduras comidas directamente o molidas en harina (patay). Rica en proteínas.',
      parts: ['Vainas maduras', 'Semillas (molidas)'] },
    { name: 'Achicoria Silvestre', scientific: 'Cichorium intybus', icon: '💙', category: 'comestible',
      habitat: 'Bordes de caminos, terrenos baldíos, pastizales',
      description: 'Planta robusta de flores azul intenso. Las hojas son amargas pero nutritivas.',
      use: 'Hojas jóvenes en ensaladas o hervidas. Raíz tostada como sustituto del café.',
      parts: ['Hojas jóvenes', 'Raíz', 'Flores'] },
    { name: 'Llantén', scientific: 'Plantago major', icon: '🌿', category: 'medicinal',
      habitat: 'Caminos pisoteados, zonas húmedas',
      description: 'Hojas anchas con nervaduras paralelas prominentes. Una de las más útiles en campo.',
      use: 'Hoja machacada sobre picaduras, cortes o quemaduras leves. Infusión para la tos.',
      parts: ['Hojas', 'Semillas'] },
    { name: 'Cedrón', scientific: 'Aloysia citrodora', icon: '🌿', category: 'medicinal',
      habitat: 'Zonas templadas y cálidas, bordes de camino',
      description: 'Arbusto de fuerte aroma cítrico-limón. Reconocible al frotar sus hojas.',
      use: 'Infusión para calmar el sistema nervioso, digestión y como sedante suave.',
      parts: ['Hojas', 'Flores'] },
    { name: 'Manzanilla', scientific: 'Matricaria chamomilla', icon: '🌼', category: 'medicinal',
      habitat: 'Terrenos abiertos, pastizales, bordes de cultivos',
      description: 'Flor blanca con centro amarillo. Aroma dulce característico.',
      use: 'Infusión antiinflamatoria y calmante. Lavado de heridas con infusión fría.',
      parts: ['Flores', 'Tallos floridos'] },
    { name: 'Boldo', scientific: 'Peumus boldus', icon: '🌿', category: 'medicinal',
      habitat: 'Laderas de zonas templadas, Patagonia andina',
      description: 'Árbol de hojas aromáticas duras. Olor intenso y característico.',
      use: 'Infusión de hojas para problemas hepáticos y digestivos.',
      warning: 'No usar en altas dosis ni de forma prolongada. Contraindicado en embarazo.',
      parts: ['Hojas'] },
    { name: 'Malva', scientific: 'Malva sylvestris', icon: '🌸', category: 'medicinal',
      habitat: 'Bordes de camino, terrenos baldíos',
      description: 'Flores violáceas con venas más oscuras. Muy extendida.',
      use: 'Infusión como emoliente para garganta y tos. Cataplasma de hojas para inflamaciones.',
      parts: ['Hojas', 'Flores', 'Raíz'] },
    { name: 'Cicuta', scientific: 'Conium maculatum', icon: '☠️', category: 'peligrosa',
      habitat: 'Bordes de agua, terrenos húmedos',
      description: 'Similar visualmente al perejil o zanahoria silvestre. Manchas rojizas en el tallo.',
      use: 'Ninguno. No manipular sin conocimiento seguro.',
      warning: 'LETAL. Puede confundirse con perejil silvestre. Ingestión provoca parálisis respiratoria.',
      parts: ['Toda la planta es tóxica'] },
    { name: 'Estramonio', scientific: 'Datura stramonium', icon: '🌺', category: 'peligrosa',
      habitat: 'Terrenos baldíos, bordes de cultivos',
      description: 'Grandes flores blancas en forma de trompeta y frutos espinosos.',
      use: 'Ninguno. No tocar.',
      warning: 'EXTREMADAMENTE TÓXICA. Alcaloides que causan delirio, taquicardia y pueden ser letales.',
      parts: ['Toda la planta es tóxica, especialmente semillas'] },
    { name: 'Solano Negro', scientific: 'Solanum nigrum', icon: '🫐', category: 'peligrosa',
      habitat: 'Huertos, terrenos baldíos',
      description: 'Planta pequeña con bayas negras brillantes en racimos.',
      use: 'Ninguno en estado silvestre.',
      warning: 'Las bayas verdes son altamente tóxicas. No consumir sin identificación 100% segura.',
      parts: ['Bayas verdes: muy tóxicas'] },
  ];

  visiblePlants = computed(() => {
    const cat = this.activeFilter();
    const q   = this.searchQuery().toLowerCase().trim();
    return this.plants.filter(p => {
      const matchCat = cat === 'todas' || p.category === cat;
      const matchQ   = !q || p.name.toLowerCase().includes(q) || p.scientific.toLowerCase().includes(q);
      return matchCat && matchQ;
    });
  });

  categoryLabel: Record<string, string> = { comestible: 'Comestible', medicinal: 'Medicinal', peligrosa: 'Precaución' };
  categoryClass: Record<string, string> = { comestible: 'tag-comestible', medicinal: 'tag-medicinal', peligrosa: 'tag-peligrosa' };

  // ── METEOROLOGÍA ──────────────────────────────────────────────────
  clouds = [
    { name: 'Cúmulus', altitude: 'Baja – media', icon: '⛅',
      look: 'Masas blancas algodonosas de base plana y tope redondeado.',
      signal: 'Buen tiempo. Si crecen verticalmente por la tarde, posible tormenta.', danger: 'low' },
    { name: 'Cumulonimbus', altitude: 'Baja hasta la alta', icon: '⛈️',
      look: 'Torre gigante de tope en forma de yunque. Color gris oscuro en la base.',
      signal: 'Tormenta eléctrica inminente. Granizo posible. Buscá refugio inmediatamente.', danger: 'critical' },
    { name: 'Stratus', altitude: 'Baja', icon: '🌫️',
      look: 'Capa gris uniforme que cubre el cielo. Parecida a niebla elevada.',
      signal: 'Llovizna o lluvia leve continua. Tiempo estable pero húmedo.', danger: 'medium' },
    { name: 'Nimbostratus', altitude: 'Baja – media', icon: '🌧️',
      look: 'Capa gris oscura densa que oculta totalmente el sol. Base difusa.',
      signal: 'Lluvia o nieve continua y persistente. Puede durar horas o días.', danger: 'high' },
    { name: 'Altostratus', altitude: 'Media', icon: '🌥️',
      look: 'Velo gris azulado que difumina el sol. El sol se ve como a través de un vidrio esmerilado.',
      signal: 'Lluvia en camino en 12–24 horas. Señal de sistema frontal acercándose.', danger: 'medium' },
    { name: 'Altocumulus', altitude: 'Media', icon: '🌤️',
      look: 'Parches o filas de bolas blancas o grises. Patrón organizado.',
      signal: 'Tiempo generalmente estable. Si aparecen torres sobre ellos, tormentas por la tarde.', danger: 'low' },
    { name: 'Cirrus', altitude: 'Alta', icon: '🌬️',
      look: 'Filamentos blancos delgados, como cabello o plumas, en cielos azules.',
      signal: 'Buen tiempo inmediato. Si aumentan en velo, sistema frontal en 24–48 horas.', danger: 'low' },
    { name: 'Cirrocumulus', altitude: 'Alta', icon: '🐟',
      look: 'Pequeñas manchas blancas muy juntas, como escamas de pez. "Cielo aborregado".',
      signal: 'Cambio de tiempo en las próximas 24 horas. Puede preceder lluvia o viento.', danger: 'medium' },
  ];

  windSigns = [
    { icon: '🌀', title: 'Remolinos de polvo',
      desc: 'Columnas de aire caliente ascendente. Indican inestabilidad y posibles tormentas por la tarde.' },
    { icon: '🍃', title: 'Hojas al revés',
      desc: 'Muchos árboles muestran el envés claro de sus hojas cuando el viento húmedo antecede la lluvia.' },
    { icon: '🔊', title: 'Sonidos lejanos más claros',
      desc: 'Cuando escuchás sonidos distantes con más claridad, la presión está bajando.' },
    { icon: '💨', title: 'Cambio brusco de dirección',
      desc: 'Un viento que rota rápidamente indica el paso de un frente. Lluvia en 1–3 horas.' },
    { icon: '🌊', title: 'Olas en lago o laguna',
      desc: 'Si el agua empieza a rizarse sin viento aparente, hay viento en altura que pronto bajará.' },
    { icon: '🌬️', title: 'Viento del norte persistente',
      desc: 'En el cono sur, viento norte cálido y húmedo suele preceder sistemas de lluvia del oeste.' },
  ];

  natureSigns = [
    { icon: '🐦', title: 'Aves bajando de altura',
      desc: 'Las aves vuelan más bajo cuando la presión baja. Si buscan refugio, se viene mal tiempo.' },
    { icon: '🐜', title: 'Hormigas cerrando entradas',
      desc: 'Las colonias de hormigas tapan sus entradas antes de la lluvia. Indicador confiable.' },
    { icon: '🌸', title: 'Flores que se cierran',
      desc: 'Muchas flores silvestres cierran sus pétalos antes de la lluvia para proteger el polen.' },
    { icon: '🌲', title: 'Pinos y coníferas',
      desc: 'Los conos de pino se cierran con humedad alta. Si estaban abiertos y se cierran, hay lluvia.' },
    { icon: '🐸', title: 'Ranas y sapos activos',
      desc: 'La actividad de anfibios aumenta antes de la lluvia. Un coro nocturno suele anticiparla.' },
    { icon: '🌿', title: 'Olor a tierra húmeda',
      desc: 'La petricor puede sentirse antes de la lluvia cuando el viento trae humedad del suelo.' },
  ];

  rules = [
    { num: '01', title: 'Rojo al atardecer, buen tiempo el día siguiente',
      detail: 'Cielo rojizo al oeste al atardecer indica atmósfera seca en la dirección desde donde llega el tiempo.' },
    { num: '02', title: 'Rojo al amanecer, tiempo tormentoso',
      detail: 'Cielo rojizo al este al amanecer indica humedad y el sistema viene desde el oeste.' },
    { num: '03', title: 'Halo alrededor de la luna',
      detail: 'El halo se forma por cristales de hielo en nubes altas. Suele preceder lluvia en 24–48 horas.' },
    { num: '04', title: 'Nubes que crecen hacia arriba por la tarde',
      detail: 'Cúmulos que se desarrollan verticalmente entre mediodía y las 16 hs indican posible tormenta.' },
    { num: '05', title: 'Niebla matinal, día despejado',
      detail: 'La niebla que se forma en valles y disipa con el sol suele indicar buen tiempo para ese día.' },
    { num: '06', title: 'El tiempo empeora con el viento del sur',
      detail: 'En el hemisferio sur, los sistemas de mal tiempo suelen venir del sudoeste.' },
  ];

  dangerLabel: Record<string, string> = { low: 'Buen tiempo', medium: 'Atención', high: 'Mal tiempo', critical: 'Peligro' };
  dangerClass: Record<string, string> = { low: 'tag-low', medium: 'tag-medium', high: 'tag-high', critical: 'tag-critical' };
}
