# 🔴 PokéSearch

Aplicación React que consume la [PokéAPI](https://pokeapi.co/) para buscar Pokémon por nombre o ID.

## ✨ Funcionalidades

- Búsqueda por nombre (`pikachu`) o ID (`25`)
- Presionar **Enter** o el botón **Buscar** dispara la petición
- **Loading spinner** mientras se espera la respuesta
- **Card** con imagen oficial, tipos, estadísticas y habilidades
- **Mensaje de error** si el Pokémon no existe

## 🗂️ Estructura de carpetas

```
src/
├── App.jsx              # Componente raíz — maneja el estado y la URL
├── main.jsx             # Entry point con ThemeProvider de MUI
├── components/
│   ├── Input.jsx        # Campo de texto + botón de búsqueda (recibe props del padre)
│   └── Card.jsx         # Tarjeta con resultado del Pokémon (recibe data del padre)
└── hooks/
    └── useFetch.js      # Hook personalizado: maneja loading / data / error
```

## 🧠 Conceptos aplicados

| Concepto | Uso |
|---|---|
| `useState` | Almacena el `query` de búsqueda en `App.jsx` |
| `useEffect` | Dispara el fetch cada vez que cambia la URL en `useFetch.js` |
| `useFetch` | Hook personalizado reutilizable que encapsula toda la lógica de petición |
| Props padre → hijo | `App` pasa `onSearch` y `loading` a `Input`; pasa `data` a `Card` |
| Material UI | Todos los componentes visuales (TextField, Button, Card, CircularProgress, Alert) |

## 🚀 Cómo correr el proyecto

```bash
npm install
npm run dev
```

## 🌐 API utilizada

[PokéAPI](https://pokeapi.co/) — `https://pokeapi.co/api/v2/pokemon/{nombre-o-id}`
