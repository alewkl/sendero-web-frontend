import { Component, computed, signal, input } from '@angular/core';
import { RouterLink } from '@angular/router';

export interface QuizQuestion {
  section: string;
  sectionLabel: string;
  question: string;
  options: string[];
  correct: number;
  explanation: string;
}

type QuizState = 'start' | 'playing' | 'result';

@Component({
  selector: 'app-quiz',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './quiz.component.html',
  styleUrl: './quiz.component.scss'
})
export class QuizComponent {
  embedded = input(false);

  state = signal<QuizState>('start');
  selectedSection = signal<string>('todas');
  currentIndex = signal(0);
  selectedAnswer = signal<number | null>(null);
  answers = signal<boolean[]>([]);
  showExplanation = signal(false);

  readonly sections = [
    { id: 'todas',           label: 'Todas',           icon: '🎯' },
    { id: 'supervivencia',   label: 'Supervivencia',   icon: '🔥' },
    { id: 'campismo',        label: 'Campismo',        icon: '⛺' },
    { id: 'navegacion',      label: 'Navegación',      icon: '🧭' },
    { id: 'nudos',           label: 'Nudos',           icon: '🪢' },
    { id: 'primeros-auxilios', label: 'Primeros Auxilios', icon: '🩹' },
    { id: 'cocina',          label: 'Cocina',          icon: '🍳' },
    { id: 'botanica',        label: 'Botánica',        icon: '🌿' },
    { id: 'meteorologia',    label: 'Meteorología',    icon: '🌦️' },
  ];

