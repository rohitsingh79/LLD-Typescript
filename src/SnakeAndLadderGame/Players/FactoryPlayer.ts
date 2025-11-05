import {AIPlayer, HumanPlayer} from "./Players";

export class FactoryPlayer {
    createPlayer(playerType:string , playerName:string){
        if(playerType === 'AI'){
            return new AIPlayer(playerName);
        }
        else return new HumanPlayer(playerName)
    }
}