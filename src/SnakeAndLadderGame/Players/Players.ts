import {PlayerInterface} from "./PlayerInterface";

export class HumanPlayer implements PlayerInterface {
    private name:string;
    private position:number;
    constructor(name:string){
        this.name = name;
        this.position = 0;
    }

    setPlayerPosition(position:number):void{
        this.position = position;
    }
    getPlayerPosition():number{
        return this.position;
    }
    getPlayerName():string{return this.name}
}

export class AIPlayer implements PlayerInterface {
    private name:string;
    private position:number;

    constructor(name:string){
        this.name = name;
        this.position = 0;
    }

    setPlayerPosition(position:number):void{
        this.position = position;
    }
    getPlayerPosition():number{
        return this.position;
    }
    getPlayerName():string{return this.name}


}