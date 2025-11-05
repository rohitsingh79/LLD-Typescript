import {DiceRange} from "./DiceRange";
import {DiceInterface} from "./DiceInterface";

export class Dice implements DiceInterface{
    roll():number{
        return Math.floor(Math.random() * (DiceRange.MAX_VALUE - DiceRange.MIN_VALUE + 1) + DiceRange.MIN_VALUE)
    }
}