
# RRChess
(En progreso)

React-Redux Chess es una pequeña implementación visual del engine Stockfish con distintos niveles de dificultad y base de datos para almacenar las partidas jugadas.


El proyecto es una migración del siguiente repo escrito hace unos meses en python https://github.com/ftbalboa/balPyChess


La dificultad se maneja añadiendo en los niveles bajos una pequeña chance de que el rival realice una jugada al azar. Para identificar los movimientos posibles y amenazas puede verse el directorio /src/logic/ dónde se implementan las clases que realizan la lógica detrás del ajedrez.

Stockfish se implementa en front utilizando Worker.

## Link de prueba

https://rrchess-rrchess.vercel.app/

## Capturas:
###
![ejemplo](/imgRm/one.PNG)
###
![ejemplo](/imgRm/two.PNG)
###
![ejemplo](/imgRm/third.PNG)

## Todo:
- Corregir pequeños bugs asociados a la captura "al paso"
- Embellecer estilos
- Mejorar responsive
- Adherir estado "Tablas"

## Backend
El back de este proyecto se encuentra en: https://github.com/ftbalboa/rrchessApi

## Licencias

### Fuente 
https://www.1001fonts.com/press-start-font.html

### Piezas
https://opengameart.org/content/pixel-chess-pieces

### Stockfish
https://www.npmjs.com/package/stockfish