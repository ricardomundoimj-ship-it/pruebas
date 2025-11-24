# Cotizador - OBP

Proyecto React con TypeScript y Tailwind CSS que recrea la pantalla de cotización del sistema OBP basado en el diseño de Figma.

## Tecnologías

- React 19
- TypeScript
- Vite
- Tailwind CSS
- Open Sans (Google Fonts)

## Instalación

```bash
npm install
```

## Desarrollo

```bash
npm run dev
```

El proyecto se ejecutará en `http://localhost:5173`

## Construcción

```bash
npm run build
```

## Estructura del Proyecto

```
src/
├── components/
│   ├── Cotizador.tsx      # Componente principal
│   ├── Sidebar.tsx         # Barra lateral de navegación
│   ├── Header.tsx          # Encabezado con información de campaña
│   ├── MainContent.tsx    # Contenido principal
│   ├── InvestmentCards.tsx # Cards de inversión por tipo de medio
│   ├── MediaList.tsx      # Lista de medios seleccionados
│   └── DetailView.tsx     # Vista detallada (Frame 1102) con tabs
├── App.tsx
├── main.tsx
└── index.css
```

## Diseño

El diseño está basado en Figma y recrea fielmente:
- Barra del navegador (Chrome)
- Sidebar de navegación con logo OBP
- Header con información de campaña y acciones
- Cards de inversión por tipo de medio (Sitios Fijos, Camiones Urbanos, Medios Indoor, Vallas Móviles)
- Sección de inversión total y descuentos
- Lista de medios seleccionados
- Vista detallada con tabs (Plaza, Fechas, Plazo y Bonus, Renta, Extras, Comisión de agencia, Resumen)

## Colores

Los colores están definidos en `tailwind.config.js` según el sistema de diseño:
- Azul: `#3658C1` (regular), `#28408F` (dark), `#E1EBF9` (medium), `#F1F4FF` (light)
- Verde: `#039B59` (regular), `#077444` (dark), `#DFF6ED` (medium)
- Grises: `#131313` (black-dark), `#252525` (primary), `#4F4F4F` (black-medium), `#929292` (black-light), `#EFEFEF` (silver-regular), `#F5F5F5` (silver-light)

## Notas

- Los assets (imágenes y SVGs) están en la carpeta `public/`
- El diseño es estático (sin interacciones) excepto por el Frame 1102 y la sección de Plazo y Bonus que tendrán acciones en el futuro
- Todos los componentes están creados desde cero sin librerías de componentes externas

