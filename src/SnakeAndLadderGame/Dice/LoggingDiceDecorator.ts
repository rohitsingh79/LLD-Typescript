import {DiceDecorator} from "./DiceDecorator";
import {DiceInterface} from "./DiceInterface";

export class LoggingDiceDecorator extends DiceDecorator {
    roll():number{
        const diceNumber:number = super.roll();
        console.log(`🎲 Dice rolled: ${diceNumber}`);
        return diceNumber;
    }
}