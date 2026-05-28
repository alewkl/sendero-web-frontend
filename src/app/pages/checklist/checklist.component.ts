import { Component, signal, computed, effect, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

type TripType = 'dia' | 'pernocte' | 'expedicion';

interface CheckItem {
  id: string;
  name: string;
  from: TripType;
  essential: boolean;
  checked: boolean;
}

interface Category {
  name: string;
  icon: string;
  items: CheckItem[];
}

const STORAGE_KEY = 'sendero_checklist';

@Component({
  selector: 'app-checklist',
  standalone: true,
  imports: [RouterLink, CommonModule, FormsModule],
  templateUrl: './checklist.component.html',
  styleUrl: './checklist.component.scss'
})
export class ChecklistComponent implements OnInit {

  tripType = signal<TripType>('pernocte');

  tripOptions: { id: TripType; label: string; icon: string; desc: string }[] = [
    { id: 'dia',        label: 'Salida de día',  icon: '🌤️', desc: 'Hasta 8 horas, sin pernoctar' },
    { id: 'pernocte',   label: 'Pernocte',        icon: '🌙', desc: '1 noche en campo' },
    { id: 'expedicion', label: 'Expedición',      icon: '🗺️', desc: '2 o más noches' },
  ];

  categories: Category[] = [
    {
      name: 'Navegación',
      icon: '🧭',
      items: [
        { id: 'brujula',   name: 'Brújula',                     from: 'dia',        essential: true,  checked: false },
        { id: 'mapa',      name: 'Mapa de la zona (impreso)',    from: 'dia',        essential: true,  checked: false },
        { id: 'gps',       name: 'GPS o celular cargado',        from: 'dia',        essential: false, checked: false },
        { id: 'bateria',   name: 'Batería externa',              from: 'pernocte',   essential: false, checked: false },
      ]
    },
    {
      name: 'Abrigo y ropa',
      icon: '🧥',
      items: [
        { id: 'base',      name: 'Ropa base (lana o sintética)', from: 'dia',        essential: true,  checked: false },
        { id: 'polar',     name: 'Polar o buzo',                 from: 'dia',        essential: true,  checked: false },
        { id: 'lluvia',    name: 'Capa impermeable',             from: 'dia',        essential: true,  checked: false },
        { id: 'gorro',     name: 'Gorro y guantes',              from: 'dia',        essential: false, checked: false },
        { id: 'saco',      name: 'Saco de dormir',               from: 'pernocte',   essential: true,  checked: false },
        { id: 'colchon',   name: 'Colchoneta aislante',          from: 'pernocte',   essential: true,  checked: false },
        { id: 'ropa_ext',  name: 'Ropa extra (muda completa)',   from: 'pernocte',   essential: true,  checked: false },
        { id: 'termicos',  name: 'Medias térmicas extra',        from: 'expedicion', essential: false, checked: false },
      ]
    },
    {
      name: 'Refugio',
      icon: '⛺',
      items: [
        { id: 'emergencia','name': 'Manta de emergencia',        from: 'dia',        essential: true,  checked: false },
        { id: 'carpa',     name: 'Carpa o tarp',                 from: 'pernocte',   essential: true,  checked: false },
        { id: 'estacas',   name: 'Estacas y vientos extra',      from: 'pernocte',   essential: false, checked: false },
        { id: 'bivy',      name: 'Bolsa bivy de emergencia',     from: 'expedicion', essential: false, checked: false },
      ]
    },
    {
      name: 'Agua',
      icon: '💧',
      items: [
        { id: 'agua_pers', name: 'Agua (2 L mínimo)',            from: 'dia',        essential: true,  checked: false },
        { id: 'botella',   name: 'Botella o hidratador',         from: 'dia',        essential: true,  checked: false },
        { id: 'filtro',    name: 'Filtro o pastillas potabilizadoras', from: 'dia',  essential: true,  checked: false },
        { id: 'olla',      name: 'Olla para hervir',             from: 'pernocte',   essential: false, checked: false },
        { id: 'agua_exp',  name: 'Agua extra (1 L/persona/día)', from: 'expedicion', essential: true,  checked: false },
      ]
    },
    {
      name: 'Alimentación',
      icon: '🍫',
      items: [
        { id: 'snacks',    name: 'Snacks energéticos',           from: 'dia',        essential: true,  checked: false },
        { id: 'comida_p',  name: 'Comida para pernocte',         from: 'pernocte',   essential: true,  checked: false },
        { id: 'cocina_k',  name: 'Kit de cocina (olla, cuchara)', from: 'pernocte',  essential: true,  checked: false },
        { id: 'combustible','name': 'Combustible / mechero',     from: 'pernocte',   essential: true,  checked: false },
        { id: 'raciones',  name: 'Raciones completas por día',   from: 'expedicion', essential: true,  checked: false },
        { id: 'especias',  name: 'Sal, aceite y especias',       from: 'expedicion', essential: false, checked: false },
      ]
    },
    {
      name: 'Seguridad y emergencias',
      icon: '🆘',
      items: [
        { id: 'botiquin',  name: 'Botiquín de campo',            from: 'dia',        essential: true,  checked: false },
        { id: 'encendedor','name': 'Encendedor (x2)',            from: 'dia',        essential: true,  checked: false },
        { id: 'silbato',   name: 'Silbato',                      from: 'dia',        essential: true,  checked: false },
        { id: 'linterna',  name: 'Linterna con pilas de repuesto', from: 'dia',      essential: true,  checked: false },
        { id: 'navaja',    name: 'Navaja o cuchillo de campo',   from: 'dia',        essential: true,  checked: false },
        { id: 'espejo',    name: 'Espejo de señalización',       from: 'pernocte',   essential: false, checked: false },
        { id: 'radio',     name: 'Radio o handy',                from: 'expedicion', essential: false, checked: false },
        { id: 'pln',       name: 'PLN / SPOT activado',          from: 'expedicion', essential: false, checked: false },
      ]
    },
    {
      name: 'Higiene y mínimo impacto',
      icon: '🌿',
      items: [
        { id: 'papel',     name: 'Papel higiénico biodegradable', from: 'dia',       essential: true,  checked: false },
        { id: 'jabon',     name: 'Jabón biodegradable',           from: 'dia',       essential: false, checked: false },
        { id: 'bolsas',    name: 'Bolsas herméticas para residuos', from: 'dia',     essential: true,  checked: false },
        { id: 'palita',    name: 'Palita (cathole)',              from: 'pernocte',   essential: true,  checked: false },
        { id: 'gel',       name: 'Gel antibacterial',            from: 'dia',        essential: false, checked: false },
      ]
    },
    {
      name: 'Documentación',
      icon: '📋',
      items: [
        { id: 'plan',      name: 'Plan de marcha dejado a alguien', from: 'dia',     essential: true,  checked: false },
        { id: 'dni',       name: 'DNI o documento',               from: 'dia',       essential: true,  checked: false },
        { id: 'emergencia_contacto', name: 'Contacto de emergencia anotado', from: 'dia', essential: true, checked: false },
        { id: 'seguro',    name: 'Seguro de accidentes activo',   from: 'pernocte',   essential: false, checked: false },
        { id: 'permisos',  name: 'Permisos de acceso (si aplica)', from: 'dia',      essential: false, checked: false },
      ]
    },
  ];

  visibleItems = computed(() => {
    const trip = this.tripType();
    const order: TripType[] = ['dia', 'pernocte', 'expedicion'];
    const tripIndex = order.indexOf(trip);
    return this.categories.map(cat => ({
      ...cat,
      items: cat.items.filter(item => order.indexOf(item.from) <= tripIndex)
    })).filter(cat => cat.items.length > 0);
  });

  totalItems   = computed(() => this.visibleItems().reduce((acc, cat) => acc + cat.items.length, 0));
  checkedItems = computed(() => this.visibleItems().reduce((acc, cat) => acc + cat.items.filter(i => i.checked).length, 0));
  progress     = computed(() => this.totalItems() === 0 ? 0 : Math.round((this.checkedItems() / this.totalItems()) * 100));

  ngOnInit() {
    this.loadFromStorage();
    effect(() => {
      this.tripType();
      // trigger computed refresh
    });
  }

  toggle(item: CheckItem) {
    item.checked = !item.checked;
    this.saveToStorage();
  }

  resetAll() {
    this.categories.forEach(cat => cat.items.forEach(item => item.checked = false));
    this.saveToStorage();
  }

  private saveToStorage() {
    const state: Record<string, boolean> = {};
    this.categories.forEach(cat => cat.items.forEach(item => { state[item.id] = item.checked; }));
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }

  private loadFromStorage() {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return;
    const state: Record<string, boolean> = JSON.parse(raw);
    this.categories.forEach(cat => cat.items.forEach(item => {
      if (item.id in state) item.checked = state[item.id];
    }));
  }

  countChecked(items: CheckItem[]): number {
    return items.filter(i => i.checked).length;
  }

  print() {
    window.print();
  }
}
