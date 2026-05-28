import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cocina',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './cocina.component.html',
  styleUrl: './cocina.component.scss'
})
export class CocinaComponent {

  methods = [
    {
      name: 'Asado directo sobre brasas',
      icon: '🥩',
      level: 'Básico',
      levelClass: 'easy',
      desc: 'Las brasas deben estar blancas, sin llama. Colocá la parrilla improvisada (ramas verdes o rejas) a 15–20 cm. Rápido y eficiente para carnes y vegetales.'
    },
    {
      name: 'Horno de tierra (hangi)',
      icon: '🫙',
      level: 'Avanzado',
      levelClass: 'hard',
      desc: 'Excavá un hoyo, calentá piedras al fuego, colocalas en el fondo, agregá los alimentos envueltos en hojas húmedas y cubrí con tierra. Cocción lenta de 2–4 horas. Resultado excepcional.'
    },
    {
      name: 'Palo y envuelto',
      icon: '🌽',
      level: 'Básico',
      levelClass: 'easy',
      desc: 'Enrollá masa, vegetales o carne alrededor de un palo verde pelado. Sostené sobre las llamas girando constantemente. Ideal para harinas simples como damper o masa de bannock.'
    },
    {
      name: 'Olla sobre fuego',
      icon: '🍲',
      level: 'Básico',
      levelClass: 'easy',
      desc: 'El método más versátil. Construí un fogón con tres piedras del mismo tamaño para apoyar la olla. El fuego debe estar debajo, no al costado. Usá leña seca para llama pareja.'
    },
    {
      name: 'Piedra caliente',
      icon: '🪨',
      level: 'Intermedio',
      levelClass: 'medium',
      desc: 'Calentá una piedra plana directamente en el fuego durante 30 min. Colocala cerca de las brasas y usala como plancha para tortillas, huevos o vegetales finos. Evitá piedras porosas o húmedas: pueden estallar.'
    },
    {
      name: 'Cocción en papillote',
      icon: '🐟',
      level: 'Básico',
      levelClass: 'easy',
      desc: 'Envolvé los alimentos en papel aluminio o en hojas grandes (banana, higo). Colocá directamente sobre brasas o enterrá bajo ellas. Conserva jugos y aromas. Ideal para pescado y vegetales.'
    },
  ];

  recipes = [
    {
      name: 'Bannock (pan de campo)',
      icon: '🍞',
      time: '20 min',
      ingredients: ['2 tazas de harina', '1 cdta de polvo de hornear', 'Pizca de sal', 'Agua hasta ligar'],
      steps: ['Mezclá los ingredientes secos', 'Agregá agua de a poco hasta formar una masa que no se pegue', 'Podés cocinarlo en sartén tapada, en palo, o sobre piedra caliente'],
    },
    {
      name: 'Guiso de emergencia',
      icon: '🍲',
      time: '35 min',
      ingredients: ['Legumbres o granos precocidos', 'Vegetales durables (cebolla, ajo, papa)', 'Sal y especias', 'Aceite o grasa'],
      steps: ['Rehogá cebolla y ajo en aceite', 'Agregá los vegetales cortados en trozos', 'Añadí agua y legumbres, cociná hasta que todo esté tierno', 'Condimentá al final'],
    },
    {
      name: 'Té de monte',
      icon: '🍵',
      time: '10 min',
      ingredients: ['Agua limpia hervida', 'Hierbas silvestres identificadas (menta, cedrón, manzanilla)', 'Opcional: miel o azúcar'],
      steps: ['Herví el agua', 'Dejá reposar las hierbas en el agua caliente 5 min tapado', 'Filtrá y bebé caliente — ayuda a la hidratación y al calor corporal'],
    },
  ];

  tips = [
    { icon: '🌿', tip: 'Nunca consumas plantas o hongos silvestres sin identificación segura. La duda es motivo suficiente para no comerlo.' },
    { icon: '💧', tip: 'Toda el agua para cocinar debe ser tratada primero: hervirla es el método más confiable en campo.' },
    { icon: '🔥', tip: 'Un buen fogón de cocina tiene llama pareja y baja. El fuego grande es para calor, no para cocinar.' },
    { icon: '🧂', tip: 'La sal y el aceite son los dos ingredientes más valiosos en el botiquín de cocina. Siempre lleválos.' },
    { icon: '🪓', tip: 'Cortá la leña en piezas parejas para controlar mejor la intensidad del fuego.' },
    { icon: '🗑️', tip: 'Todo residuo de comida debe salir del campamento o enterrarse a 60 m y 20 cm de profundidad.' },
  ];
}