  readonly allQuestions: QuizQuestion[] = [
    // SUPERVIVENCIA
    {
      section: 'supervivencia', sectionLabel: 'Supervivencia',
      question: '¿Qué indica la "Regla del 3" en supervivencia?',
      options: [
        '3 minutos sin aire, 3 horas sin abrigo, 3 días sin agua, 3 semanas sin comida',
        '3 días sin agua, 3 semanas sin comida, 3 meses sin movimiento',
        '3 intentos de señal, 3 refugios alternativos, 3 fuentes de agua',
        '3 horas de marcha, 3 horas de descanso, 3 litros de agua'
      ],
      correct: 0,
      explanation: 'La Regla del 3 establece las prioridades de supervivencia: 3 minutos sin aire, 3 horas expuesto al frío extremo, 3 días sin agua y 3 semanas sin comida.'
    },
    {
      section: 'supervivencia', sectionLabel: 'Supervivencia',
      question: '¿Cuál es el método más seguro para purificar agua en el campo sin químicos?',
      options: [
        'Filtrarla con tela y dejarla reposar 24 horas',
        'Hervirla durante al menos 1 minuto (3 min en alturas)',
        'Exponerla al sol en botella transparente 6 horas',
        'Agregarle sal y removerla vigorosamente'
      ],
      correct: 1,
      explanation: 'Hervir el agua es el método más confiable. Al menos 1 minuto de hervor (3 minutos sobre los 2000 m de altitud) elimina bacterias, virus y parásitos.'
    },
    {
      section: 'supervivencia', sectionLabel: 'Supervivencia',
      question: '¿Cómo debe ser un refugio de emergencia para conservar el calor corporal?',
      options: [
        'Grande y ventilado para evitar humedad',
        'Elevado sobre el suelo con apertura al norte',
        'Pequeño y ajustado al cuerpo para retener el calor',
        'Construido en la cima para captar el sol'
      ],
      correct: 2,
      explanation: 'Un refugio de emergencia debe ser lo más pequeño posible, apenas del tamaño del cuerpo. El calor corporal calienta el espacio reducido mucho más eficientemente.'
    },
    {
      section: 'supervivencia', sectionLabel: 'Supervivencia',
      question: '¿Cuál es la señal de socorro internacionalmente reconocida?',
      options: [
        'Una fogata humeante con madera verde',
        'Tres señales en triángulo (tres disparos, tres fogatas, SOS)',
        'Agitar ropa de colores brillantes continuamente',
        'Un espejo reflejando luz solo en dirección a aviones'
      ],
      correct: 1,
      explanation: 'El principio universal de socorro es TRES de cualquier cosa: tres disparos, tres fogatas en triángulo, o la señal SOS. Tres señales siempre significa "necesito ayuda".'
    },
    {
      section: 'supervivencia', sectionLabel: 'Supervivencia',
      question: '¿En qué situación se debe usar un torniquete?',
      options: [
        'En cualquier herida con sangrado visible',
        'Solo cuando la herida está en la cabeza o cuello',
        'Como último recurso en hemorragias que amenazan la vida en extremidades',
        'Preventivamente antes de maniobras de rescate'
      ],
      correct: 2,
      explanation: 'El torniquete es el último recurso para hemorragias severas en extremidades que no se controlan con presión directa. Una vez colocado, se anota la hora y no se retira en campo.'
    },

    // CAMPISMO
    {
      section: 'campismo', sectionLabel: 'Campismo',
      question: '¿A qué distancia mínima de cuerpos de agua se debe establecer el campamento?',
      options: ['10 metros', '30 metros', '60 metros', '200 metros'],
      correct: 2,
      explanation: 'El principio Leave No Trace recomienda acampar a al menos 60 metros (200 pies) de lagos, ríos y senderos para proteger la vegetación ribereña y minimizar el impacto.'
    },
    {
      section: 'campismo', sectionLabel: 'Campismo',
      question: '¿Cómo debe orientarse la entrada de la carpa respecto al viento predominante?',
      options: [
        'De frente al viento para ventilación',
        'De espaldas al viento para protección',
        'Perpendicular al viento para estabilidad',
        'La orientación no afecta el rendimiento'
      ],
      correct: 1,
      explanation: 'La entrada debe dar la espalda al viento dominante. Esto evita que el viento entre directamente a la carpa, reduce el frío y facilita el encendido de hornillo exterior.'
    },
    {
      section: 'campismo', sectionLabel: 'Campismo',
      question: '¿Dónde se debe almacenar la comida por la noche en zona de fauna silvestre?',
      options: [
        'Dentro de la carpa, bien cerrada',
        'Enterrada a 50 cm de profundidad',
        'Colgada en árbol a 4 m del suelo y 2 m de las ramas',
        'En contenedor sellado junto a la fogata'
      ],
      correct: 2,
      explanation: 'En zonas con osos u otros animales, la comida debe colgarse: al menos 4 metros del suelo, 2 metros de las ramas laterales y a 50 metros del campamento.'
    },
    {
      section: 'campismo', sectionLabel: 'Campismo',
      question: '¿Qué principio resume el Leave No Trace (LNT)?',
      options: [
        'No dejar basura visible en el campamento',
        'Minimizar el impacto humano en el entorno natural',
        'Acampar solo en zonas oficialmente habilitadas',
        'No hacer fogatas en ningún caso'
      ],
      correct: 1,
      explanation: 'Leave No Trace es una filosofía de 7 principios que busca minimizar el impacto en la naturaleza: planificación, superficies resistentes, gestión de residuos, fauna, fogatas responsables y respeto.'
    },
    {
      section: 'campismo', sectionLabel: 'Campismo',
      question: '¿Cuál es la mejor ubicación para elegir el sitio de campamento?',
      options: [
        'En un lecho de río seco para tener agua cerca',
        'En la cima para visibilidad y drenaje',
        'En una zona plana, protegida del viento, alejada de peligros naturales',
        'En la ladera sur para recibir sol todo el día'
      ],
      correct: 2,
      explanation: 'Un buen sitio es plano (para dormir cómodo), protegido del viento, alejado de riscos, árboles muertos y cauces de agua que puedan inundarse.'
    },

    // NAVEGACIÓN
    {
      section: 'navegacion', sectionLabel: 'Navegación',
      question: '¿Hacia dónde apunta la aguja magnética de una brújula?',
      options: [
        'Al norte geográfico (Polo Norte real)',
        'Al norte magnético (Polo Norte magnético)',
        'Al sur magnético',
        'Siempre apunta en la dirección del viento predominante'
      ],
      correct: 1,
      explanation: 'La aguja roja apunta al norte magnético, que difiere del norte geográfico. La diferencia se llama declinación magnética y varía según la ubicación en el planeta.'
    },
    {
      section: 'navegacion', sectionLabel: 'Navegación',
      question: '¿Qué representan las curvas de nivel en un mapa topográfico?',
      options: [
        'Caminos y senderos habilitados',
        'Ríos y cuerpos de agua',
        'Líneas que unen puntos de igual altitud',
        'Límites entre tipos de vegetación'
      ],
      correct: 2,
      explanation: 'Las curvas de nivel unen puntos de igual altitud. Cuando están muy juntas indican pendiente pronunciada; cuando están separadas, terreno suave o llano.'
    },
    {
      section: 'navegacion', sectionLabel: 'Navegación',
      question: '¿Cómo se puede orientar con el sol al mediodía en el hemisferio sur?',
      options: [
        'El sol señala al sur',
        'El sol señala al norte',
        'El sol señala al este',
        'El sol no sirve para orientarse al mediodía'
      ],
      correct: 1,
      explanation: 'En el hemisferio sur, el sol al mediodía está al norte. A la inversa del hemisferio norte donde está al sur. Esta diferencia es clave para orientarse sin brújula.'
    },
    {
      section: 'navegacion', sectionLabel: 'Navegación',
      question: '¿Qué estrella se usa para encontrar el norte en el hemisferio norte?',
      options: ['Sirio', 'Vega', 'Polaris (Estrella Polar)', 'Canopus'],
      correct: 2,
      explanation: 'Polaris (Estrella Polar) está casi directamente sobre el Polo Norte celestial y apenas se mueve durante la noche. Siempre indica el norte con una precisión de menos de 1°.'
    },
    {
      section: 'navegacion', sectionLabel: 'Navegación',
      question: '¿Qué indica la separación entre curvas de nivel muy cercanas?',
      options: [
        'Terreno plano o muy suave',
        'Zona anegadiza o pantanosa',
        'Pendiente pronunciada o acantilado',
        'Cambio de tipo de suelo'
      ],
      correct: 2,
      explanation: 'Curvas muy juntas = pendiente empinada. Cuando se superponen en el mapa, indica un acantilado. Esta lectura es esencial para planificar rutas y evitar terreno peligroso.'
    },

    // NUDOS
    {
      section: 'nudos', sectionLabel: 'Nudos y Amarres',
      question: '¿Para qué se usa principalmente el nudo ballestrinque?',
      options: [
        'Para unir dos cuerdas de diferente grosor',
        'Para asegurar una cuerda a un poste o árbol',
        'Para hacer un lazo que no se deslice',
        'Para anclar una tienda de campaña al suelo'
      ],
      correct: 1,
      explanation: 'El ballestrinque es perfecto para asegurar una cuerda a un poste, árbol o barandal. Es rápido de hacer y fácil de deshacer, pero puede aflojarse si la carga varía constantemente.'
    },
    {
      section: 'nudos', sectionLabel: 'Nudos y Amarres',
      question: '¿Cuál es la característica principal del nudo as de guía (bowline)?',
      options: [
        'Se aprieta bajo carga y no se puede deshacer',
        'Forma un lazo fijo que no se cierra ni se desliza',
        'Unicamente sirve para cuerdas mojadas',
        'Se usa exclusivamente en pesca deportiva'
      ],
      correct: 1,
      explanation: 'El as de guía forma un lazo fijo que no se cierra ni se desliza, sin importar la carga. Es uno de los nudos más importantes: se usa en rescates, escalada y anclajes de carpa.'
    },
    {
      section: 'nudos', sectionLabel: 'Nudos y Amarres',
      question: '¿Qué nudo se recomienda para unir dos cuerdas del mismo grosor?',
      options: [
        'Nudo ballestrinque',
        'As de guía (bowline)',
        'Nudo recto (cuadrado)',
        'Nudo prusik'
      ],
      correct: 2,
      explanation: 'El nudo recto (o cuadrado) es ideal para unir dos cuerdas del mismo diámetro. Para cuerdas de distinto grosor, es preferible la vuelta de escota, que es más segura.'
    },
    {
      section: 'nudos', sectionLabel: 'Nudos y Amarres',
      question: '¿Para qué se usa el nudo prusik?',
      options: [
        'Para anclar la carpa en suelo duro',
        'Para ascender o descender controladamente por una cuerda fija',
        'Para atar paquetes y bultos con seguridad',
        'Para pescar en corrientes fuertes'
      ],
      correct: 1,
      explanation: 'El prusik es un nudo de fricción: se desliza cuando no hay carga y se bloquea cuando tira. Fundamental en escalada, rappel y rescate en montaña para ascender o asegurarse.'
    },

    // PRIMEROS AUXILIOS
    {
      section: 'primeros-auxilios', sectionLabel: 'Primeros Auxilios',
      question: '¿A qué ritmo se realizan las compresiones en RCP para adultos?',
      options: ['60-80 por minuto', '100-120 por minuto', '140-160 por minuto', '50-60 por minuto'],
      correct: 1,
      explanation: 'La RCP actual recomienda 100-120 compresiones por minuto, profundidad de 5-6 cm, y permitir la reexpansión completa del tórax. El ritmo de la canción "Stayin\' Alive" es una referencia útil.'
    },
    {
      section: 'primeros-auxilios', sectionLabel: 'Primeros Auxilios',
      question: '¿Qué significa la sigla SAMPLE en la evaluación de un paciente?',
      options: [
        'Síntomas, Alergias, Medicamentos, Patologías, Última ingesta, Eventos previos',
        'Sangrado, Alerta, Movimiento, Pulso, Lesiones, Estado',
        'Signos, Anamnesis, Medidas, Posición, Lesiones, Evacuación',
        'Sistema, Alergia, Medicación, Posición, Luxaciones, Emergencia'
      ],
      correct: 0,
      explanation: 'SAMPLE es el acrónimo para la anamnesis rápida: Síntomas actuales, Alergias conocidas, Medicamentos que toma, Patologías previas, Última ingesta de alimentos, y Eventos que llevaron al incidente.'
    },
    {
      section: 'primeros-auxilios', sectionLabel: 'Primeros Auxilios',
      question: '¿Cuál es el tratamiento correcto para una quemadura de primer grado?',
      options: [
        'Aplicar hielo directamente sobre la quemadura',
        'Cubrir con un vendaje apretado',
        'Enfriar con agua fría corriente durante 10-20 minutos',
        'Aplicar manteca, aceite o pasta dental'
      ],
      correct: 2,
      explanation: 'Las quemaduras de primer grado se tratan con agua fría corriente (no helada) durante 10-20 minutos. El hielo puede causar quemadura por frío y empeorar el daño. Nunca aplicar grasas.'
    },
    {
      section: 'primeros-auxilios', sectionLabel: 'Primeros Auxilios',
      question: '¿Cómo se extrae correctamente el aguijón de una abeja?',
      options: [
        'Presionando y exprimiendo para sacar el veneno',
        'Con pinzas, agarrando el aguijón con firmeza',
        'Raspando con una tarjeta o uña para no comprimir el saco de veneno',
        'Succionando con la boca'
      ],
      correct: 2,
      explanation: 'Se debe raspar el aguijón lateralmente (con una tarjeta, uña o cuchillo plano) sin pellizcar. Pellizcar el saco de veneno con pinzas inyecta más veneno en la herida.'
    },
    {
      section: 'primeros-auxilios', sectionLabel: 'Primeros Auxilios',
      question: '¿En qué posición se coloca a una persona inconsciente que respira normalmente?',
      options: [
        'Boca abajo con la cabeza girada',
        'Boca arriba sin ninguna modificación',
        'Sentado con la cabeza entre las rodillas',
        'Posición lateral de seguridad (de recuperación)'
      ],
      correct: 3,
      explanation: 'La posición lateral de seguridad mantiene abierta la vía aérea y previene la aspiración en caso de vómito. Es la posición estándar para inconscientes que respiran pero no responden.'
    },

    // COCINA
    {
      section: 'cocina', sectionLabel: 'Cocina al Fuego',
      question: '¿Cuándo está lista la brasa para cocinar carnes o verduras?',
      options: [
        'Cuando las llamas son altas y de color naranja brillante',
        'Cuando el carbón está completamente negro y sin brillo',
        'Cuando las brasas están rojas o cubiertas de ceniza gris sin llama visible',
        'Al inicio del fuego, aprovechando el calor máximo'
      ],
      correct: 2,
      explanation: 'La brasa ideal no tiene llama. Cuando el carbón está cubierto de ceniza gris o rojo brillante sin llama, el calor es uniforme y controlado, perfecto para cocinar sin quemar.'
    },
    {
      section: 'cocina', sectionLabel: 'Cocina al Fuego',
      question: '¿Qué es el método de cocción con horno holandés (Dutch oven)?',
      options: [
        'Hervir alimentos directamente sobre el fuego en olla abierta',
        'Envolver alimentos en hojas húmedas y enterrarlos con brasas',
        'Cocinar en olla de hierro fundido tapada, con brasas arriba y abajo',
        'Ahumar carnes en frío durante varias horas'
      ],
      correct: 2,
      explanation: 'El Dutch oven es una olla de hierro fundido con tapa. Se colocan brasas debajo y encima de la tapa, creando un horno portátil. Permite hacer pan, estofados, pasteles y asados en campo.'
    },
    {
      section: 'cocina', sectionLabel: 'Cocina al Fuego',
      question: '¿Cómo se puede hacer pan sin horno en el campo?',
      options: [
        'Solo es posible con un horno de piedras construido en campo',
        'Enrollando la masa alrededor de un palo verde y cocinando sobre brasas',
        'Friéndolo en abundante aceite en sartén',
        'No es posible hacer pan sin horno'
      ],
      correct: 1,
      explanation: 'El "pan de palo" es una técnica scout clásica: se hace una masa básica con harina, agua y sal, se enrolla en espiral alrededor de un palo verde (para evitar sabor), y se cocina girando sobre brasas.'
    },
    {
      section: 'cocina', sectionLabel: 'Cocina al Fuego',
      question: '¿Cuánta agua por persona por día se recomienda llevar para beber y cocinar?',
      options: ['0.5-1 litro', '1-1.5 litros', '2-3 litros', '5-6 litros'],
      correct: 2,
      explanation: 'Se recomiendan 2-3 litros de agua potable por persona por día en condiciones normales. En calor intenso, ejercicio fuerte o altitudes elevadas, la necesidad puede superar los 4 litros.'
    },

    // BOTÁNICA
    {
      section: 'botanica', sectionLabel: 'Botánica Silvestre',
      question: '¿Cuál es la regla de oro para consumir plantas silvestres de forma segura?',
      options: [
        'Si los animales la comen, es segura para humanos',
        'Probar una pequeña cantidad y esperar 2 horas',
        'Identificar con total certeza usando al menos dos fuentes independientes',
        'Las plantas con flores blancas son generalmente seguras'
      ],
      correct: 2,
      explanation: 'La regla de oro es identificación 100% segura, confirmada con al menos dos fuentes. Nunca probar como método de comprobación. Muchas plantas tóxicas son similares a las comestibles.'
    },
    {
      section: 'botanica', sectionLabel: 'Botánica Silvestre',
      question: '¿Cuál de estas plantas es comestible y relativamente fácil de identificar?',
      options: [
        'Cicuta (Conium maculatum)',
        'Dedalera (Digitalis purpurea)',
        'Diente de León (Taraxacum officinale)',
        'Belladona (Atropa belladonna)'
      ],
      correct: 2,
      explanation: 'El diente de León es una de las plantas silvestres más seguras: sus hojas, flores y raíces son comestibles. Sus flores amarillas y hoja dentada característica son inconfundibles.'
    },
    {
      section: 'botanica', sectionLabel: 'Botánica Silvestre',
      question: '¿Para qué se usa el aloe vera en primeros auxilios de campo?',
      options: [
        'Para heridas profundas y cortes con sangrado',
        'Para quemaduras leves e irritaciones cutáneas',
        'Como antibiótico oral en infecciones',
        'Para calmar picaduras de araña o serpiente'
      ],
      correct: 1,
      explanation: 'El gel del aloe vera alivia quemaduras leves (sol, fuego superficial) e irritaciones cutáneas. Su efecto refrescante y antiinflamatorio es bien documentado. No es eficaz en heridas profundas.'
    },
    {
      section: 'botanica', sectionLabel: 'Botánica Silvestre',
      question: '¿Cómo se identifica la ortiga (Urtica dioica)?',
      options: [
        'Por sus flores rojas brillantes y aroma dulce',
        'Por sus hojas con pelillos urticantes y bordes fuertemente aserrados',
        'Por sus bayas azules agrupadas en racimos',
        'Por su tallo leñoso y hojas plateadas'
      ],
      correct: 1,
      explanation: 'La ortiga se identifica por sus hojas de bordes aserrados cubiertas de pelos urticantes que inyectan ácido fórmico al contacto. Paradójicamente, cocida o secada pierde su efecto urticante y es nutritiva.'
    },
    {
      section: 'botanica', sectionLabel: 'Botánica Silvestre',
      question: '¿Qué planta tóxica puede confundirse con ajo silvestre o acedera?',
      options: [
        'Romero (Rosmarinus officinalis)',
        'Lirio del Valle / Muguete (Convallaria majalis)',
        'Tomillo (Thymus vulgaris)',
        'Lavanda (Lavandula angustifolia)'
      ],
      correct: 1,
      explanation: 'El lirio del valle (muguete) puede confundirse con ajo silvestre u otras plantas comestibles. Es altamente tóxico: todos sus órganos contienen glucósidos cardíacos que pueden ser mortales.'
    },

    // METEOROLOGÍA
    {
      section: 'meteorologia', sectionLabel: 'Meteorología de Campo',
      question: '¿Qué tipo de nube es el principal indicador de tormenta inminente?',
      options: [
        'Cirrus (nubes altas y delgadas en filamentos)',
        'Altocumulus (nubes medias en copos)',
        'Cumulonimbus (grandes torres de tormenta)',
        'Stratus (capa gris uniforme a baja altitud)'
      ],
      correct: 2,
      explanation: 'El cumulonimbus es la "nube de tormenta" por excelencia. Su desarrollo vertical masivo (hasta 15 km) indica convección intensa: trae lluvia fuerte, granizo, rayos y vientos violentos.'
    },
    {
      section: 'meteorologia', sectionLabel: 'Meteorología de Campo',
      question: '¿Qué indica el viento girando en sentido de las agujas del reloj en el hemisferio norte?',
      options: [
        'Aproximación de frente frío y lluvia',
        'Mejora o estabilidad del tiempo (veering)',
        'Tormenta eléctrica en las próximas horas',
        'Niebla matutina que se disipará al mediodía'
      ],
      correct: 1,
      explanation: 'En el hemisferio norte, el viento que rota en sentido horario (veering) generalmente indica mejora del tiempo. El viento en sentido antihorario (backing) suele preceder a mal tiempo.'
    },
    {
      section: 'meteorologia', sectionLabel: 'Meteorología de Campo',
      question: '¿Qué indica una caída rápida de la presión barométrica?',
      options: [
        'Mejora del tiempo en las próximas horas',
        'Temperatura más baja pero tiempo estable',
        'Tormenta o mal tiempo inminente',
        'Solo un cambio estacional gradual'
      ],
      correct: 2,
      explanation: 'Una caída rápida de presión (>3 hPa en 3 horas) es uno de los indicadores más confiables de mal tiempo o tormenta próxima. Los barómetros portátiles son herramientas clave en montaña.'
    },
    {
      section: 'meteorologia', sectionLabel: 'Meteorología de Campo',
      question: '¿Qué son las nubes lenticulares?',
      options: [
        'Nubes de tormenta en forma de embudo o tornado',
        'Nubes en forma de lente que se forman sobre montañas con vientos fuertes',
        'Niebla baja que se forma en valles al amanecer',
        'Nubes de lluvia invernal típicas de latitudes altas'
      ],
      correct: 1,
      explanation: 'Las nubes lenticulares se forman cuando vientos fuertes cruzan una montaña, creando ondas de presión. Su forma de lente o platillo volante es inconfundible. Indican vientos fuertes en altura.'
    },
    {
      section: 'meteorologia', sectionLabel: 'Meteorología de Campo',
      question: '¿Qué señal de la naturaleza puede indicar lluvia próxima?',
      options: [
        'Las flores de diente de León abiertas completamente',
        'Los pájaros volando a gran altitud en círculos',
        'Las flores de trébol cerrando sus hojas',
        'Los insectos volando especialmente alto'
      ],
      correct: 2,
      explanation: 'El trébol (y otras plantas como la acedera) cierra sus hojas cuando la humedad aumenta antes de la lluvia. Esta capacidad higroscópica de ciertas plantas fue usada como "barómetro natural" por siglos.'
    },
  ];

