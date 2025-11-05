import {DiceInterface} from "./DiceInterface";

export abstract class DiceDecorator implements DiceInterface{
    protected  decoratedDice:DiceInterface;
    constructor(dice:DiceInterface){
        this.decoratedDice = dice;
    }
    roll():number{
        return this.decoratedDice.roll();
    }
}