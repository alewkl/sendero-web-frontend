import { Component, signal, computed } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

type PlantCategory = 'todas' | 'comestible' | 'medicinal' | 'peligrosa';

interface Plant {
  name: string;
  scientific: string;
  icon: string;
  category: 'comestible' | 'medicinal' | 'peligrosa';
  habitat: string;
  description: string;
  use: string;
  warning?: string;
  parts: string[];
}

@Component({
  selector: 'app-botanica',
  standalone: true,
  imports: [RouterLink, CommonModule, FormsModule],
  templateUrl: './botanica.component.html',
  styleUrl: './botanica.component.scss'
})
export class BotanicaComponent {

  activeFilter = signal<PlantCategory>('todas');
  searchQuery = signal('');

  filters: { id: PlantCategory; label: string; icon: string }[] = [
    { id: 'todas',     label: 'Todas',       icon: '🌿' },
    { id: 'comestible',label: 'Comestibles', icon: '🍃' },
    { id: 'medicinal', label: 'Medicinales', icon: '💊' },
    { id: 'peligrosa', label: 'Precaución',  icon: '☠️' },
  ];

  plants: Plant[] = [
    // COMESTIBLES
    {
      name: 'Diente de León',
      scientific: 'Taraxacum officinale',
      icon: '🌼',
      category: 'comestible',
      habitat: 'Praderas, bordes de camino, suelos removidos',
      description: 'Una de las plantas silvestres más reconocibles y completas. Toda la planta es comestible: hojas, flor y raíz.',
      use: 'Hojas jóvenes en ensalada o hervidas. Flores en infusión o fritas en tempura. Raíz tostada como sustituto del café.',
      parts: ['Hojas', 'Flores', 'Raíz'],
    },
    {
      name: 'Ortiga',
      scientific: 'Urtica dioica',
      icon: '🌱',
      category: 'comestible',
      habitat: 'Suelos húmedos y nitrogenados, bordes de ríos y arroyos',
      description: 'Las hojas pierden toda su capacidad urticante al hervirlas o secarlas. Muy nutritiva: rica en hierro, calcio y vitamina C.',
      use: 'Cocinada como espinaca, en sopas o tortillas. Nunca consumir cruda. Usar guantes al cosechar.',
      warning: 'Nunca consumir cruda. Manipular siempre con guantes.',
      parts: ['Hojas jóvenes', 'Brotes tiernos'],
    },
    {
      name: 'Berro',
      scientific: 'Nasturtium officinale',
      icon: '🌿',
      category: 'comestible',
      habitat: 'Orillas de arroyos y cursos de agua limpia',
      description: 'Crece en el agua o muy cerca de ella. Sabor picante y fresco. Muy nutritivo.',
      use: 'En ensaladas, salsas o cocido. Solo cosechar de aguas limpias y sin contaminación aguas arriba.',
      warning: 'No cosechar en aguas con contaminación o presencia de ganado aguas arriba. Riesgo de fasciola hepática.',
      parts: ['Hojas', 'Tallos tiernos'],
    },
    {
      name: 'Menta Silvestre',
      scientific: 'Mentha spp.',
      icon: '🍵',
      category: 'comestible',
      habitat: 'Suelos húmedos, bordes de agua, zonas sombreadas',
      description: 'Fácilmente reconocible por su aroma característico. Hay múltiples especies, todas con propiedades similares.',
      use: 'Infusión para digestión y calor. Aromatizar agua o comidas. Hojas frescas en ensaladas.',
      parts: ['Hojas', 'Tallos jóvenes', 'Flores'],
    },
    {
      name: 'Algarrobo',
      scientific: 'Prosopis spp.',
      icon: '🌳',
      category: 'comestible',
      habitat: 'Llanuras, monte bajo y zonas áridas del centro y norte de Argentina',
      description: 'Sus vainas dulces son altamente calóricas y nutritivas. Usado ancestralmente por comunidades originarias.',
      use: 'Vainas maduras comidas directamente o molidas en harina (patay). Rica en proteínas y azúcares naturales.',
      parts: ['Vainas maduras', 'Semillas (molidas)'],
    },
    {
      name: 'Achicoria Silvestre',
      scientific: 'Cichorium intybus',
      icon: '💙',
      category: 'comestible',
      habitat: 'Bordes de caminos, terrenos baldíos, pastizales',
      description: 'Planta robusta de flores azul intenso. Las hojas son amargas pero muy nutritivas.',
      use: 'Hojas jóvenes en ensaladas o hervidas para reducir el amargor. Raíz tostada como sustituto del café.',
      parts: ['Hojas jóvenes', 'Raíz', 'Flores'],
    },

    // MEDICINALES
    {
      name: 'Llantén',
      scientific: 'Plantago major',
      icon: '🌿',
      category: 'medicinal',
      habitat: 'Caminos pisoteados, zonas húmedas, jardines',
      description: 'Planta de hojas anchas con nervaduras paralelas prominentes. Crece en suelos compactados. Una de las más útiles en campo.',
      use: 'Hoja machacada aplicada directamente sobre picaduras, cortes o quemaduras leves. En infusión para la tos y problemas respiratorios.',
      parts: ['Hojas', 'Semillas'],
    },
    {
      name: 'Cedrón',
      scientific: 'Aloysia citrodora',
      icon: '🌿',
      category: 'medicinal',
      habitat: 'Zonas templadas y cálidas, crece en jardines y bordes de camino',
      description: 'Arbusto de fuerte aroma cítrico-limón. Muy reconocible por el olor al frotar sus hojas.',
      use: 'Infusión para calmar el sistema nervioso, digestión y como sedante suave. Ideal antes de dormir en campo.',
      parts: ['Hojas', 'Flores'],
    },
    {
      name: 'Manzanilla',
      scientific: 'Matricaria chamomilla',
      icon: '🌼',
      category: 'medicinal',
      habitat: 'Terrenos abiertos, pastizales, bordes de cultivos',
      description: 'Flor blanca con centro amarillo. Aroma dulce característico. Una de las plantas medicinales más difundidas del mundo.',
      use: 'Infusión antiinflamatoria, digestiva y calmante. Lavado de heridas y ojos irritados con infusión fría.',
      parts: ['Flores', 'Tallos floridos'],
    },
    {
      name: 'Boldo',
      scientific: 'Peumus boldus',
      icon: '🌿',
      category: 'medicinal',
      habitat: 'Laderas y quebradas de zonas templadas, Patagonia andina',
      description: 'Árbol de hojas aromáticas, duras y rugosas al tacto. Olor intenso y característico.',
      use: 'Infusión de hojas para problemas hepáticos y digestivos. No usar en exceso ni en embarazo.',
      warning: 'No usar en altas dosis ni de forma prolongada. Contraindicado en embarazo.',
      parts: ['Hojas'],
    },
    {
      name: 'Malva',
      scientific: 'Malva sylvestris',
      icon: '🌸',
      category: 'medicinal',
      habitat: 'Bordes de camino, terrenos baldíos, zonas urbanas y rurales',
      description: 'Flores violáceas con venas más oscuras. Hojas redondeadas y lobuladas. Muy extendida.',
      use: 'Infusión de hojas y flores como emoliente para garganta, tos y bronquios. Cataplasma de hojas frescas para inflamaciones cutáneas.',
      parts: ['Hojas', 'Flores', 'Raíz'],
    },
    {
      name: 'Yerba del Bicho',
      scientific: 'Polygonum hydropiperoides',
      icon: '🌱',
      category: 'medicinal',
      habitat: 'Orillas de ríos y arroyos, zonas inundables',
      description: 'Planta de ambientes húmedos con flores pequeñas en espigas. Sabor acre y picante.',
      use: 'Infusión como antiinflamatorio local y para alivio de hemorroides. Uso externo únicamente.',
      warning: 'Solo uso externo. No ingerir en grandes cantidades.',
      parts: ['Hojas', 'Tallos'],
    },

    // PELIGROSAS
    {
      name: 'Cicuta',
      scientific: 'Conium maculatum',
      icon: '☠️',
      category: 'peligrosa',
      habitat: 'Bordes de agua, terrenos húmedos, cunetas',
      description: 'Planta de la familia de las umbelíferas, similar visualmente al perejil o zanahoria silvestre. Manchas rojizas en el tallo. Una de las más letales de la flora local.',
      use: 'Ninguno. No manipular sin conocimiento seguro.',
      warning: 'LETAL. Puede confundirse con perejil silvestre o zanahoria. La ingestión provoca parálisis respiratoria. Identificar siempre por el olor desagradable al frotar y las manchas violáceas del tallo.',
      parts: ['Toda la planta es tóxica'],
    },
    {
      name: 'Estramonio',
      scientific: 'Datura stramonium',
      icon: '🌺',
      category: 'peligrosa',
      habitat: 'Terrenos baldíos, bordes de cultivos, zonas alteradas',
      description: 'Planta robusta con grandes flores blancas en forma de trompeta y frutos espinosos. Muy llamativa.',
      use: 'Ninguno. No tocar.',
      warning: 'EXTREMADAMENTE TÓXICA. Toda la planta contiene alcaloides que causan delirio, taquicardia, alucinaciones y pueden ser letales. No confundir con ninguna planta comestible.',
      parts: ['Toda la planta es tóxica, especialmente semillas'],
    },
    {
      name: 'Solano Negro',
      scientific: 'Solanum nigrum',
      icon: '🫐',
      category: 'peligrosa',
      habitat: 'Huertos, terrenos baldíos, zonas perturbadas',
      description: 'Planta pequeña con bayas negras brillantes en racimos. Fácil de confundir con plantas comestibles.',
      use: 'Ninguno en estado silvestre.',
      warning: 'Las bayas verdes son altamente tóxicas. Las maduras pueden serlo dependiendo de la especie exacta. No consumir sin identificación 100% segura por experto.',
      parts: ['Bayas verdes: muy tóxicas'],
    },
    {
      name: 'Cina-Cina',
      scientific: 'Parkinsonia aculeata',
      icon: '🌵',
      category: 'peligrosa',
      habitat: 'Zonas áridas y semiáridas del norte argentino',
      description: 'Árbol espinoso de ramas colgantes. Las espinas pueden causar heridas profundas que se infectan fácilmente en campo.',
      use: 'Ninguno alimenticio. Las semillas son tóxicas.',
      warning: 'Las espinas rompen fácilmente en la piel y se infectan. Las semillas contienen alcaloides tóxicos.',
      parts: ['Semillas tóxicas, espinas peligrosas'],
    },
  ];

  visiblePlants = computed(() => {
    const cat = this.activeFilter();
    const q = this.searchQuery().toLowerCase().trim();
    return this.plants.filter(p => {
      const matchCat = cat === 'todas' || p.category === cat;
      const matchQ = !q || p.name.toLowerCase().includes(q) || p.scientific.toLowerCase().includes(q) || p.habitat.toLowerCase().includes(q);
      return matchCat && matchQ;
    });
  });

  categoryLabel: Record<string, string> = {
    comestible: 'Comestible',
    medicinal:  'Medicinal',
    peligrosa:  'Precaución',
  };

  categoryClass: Record<string, string> = {
    comestible: 'tag-comestible',
    medicinal:  'tag-medicinal',
    peligrosa:  'tag-peligrosa',
  };
}
