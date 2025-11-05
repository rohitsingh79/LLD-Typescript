import {Command} from "./Command";
import {PlayerInterface} from "../Players/PlayerInterface";
import {Dice} from "../Dice/Dice";
import {Board} from "../Board";

export class MoveCommand implements Command {
    private Player:PlayerInterface;
    private dice:Dice;
    private board:Board;
    private lastPos:number;

    constructor(Player:PlayerInterface , Dice:Dice , Board:Board , lastPos:number){
        this.Player = Player;
        this.dice = Dice;
        this.board = Board;
        this.lastPos = lastPos;
    }

    execute(){
    console.log(`${this.Player.getPlayerName()} last pos --> ${this.lastPos} `);
    const diceNum:number = this.dice.roll();
    const newPos = this.Player.getPlayerPosition()+diceNum;
    const getNewPos = this.board.getSnakeAndLadderPos(newPos);
    this.Player.setPlayerPosition(newPos);
    console.log(`${this.Player.getPlayerName()} curr pos --> ${getNewPos} `);

    }

    undo(){
        // have undo logic
        this.Player.setPlayerPosition(this.lastPos);
    }

}

// const currPlayer: PlayerInterface = this.players[this.playerTurn];
// console.log(currPlayer.getPlayerName())
// const diceNumber:number = this.dice.roll();
// const newPos:number = diceNumber+currPlayer.getPlayerPosition();
// const updatedPos = this.board.getSnakeAndLadderPos(newPos);
// currPlayer.setPlayerPosition(updatedPos);