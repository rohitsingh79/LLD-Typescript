import {Board} from './Board'
import {Dice} from './Dice/Dice'
import {PlayerInterface} from "./Players/PlayerInterface";
import {MoveCommand} from "./CommandAction/MoveCommand";
import {Command} from "./CommandAction/Command";


// basic core functionality of snake and ladder game
// roll the dice
// check the position from the current + roll value that has come
// update the respective player position
// move on to the next player
// check whether the current pos will mark it as complete

//  builder pattern
export class SnakeLadderGameBuilder {
    public players:Array<PlayerInterface>;
    public board:Board;
    public dice:Dice;

    constructor(){
        this.players = [];
        this.board = new Board(100 , {} , {});
        this.dice = new Dice();
    }
    addPlayer(Player:PlayerInterface){
        this.players.push(Player);
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
        return SnakeLadderGame.getInstance(this);
    }
}

export class SnakeLadderGame {
    private players:Array<PlayerInterface>;
    private board:Board;
    private playerTurn:number
    private dice:Dice
    private static instance:SnakeLadderGame | null = null;

    private constructor(SnakeLadderBuilder:SnakeLadderGameBuilder) {
        this.players = SnakeLadderBuilder.players;
        this.board = SnakeLadderBuilder.board;
        this.dice = SnakeLadderBuilder.dice;
        this.playerTurn = 0;
    }

    // singleton patten
    public static getInstance(snakeBuilder:SnakeLadderGameBuilder):SnakeLadderGame{
        if(!SnakeLadderGame.instance){
            SnakeLadderGame.instance = new SnakeLadderGame(snakeBuilder)
        }
        return SnakeLadderGame.instance;

    }

    play(){
        while(!this.isGameComplete()){
            const currPlayer: PlayerInterface = this.players[this.playerTurn];
            const moveCommand:Command = new MoveCommand(currPlayer ,this.dice , this.board , currPlayer.getPlayerPosition());
            moveCommand.execute();  // command pattern
            this.playerTurn = (this.playerTurn+1) % this.players.length;
        }
        const player:PlayerInterface | undefined = this.players.find((player:PlayerInterface):boolean => player.getPlayerPosition() >= 100)
        if(player){
            console.log('winner is' , player?.getPlayerName())
        }
    }

    isGameComplete():boolean | undefined {
        return !!this.players.find((player:PlayerInterface):boolean => player.getPlayerPosition() >= 100);
    }


}