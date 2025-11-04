import {Board} from './Board';
import {Dice} from './Dice';
import {SnakeLadderGameBuilder} from './SnakeLadderGame';
import {FactoryPlayer} from "./Players/FactoryPlayer";


const board = new Board(100, { 99: 21, 95: 75, 92: 88 }, { 2: 38, 4: 14, 9: 31 });
const factoryPlayer = new FactoryPlayer();
const humanPlayer = factoryPlayer.createPlayer('human', 'Rohit');
const AIPlayer = factoryPlayer.createPlayer('AI', 'Kalpit')

const humanPlayer1 = factoryPlayer.createPlayer('human', 'singh');
const AIPlayer1 = factoryPlayer.createPlayer('AI', 'shreya')

const gameBuilder = new SnakeLadderGameBuilder();
const game = gameBuilder.addPlayer(humanPlayer).addPlayer(AIPlayer).setBoard(board).setDice(new Dice()).build();
const game1 = gameBuilder.addPlayer(humanPlayer1).addPlayer(AIPlayer1).setBoard(board).setDice(new Dice()).build();
game.play();

console.log('is game 1 eqaul to game2' , game === game1)






