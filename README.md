# NewsExplorer Frontend

NewsExplorer es un servicio que permite buscar noticias por palabra clave y guardarlas en tu cuenta personal.

## Índice

- [Empezando](#empezando)
  - [Prerrequisitos](#prerrequisitos)
  - [Instalación](#instalación)
- [Uso](#uso)
- [Despliegue](#despliegue)

## Empezando

Estas instrucciones te permitirán obtener una copia del proyecto en funcionamiento en tu máquina local para fines de desarrollo y prueba. Consulte [Despliegue](#despliegue) para obtener más información sobre cómo desplegar el proyecto en GitHub Pages.

### Prerrequisitos

Una lista de dependencias que requiere el proyecto, junto con enlaces a cualquier documentación relevante.

- [React](https://reactjs.org/)
- [React Router](https://reacttraining.com/react-router/web/guides/quick-start)
- [SASS](https://sass-lang.com/)
- [gh-pages](https://www.npmjs.com/package/gh-pages)
- [eslint](https://eslint.org/)

### Instalación

Instrucciones paso a paso para instalar las dependencias y configurar el proyecto:

1. Clone el repositorio: `git clone https://github.com/aegisnull/news-explorer-frontend.git`
2. Instale las dependencias: `npm install`
3. Cree el proyecto: `npm run build`

## Uso

Los comandos para ejecutar el proyecto en modo de desarrollo y producción:

- `npm run start` - Ejecuta el proyecto en modo de desarrollo.
- `npm run build` - Crea el proyecto en modo de producción.

## Despliegue

Instrucciones para desplegar el proyecto en GitHub Pages:

Dado que el proyecto se despliega en GitHub Pages, es necesario configurar el archivo `package.json` para que el script `deploy` apunte a la rama `gh-pages`:

```json
"scripts": {
  "deploy": "gh-pages -d build -b gh-pages"
}
```

Una vez configurado, el proyecto se puede desplegar ejecutando el comando `npm run deploy`.
