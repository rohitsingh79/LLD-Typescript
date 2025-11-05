export class Board{
    private readonly  board:number;
    private snakes:Map<number , number>;
    private ladder:Map<number , number>;

    constructor(board:number , snakes:Record<number , number> , ladder:Record<number , number>){
        this.board = board;

        let snakeMap = new Map();
        for(let key in snakes){
            snakeMap.set(Number(key) , snakes[key])
        }
        this.snakes = snakeMap;

        let ladderMap = new Map();
        for(let key in ladder){
            ladderMap.set(Number(key) , ladder[key])
        }
        this.ladder = ladderMap;
    }

    getboardSize(){
        console.log('board size' , this.board);
    }

    getSnakeAndLadderPos(pos:number):number{
            // handle for snake
            for(const entry of this.snakes){
                if(entry[0] === pos){
                    return entry[1];
                }
            }

            // handle for ladder
            for(const entry of this.ladder){
                if(entry[0] === pos){
                    return entry[1];
                }
            }
            return pos;
    }

}
