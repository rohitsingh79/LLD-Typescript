import {Board} from './Board';
import {Player} from './Player';
import {Dice} from './Dice';
import {SnakeLadderGameBuilder} from './SnakeLadderGame';


const board = new Board(100, { 99: 21, 95: 75, 92: 88 }, { 2: 38, 4: 14, 9: 31 });
const player1 = new Player('Rohit');
const player2 = new Player('Kalpit');

const playersList:Array<Player> = [];
playersList.push(player1);
playersList.push(player2);

const gameBuilder = new SnakeLadderGameBuilder();
const game = gameBuilder.setPlayers(playersList).setBoard(board).setDice(new Dice()).build();
game.play();