  activeQuestions = signal<QuizQuestion[]>([]);

  currentQuestion = computed(() => this.activeQuestions()[this.currentIndex()]);
  isAnswered = computed(() => this.selectedAnswer() !== null);
  isCorrect = computed(() => this.selectedAnswer() === this.currentQuestion()?.correct);

  score = computed(() => this.answers().filter(Boolean).length);
  totalQuestions = computed(() => this.activeQuestions().length);
  percentage = computed(() => Math.round((this.score() / this.totalQuestions()) * 100));

  progressPercent = computed(() => {
    const total = this.totalQuestions();
    return total > 0 ? ((this.currentIndex()) / total) * 100 : 0;
  });

  startQuiz() {
    const section = this.selectedSection();
    const filtered = section === 'todas'
      ? this.shuffle([...this.allQuestions])
      : this.allQuestions.filter(q => q.section === section);

    this.activeQuestions.set(this.shuffle([...filtered]));
    this.currentIndex.set(0);
    this.selectedAnswer.set(null);
    this.answers.set([]);
    this.showExplanation.set(false);
    this.state.set('playing');
  }

  selectAnswer(index: number) {
    if (this.isAnswered()) return;
    this.selectedAnswer.set(index);
    this.showExplanation.set(true);
    this.answers.update(a => [...a, index === this.currentQuestion().correct]);
  }

