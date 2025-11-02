export class Dice {
    private MAX_VALUE:number = 6;
    private MIN_VALUE:number = 1;
    roll():number{
        return Math.random() * (this.MAX_VALUE - this.MIN_VALUE + 1) + this.MIN_VALUE
    }
}