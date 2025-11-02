import {Board} from './Board';
import {Player} from './Player';
import {SnakeLadderGame} from './SnakeLadderGame';

const board = new Board(100, { 99: 21, 95: 75, 92: 88 }, { 2: 38, 4: 14, 9: 31 });
const player1 = new Player('Rohit');
const player2 = new Player('Kalpit');
const game = new SnakeLadderGame([player1 , player2] , board);
game.play();






