# Sendero — Contexto del proyecto

Web Angular sobre supervivencia, campismo y artes al aire libre. Estética "scout" sin mencionar scouts explícitamente. Paleta tierra/bosque.

## Stack
- Angular 17, standalone components, lazy loading por ruta
- SCSS con variables CSS globales en `src/styles.scss`
- Fuentes Google: **Merriweather** (títulos serif) + **Open Sans** (cuerpo) + **Special Elite** (display/headers)
- Sin librerías de UI externas, todo custom

## Estructura de rutas
| Ruta | Componente | Estado |
|------|-----------|--------|
| `/` | HomeComponent | Completo |
| `/supervivencia` | SupervivenciaComponent | Completo |
| `/campismo` | CampismoComponent | En construcción |
| `/navegacion` | NavegacionComponent | En construcción |
| `/nudos` | NudosComponent | En construcción |
| `/primeros-auxilios` | PrimerosAuxiliosComponent | En construcción |
| `/cocina` | CocinaComponent | En construcción |

## Estructura de carpetas
```
src/app/
  pages/
    home/
    supervivencia/       ← única sección con contenido real
    campismo/
    navegacion/
    nudos/
    primeros-auxilios/
    cocina/
  shared/
    navbar/              ← fixed, scroll-aware, responsive con hamburguesa
    footer/
```

## Paleta de colores (variables CSS)
```
--forest-dark: #1e3a0f    (fondos oscuros)
--forest-mid:  #2d5a1b    (acento principal)
--gold:        #c4860a    (acento dorado)
--gold-light:  #e8a820
--cream:       #f5f0e6    (fondo claro)
--tan-light:   #e8d8bc    (bordes, texto secundario)
--text-dark:   #2a1f12
```

## Estilos compartidos
- Clases globales en `src/styles.scss`: `.container`, `.section-title`, `.badge-chip`, `.btn-primary`, `.btn-outline`
- Estilos para páginas WIP en `src/styles.scss` bajo `.wip-page` — usarlos para nuevas secciones mientras no tienen contenido

## Netlify
- `netlify.toml` en la raíz: build command `npm run build`, publish `dist/sendero/browser`, redirect SPA `/* → /index.html 200`
- No hace falta archivo `_redirects` separado

## Cómo agregar una nueva sección
1. El componente ya existe en `src/app/pages/<seccion>/`
2. Reemplazar el HTML del template WIP con contenido real siguiendo el patrón de `supervivencia.component`
3. Cambiar `wip: true` a `wip: false` en el array `sections` de `home.component.ts`
4. Agregar estilos en el `.scss` del componente (budget: 12kb max)

## Comandos
```bash
npm start          # dev server en http://localhost:4200
npm run build      # build de producción → dist/sendero/browser/
```
