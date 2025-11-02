import {Player} from './Player'
import {Board} from './Board'
import {Dice} from './Dice'

//  builder pattern
export class SnakeLadderGameBuilder {
    public players:Array<Player>;
    public board:Board;
    public dice:Dice;

    constructor(){
        this.players = [];
        this.board = new Board(100 , {} , {});
        this.dice = new Dice();
    }
    setPlayers(Players:Array<Player>){
        this.players = Players;
        return this;
    }
    setBoard(Board:Board){
        this.board = Board;
        return this;
    }
    setDice(Dice:Dice){
        this.dice = Dice;
        return this;
    }

    build(){
        return new SnakeLadderGame(this)
    }
}

export class SnakeLadderGame {
    public players:Array<Player>;
    private board:Board;
    private playerTurn:number
    private dice:Dice
    private static instance:SnakeLadderGame | null = null;

    constructor(SnakeLadderBuilder:SnakeLadderGameBuilder) {
        this.players = SnakeLadderBuilder.players;
        this.board = SnakeLadderBuilder.board;
        this.dice = SnakeLadderBuilder.dice;
        this.playerTurn = 0;
    }

    // singleton patten
    getInstance():SnakeLadderGame{
        if(!SnakeLadderGame.instance){
            SnakeLadderGame.instance = new SnakeLadderGame(new SnakeLadderGameBuilder())
        }
        return SnakeLadderGame.instance;

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