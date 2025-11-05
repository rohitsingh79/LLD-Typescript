import {DiceRange} from "./DiceRange";

export class Dice {
    roll():number{
        return Math.floor(Math.random() * (DiceRange.MAX_VALUE - DiceRange.MIN_VALUE + 1) + DiceRange.MIN_VALUE)
    }
}