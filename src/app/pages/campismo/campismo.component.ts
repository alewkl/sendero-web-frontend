import { Component, signal, computed, effect, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

type TripType = 'dia' | 'pernocte' | 'expedicion';

interface CheckItem { id: string; name: string; from: TripType; essential: boolean; checked: boolean; }
interface Category  { name: string; icon: string; items: CheckItem[]; }

const STORAGE_KEY = 'sendero_checklist';

@Component({
  selector: 'app-campismo',
  standalone: true,
  imports: [RouterLink, CommonModule, FormsModule],
  templateUrl: './campismo.component.html',
  styleUrl: './campismo.component.scss'
})
export class CampismoComponent implements OnInit {

  activeTab = signal<'campismo' | 'checklist'>('campismo');

  // ── CAMPISMO ──────────────────────────────────────────────────────
  siteChecklist = [
    { icon: '🌊', label: 'Alejado de cursos de agua', desc: 'Al menos 60 metros de ríos o lagos para evitar crecidas y proteger el entorno.' },
    { icon: '💨', label: 'Protección del viento', desc: 'Buscá una barrera natural: árboles, rocas o una loma que corte el viento dominante.' },
    { icon: '🌳', label: 'Sin ramas colgantes', desc: 'Revisá el dosel. Las ramas secas o sobrecargadas pueden caer durante la noche.' },
    { icon: '📐', label: 'Terreno nivelado', desc: 'Una inclinación de pocos grados ya arruina el sueño. Dormí con la cabeza cuesta arriba si hay pendiente.' },
    { icon: '☀️', label: 'Orientación al sol', desc: 'Hacia el este para recibir sol temprano y secar el rocío de madrugada.' },
    { icon: '🚶', label: 'Vías de escape', desc: 'Conocé al menos dos salidas del área antes de instalarte.' },
  ];

  shelterTypes = [
    { name: 'Carpa de cúpula', icon: '⛺', level: 'Principiante', levelClass: 'easy',
      pros: ['Fácil de montar', 'Buena ventilación', 'Estable con viento'],
      cons: ['Volumen de empaque mayor', 'Más peso'] },
    { name: 'Carpa tipo túnel', icon: '🏕️', level: 'Principiante', levelClass: 'easy',
      pros: ['Excelente relación peso/espacio', 'Aerodinámica'],
      cons: ['Necesita vientos bien tensados', 'Menos estable sin anclar'] },
    { name: 'Tarp / Lona', icon: '🔺', level: 'Intermedio', levelClass: 'medium',
      pros: ['Muy ligero', 'Versátil', 'Rápido de instalar'],
      cons: ['No protege de insectos', 'Requiere práctica con los nudos'] },
    { name: 'Refugio natural', icon: '🌿', level: 'Avanzado', levelClass: 'hard',
      pros: ['Sin equipo necesario', 'Camuflaje total'],
      cons: ['Tiempo de construcción alto', 'Requiere materiales adecuados en el entorno'] },
  ];

  campLayout = [
    { zone: 'Zona de dormir', icon: '😴', desc: 'El lugar más alto y resguardado. Alejada de la cocina para evitar olores que atraigan animales.' },
    { zone: 'Zona de cocina', icon: '🔥', desc: 'Bajo techo o paraviento, sobre tierra o roca. Nunca cocines dentro de la carpa.' },
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

  // ── CHECKLIST ─────────────────────────────────────────────────────
  tripType = signal<TripType>('pernocte');

  tripOptions: { id: TripType; label: string; icon: string; desc: string }[] = [
    { id: 'dia',        label: 'Salida de día', icon: '🌤️', desc: 'Hasta 8 horas, sin pernoctar' },
    { id: 'pernocte',   label: 'Pernocte',       icon: '🌙', desc: '1 noche en campo' },
    { id: 'expedicion', label: 'Expedición',     icon: '🗺️', desc: '2 o más noches' },
  ];

  categories: Category[] = [
    { name: 'Navegación', icon: '🧭', items: [
      { id: 'brujula', name: 'Brújula',                   from: 'dia',       essential: true,  checked: false },
      { id: 'mapa',    name: 'Mapa de la zona (impreso)', from: 'dia',       essential: true,  checked: false },
      { id: 'gps',     name: 'GPS o celular cargado',     from: 'dia',       essential: false, checked: false },
      { id: 'bateria', name: 'Batería externa',           from: 'pernocte',  essential: false, checked: false },
    ]},
    { name: 'Abrigo y ropa', icon: '🧥', items: [
      { id: 'base',     name: 'Ropa base (lana o sintética)', from: 'dia',       essential: true,  checked: false },
      { id: 'polar',    name: 'Polar o buzo',                 from: 'dia',       essential: true,  checked: false },
      { id: 'lluvia',   name: 'Capa impermeable',             from: 'dia',       essential: true,  checked: false },
      { id: 'gorro',    name: 'Gorro y guantes',              from: 'dia',       essential: false, checked: false },
      { id: 'saco',     name: 'Saco de dormir',               from: 'pernocte',  essential: true,  checked: false },
      { id: 'colchon',  name: 'Colchoneta aislante',          from: 'pernocte',  essential: true,  checked: false },
      { id: 'ropa_ext', name: 'Ropa extra (muda completa)',   from: 'pernocte',  essential: true,  checked: false },
      { id: 'termicos', name: 'Medias térmicas extra',        from: 'expedicion',essential: false, checked: false },
    ]},
    { name: 'Refugio', icon: '⛺', items: [
      { id: 'emergencia', name: 'Manta de emergencia',    from: 'dia',       essential: true,  checked: false },
      { id: 'carpa',      name: 'Carpa o tarp',           from: 'pernocte',  essential: true,  checked: false },
      { id: 'estacas',    name: 'Estacas y vientos extra',from: 'pernocte',  essential: false, checked: false },
      { id: 'bivy',       name: 'Bolsa bivy de emergencia',from: 'expedicion',essential: false, checked: false },
    ]},
    { name: 'Agua', icon: '💧', items: [
      { id: 'agua_pers', name: 'Agua (2 L mínimo)',             from: 'dia',       essential: true,  checked: false },
      { id: 'botella',   name: 'Botella o hidratador',          from: 'dia',       essential: true,  checked: false },
      { id: 'filtro',    name: 'Filtro o pastillas potabilizadoras', from: 'dia', essential: true,  checked: false },
      { id: 'olla',      name: 'Olla para hervir',              from: 'pernocte',  essential: false, checked: false },
      { id: 'agua_exp',  name: 'Agua extra (1 L/persona/día)', from: 'expedicion',essential: true,  checked: false },
    ]},
    { name: 'Alimentación', icon: '🍫', items: [
      { id: 'snacks',      name: 'Snacks energéticos',           from: 'dia',       essential: true,  checked: false },
      { id: 'comida_p',    name: 'Comida para pernocte',         from: 'pernocte',  essential: true,  checked: false },
      { id: 'cocina_k',    name: 'Kit de cocina (olla, cuchara)',from: 'pernocte',  essential: true,  checked: false },
      { id: 'combustible', name: 'Combustible / mechero',        from: 'pernocte',  essential: true,  checked: false },
      { id: 'raciones',    name: 'Raciones completas por día',   from: 'expedicion',essential: true,  checked: false },
      { id: 'especias',    name: 'Sal, aceite y especias',       from: 'expedicion',essential: false, checked: false },
    ]},
    { name: 'Seguridad y emergencias', icon: '🆘', items: [
      { id: 'botiquin',   name: 'Botiquín de campo',            from: 'dia',       essential: true,  checked: false },
      { id: 'encendedor', name: 'Encendedor (x2)',               from: 'dia',       essential: true,  checked: false },
      { id: 'silbato',    name: 'Silbato',                       from: 'dia',       essential: true,  checked: false },
      { id: 'linterna',   name: 'Linterna con pilas de repuesto',from: 'dia',       essential: true,  checked: false },
      { id: 'navaja',     name: 'Navaja o cuchillo de campo',    from: 'dia',       essential: true,  checked: false },
      { id: 'espejo',     name: 'Espejo de señalización',        from: 'pernocte',  essential: false, checked: false },
      { id: 'radio',      name: 'Radio o handy',                 from: 'expedicion',essential: false, checked: false },
      { id: 'pln',        name: 'PLN / SPOT activado',           from: 'expedicion',essential: false, checked: false },
    ]},
    { name: 'Higiene y mínimo impacto', icon: '🌿', items: [
      { id: 'papel',  name: 'Papel higiénico biodegradable',    from: 'dia',       essential: true,  checked: false },
      { id: 'jabon',  name: 'Jabón biodegradable',               from: 'dia',       essential: false, checked: false },
      { id: 'bolsas', name: 'Bolsas herméticas para residuos',   from: 'dia',       essential: true,  checked: false },
      { id: 'palita', name: 'Palita (cathole)',                   from: 'pernocte',  essential: true,  checked: false },
      { id: 'gel',    name: 'Gel antibacterial',                  from: 'dia',       essential: false, checked: false },
    ]},
    { name: 'Documentación', icon: '📋', items: [
      { id: 'plan',               name: 'Plan de marcha dejado a alguien', from: 'dia',       essential: true,  checked: false },
      { id: 'dni',                name: 'DNI o documento',                  from: 'dia',       essential: true,  checked: false },
      { id: 'emergencia_contacto',name: 'Contacto de emergencia anotado',  from: 'dia',       essential: true,  checked: false },
      { id: 'seguro',             name: 'Seguro de accidentes activo',      from: 'pernocte',  essential: false, checked: false },
      { id: 'permisos',           name: 'Permisos de acceso (si aplica)',   from: 'dia',       essential: false, checked: false },
    ]},
  ];

  visibleItems = computed(() => {
    const trip  = this.tripType();
    const order: TripType[] = ['dia', 'pernocte', 'expedicion'];
    const idx   = order.indexOf(trip);
    return this.categories
      .map(cat => ({ ...cat, items: cat.items.filter(i => order.indexOf(i.from) <= idx) }))
      .filter(cat => cat.items.length > 0);
  });

  totalItems   = computed(() => this.visibleItems().reduce((a, c) => a + c.items.length, 0));
  checkedItems = computed(() => this.visibleItems().reduce((a, c) => a + c.items.filter(i => i.checked).length, 0));
  progress     = computed(() => this.totalItems() === 0 ? 0 : Math.round((this.checkedItems() / this.totalItems()) * 100));

  ngOnInit() { this.loadFromStorage(); }

  toggle(item: CheckItem) { item.checked = !item.checked; this.saveToStorage(); }

  resetAll() {
    this.categories.forEach(cat => cat.items.forEach(i => { i.checked = false; }));
    this.saveToStorage();
  }

  countChecked(items: CheckItem[]): number { return items.filter(i => i.checked).length; }

  print() { window.print(); }

  private saveToStorage() {
    const state: Record<string, boolean> = {};
    this.categories.forEach(cat => cat.items.forEach(i => { state[i.id] = i.checked; }));
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }

  private loadFromStorage() {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return;
    const state: Record<string, boolean> = JSON.parse(raw);
    this.categories.forEach(cat => cat.items.forEach(i => { if (i.id in state) i.checked = state[i.id]; }));
  }
}
