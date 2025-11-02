import {Player} from './Player'
import {Board} from './Board'
import {Dice} from './Dice'

export class SnakeLadderGame {
    public players:Array<Player>;
    private board:Board;
    private playerTurn:number
    private dice:Dice

    constructor(players:Array<Player> , board:Board) {
        this.players = players;
        this.board = board;
        this.playerTurn = 0;
        this.dice = new Dice();
    }

    // roll the dice
    // check the position from the current + roll value that has come
    // update the respective player position
    // move on to the next player
    // check whether the current pos will mark it as complete

    play(){
        while(!this.isGameComplete()){
            const currPlayer: Player = this.players[this.playerTurn];
            console.log(currPlayer.getPlayerName())
            const diceNumber:number = this.dice.roll();
            const newPos:number = diceNumber+currPlayer.getPlayerPosition();
            const updatedPos = this.board.getSnakeAndLadderPos(newPos);
            currPlayer.setPlayerPosition(updatedPos);
            this.playerTurn = (this.playerTurn+1) % this.players.length;
            console.log('this.playerTurn', this.playerTurn);
        }

        const player:Player | undefined = this.players.find((player:Player):boolean => player.getPlayerPosition() >= 100)
        if(player){
            console.log('winner is' , player?.getPlayerName())
        }
    }

    isGameComplete():boolean | undefined {
        return !!this.players.find((player:Player):boolean => player.getPlayerPosition() >= 100);
    }


}