  next() {
    const next = this.currentIndex() + 1;
    if (next >= this.totalQuestions()) {
      this.state.set('result');
    } else {
      this.currentIndex.set(next);
      this.selectedAnswer.set(null);
      this.showExplanation.set(false);
    }
  }

  restart() {
    this.state.set('start');
    this.selectedAnswer.set(null);
    this.answers.set([]);
    this.showExplanation.set(false);
  }

  getOptionClass(index: number): string {
    if (!this.isAnswered()) return '';
    const correct = this.currentQuestion().correct;
    if (index === correct) return 'correct';
    if (index === this.selectedAnswer()) return 'wrong';
    return 'dimmed';
  }

  getScoreMessage(): string {
    const pct = this.percentage();
    if (pct === 100) return '¡Perfecto! Eres un experto del sendero.';
    if (pct >= 80) return '¡Excelente! Tu conocimiento es sólido.';
    if (pct >= 60) return 'Bien hecho. Sigue practicando en el campo.';
    if (pct >= 40) return 'Hay espacio para crecer. ¡Repasa las secciones!';
    return 'Aún queda camino por recorrer. ¡No bajes los brazos!';
  }

  getStars(): number {
    const pct = this.percentage();
    if (pct >= 80) return 3;
    if (pct >= 50) return 2;
    return 1;
  }

  getSectionLabel(): string {
    return this.sections.find(s => s.id === this.selectedSection())?.label ?? 'Todas';
  }

  getSectionIcon(): string {
    return this.sections.find(s => s.id === this.selectedSection())?.icon ?? '🎯';
  }

  questionsForSection(sectionId: string): number {
    return this.allQuestions.filter(q => q.section === sectionId).length;
  }

  private shuffle<T>(arr: T[]): T[] {
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }
}
